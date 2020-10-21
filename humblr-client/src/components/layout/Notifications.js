import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// REDUX
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

// MATERIAL
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// COMPONENT
const Notifications = (props) => {
  // State
  const [anchorEl, setAnchorEl] = useState(null);

  // Props
  const notifications = props.notifications;

  // Create icon
  let notificationIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((note) => note.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter((note) => note.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  // Handlers
  const handleOpen = (e) => setAnchorEl(e.target);
  const handleClose = () => setAnchorEl(null);
  const handleMenuOpened = () => {
    let unreadIds = props.notifications
      .filter((note) => !note.read)
      .map((note) => note.notificationId);
    props.markNotificationsRead(unreadIds);
  };

  // Markup
  dayjs.extend(relativeTime);

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((note) => {
        const verb = note.type === "like" ? "liked" : "commented on";
        const time = dayjs(note.createdAt).fromNow();
        const iconColor = note.read ? "primary" : "secondary";
        const icon =
          note.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={note.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="caption"
              to={`/users/${note.recipient}/murmur/${note.murmurId}`}
            >
              {note.sender} {verb} your Murmur {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications</MenuItem>
    );

  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
          style={{ color: "#fff" }}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={handleMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
