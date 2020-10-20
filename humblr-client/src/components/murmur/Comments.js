import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  commentImg: {
    maxWidth: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentContent: {
    marginLeft: "20px",
  },
  seperator: {
    width: "100%",
  },
  commentContainer: {
    width: "100%",
  },
}));

const Comments = (props) => {
  const classes = useStyles();

  // Redux
  const { comments } = props;

  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, username } = comment;
        return (
          <div
            key={`${username}${createdAt}}`}
            className={classes.commentContainer}
          >
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImg}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentContent}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${username}`}
                      color="primary"
                    >
                      {username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.seperator} />
            )}
          </div>
        );
      })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
