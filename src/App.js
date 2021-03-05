import React, { useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import { SERVER_URL } from './utils/server';
import swal from 'sweetalert';
import { CHANNELS_ROUTE } from "./utils/server";
import Chat from "./components/Chat/Chat";
import useFetch from "./hooks/useFetch";
import { LoaderSpinner, ErrorAlert } from "./components/Exceptions/Exceptions";
import { cloneDeep } from "lodash";
import service from './services/user.service'
import './App.css';

function App() {
  const {
    data: { channels },
    isLoading,
    setData: setChannels,
    error,
  } = useFetch(CHANNELS_ROUTE, { defaultValue: { channels: [] } });
  const socketRef = useRef();

  useEffect(() => { didMount() }, []);

  const didMount = () => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.on('RECEIVED_MESSAGE', receivedMessage)
  };

  const getUserName = () => swal({
    title: "Type your name",
    content: {
      element: "input",
      attributes: {
        placeholder: "Name",
        type: "text",
      },
    },
  });

  const connectNewUser = async (channelID) => {
    if (!channelID) return;
    const userName = await getUserName();
    if (!userName) {
      return await connectNewUser(channelID);
    }
    socketRef.current.emit("CREATE_USER", { userName, channelID });
    const user = await new Promise((resolve) => socketRef.current.on('CREATED_USER', resolve));
    socketRef.current.emit("WELCOME_USER", user);
    return user;
  }

  const setUserInChannel = async (selectedChannel) => {
    if (!selectedChannel) return;
    const newUser = await connectNewUser(selectedChannel?.id);
    setChannels((prev) => {
      prev = cloneDeep(prev);
      if (Array.isArray(prev?.channels)) {
        prev.channels = prev.channels.map((channel) => {
          if (channel.id === selectedChannel.id) {
            channel.user = newUser;
          }
          return channel;
        });
      }
      return prev;
    });
  };

  const receivedMessage = async ({ channelID, message }) => {
    setChannels(prev => {
      prev = cloneDeep(prev);
      if (Array.isArray(prev?.channels)) {
        prev.channels = prev?.channels?.map(channel => {
          if (channel?.id === channelID) {
            const oldMessages = channel?.messages ?? [];
            channel.messages = [...oldMessages, message];
          }
          return channel;
        });
      }
      return prev;
    });
  }

  const onSendMessage = ({ text, channelID, userID }) => {
    console.log({ text, channelID, userID });
    service.sendUserMessage({ text, channelID, userID })
  }

  if (isLoading) return <LoaderSpinner />;
  if (error) return <ErrorAlert error={error} />;

  return <Chat channels={channels} setUserInChannel={setUserInChannel} onSendMessage={onSendMessage} />;
}

export default App;
