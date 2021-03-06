import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ConversationPanel from "../ConversationPanel/ConversationPanel";
import ChannelsList from "../ChannelsList/ChannelsList";
import { cloneDeep } from "lodash";

const useStyles = makeStyles({
  chatPage: {
    border: "2px solid #e0e0e0",
    width: "100%",
    height: "100vh",
  },
});

const Chat = ({ channels, setUserInChannel, onSendMessage }) => {
  const classes = useStyles();
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    setSelectedChannel(channels?.find((ch) => ch.id === selectedChannel?.id));
  }, [channels]);

  useEffect(() => {
    if (selectedChannel?.user) return;
    setUserInChannel(selectedChannel);
  }, [selectedChannel]);

  const onSelectChannel = (channel) => {
    setSelectedChannel(cloneDeep(channel));
  };

  return (
    <div className="chat-app">
      <Grid container component={Paper} className={classes.chatPage}>
        <ChannelsList
          channels={channels}
          selectedChannel={selectedChannel}
          onSelectChannel={onSelectChannel}
        />
        <ConversationPanel
          channel={selectedChannel}
          onSendMessage={onSendMessage}
        />
      </Grid>
    </div>
  );
};

export default Chat;
