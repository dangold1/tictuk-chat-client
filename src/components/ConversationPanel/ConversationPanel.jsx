import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { Avatar, ListItemIcon, Typography } from "@material-ui/core";
import "./ConversationPanel.css";

const useStyles = makeStyles({
  messagesPanel: {
    height: "89vh",
    overflowY: "auto",
  },
  myMessage: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#00a0b2",
    marginLeft: "auto",
    color: "white",
    width: "40%",
  },
  otherUserMessage: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderRadius: 5,
    padding: 10,
    width: "40%",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  textField: {
    marginLeft: 20,
    marginTop: 15,
  },
  sendIcon: {
    backgroundColor: "#00a0b2",
    color: "white",
    marginRight: 40,
    position: "fixed",
    right: 4,
    bottom: "1%",
  },
});

const ConversationPanel = ({ channel, onSendMessage }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      text: inputValue,
      channelID: channel?.id,
      userID: channel?.user?.id,
      userName: channel?.user?.userName,
    };
    onSendMessage(newMessage);
    setInputValue("");
  };

  const onInputChange = (e) => setInputValue(e.target.value);

  const onKeyPress = (e) => {
    if (e.key === "Enter") sendMessage(e);
  };

  // ------------------------------- Rendering ---------------------------------------------

  if (!channel?.user) return null;

  const renderMessages = () =>
    Array.isArray(channel?.messages) &&
    channel.messages?.map((message) => {
      console.log({ message });
      return (
        <ListItem key={message.id}>
          <div
            className={
              channel?.user?.id === message.userID
                ? classes.myMessage
                : classes.otherUserMessage
            }
          >
            {!message?.isSystemMessage && (
              <ListItemIcon>
                <Avatar>{message.userName.charAt(0).toUpperCase()}</Avatar>
              </ListItemIcon>
            )}
            {message.text}
          </div>
        </ListItem>
      );
    });

  return (
    <Grid item={true} xs={9}>
      <List className={classes.messagesPanel}>{renderMessages()}</List>
      <Divider />

      <Grid container className={classes.sendMessageBox}>
        <form onSubmit={sendMessage} className="form-send-message">
          <TextField
            multiline
            className={classes.textField}
            id="input"
            placeholder="Type a message"
            fullWidth
            InputProps={{ disableUnderline: true }}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
            value={inputValue}
          />
          <IconButton
            type="submit"
            className={classes.sendIcon}
            aria-label="send"
          >
            <SendIcon />
          </IconButton>
        </form>
      </Grid>
    </Grid>
  );
};

export default ConversationPanel;
