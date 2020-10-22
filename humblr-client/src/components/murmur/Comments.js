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
    marginLeft: "41px",
  },
  commentContent: {
    marginLeft: "55px",
    marginTop: "5px",
  },
  seperator: {
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    display: "block",
    width: "100%",
    margin: "20px 0 20px 0",
  },
  invisibleSeperator: {
    marginBottom: "50px",
    border: "none",
  },
  commentContainer: {
    width: "100%",
  },
  commentCreatedAt: {
    display: "block",
    marginLeft: "3px",
  },
  commentBody: {
    marginLeft: "3px",
  },
  username: {
    transition: "all 250ms ease",
    position: "relative",
    left: "-6px",
    padding: 6,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
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
                <Grid item sm={3}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImg}
                  />
                </Grid>
                <Grid item sm={8}>
                  <div className={classes.commentContent}>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`/users/${username}`}
                      color="primary"
                      className={classes.username}
                    >
                      @{username}
                    </Typography>
                    <Typography variant="body1" className={classes.commentBody}>
                      {body}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      className={classes.commentCreatedAt}
                    >
                      {dayjs(createdAt).format("h:mma, DD MMM YYYY")}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 ? (
              <hr className={classes.seperator} />
            ) : (
              <hr className={classes.invisibleSeperator} />
            )}
          </div>
        );
      })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
