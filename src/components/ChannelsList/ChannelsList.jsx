import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  channelsList: {
    borderRight: "2px solid #e0e0e0",
    backgroundColor: "#f5f5f5",
  },
  channelsListHeader: {
    color: "#00a0b2",
    fontWeight: "bold",
  },
  newMessage: {
    fontSize: 12,
    marginTop: 5,
    color: "#9e9e9e",
  },
});

const ChannelsList = ({ selectedChannel, channels, onSelectChannel }) => {
  const classes = useStyles();

  const renderChannels = () => {
    return (
      Array.isArray(channels) &&
      channels.map((channel) => {
        return (
          <Fragment>
            <ListItem
              selected={selectedChannel?.id === channel.id}
              button
              key={channel.id}
              id={channel.id}
              onClick={() => onSelectChannel(channel)}
            >
              <ListItemText
                primary={channel.name}
                secondary={
                  <Typography className={classes.newMessage}>
                    {channel.newMessage}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
          </Fragment>
        );
      })
    );
  };

  return (
    <Grid  item={true} xs={3} className={classes.channelsList}>
      <ListItem key="Channels">
        <ListItemText
          primary={
            <Typography className={classes.channelsListHeader}>
              Channels
            </Typography>
          }
        />
      </ListItem>
      <Divider />
      <List>{renderChannels()}</List>
    </Grid>
  );
};

export default ChannelsList;
