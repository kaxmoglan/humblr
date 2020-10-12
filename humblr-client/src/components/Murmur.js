import React from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MATERIAL STUFF
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    padding: 25,
  },
  cardImage: {
    maxWidth: 150,
    objectFit: "cover",
    // borderRadius: 100,
    // margin: 10,
  },
});

const Murmur = (props) => {
  // MATERIAL
  const {
    murmur: {
      body,
      createdAt,
      userImage,
      username,
      murmurId,
      likeCount,
      commentCount,
    },
  } = props;

  const classes = useStyles();

  // DAYJS
  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        image={userImage}
        title="Profile image"
        className={classes.cardImage}
      ></CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${username}`}
          color="primary"
        >
          {username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Murmur;
