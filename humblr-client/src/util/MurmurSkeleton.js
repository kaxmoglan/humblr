import React from "react";

// MATERIAL
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: 10,
    alignItems: "center",
    boxShadow: "none",
    border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: 10,
    paddingBottom: 2,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    width: 250,
    height: 150,
    borderRadius: "50%",
    marginLeft: "25px",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  username: {
    width: 90,
    height: 25,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginBottom: 10,
  },
  fullLine: {
    height: 18,
    width: "90%",
    marginBottom: 15,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  halfLine: {
    height: 22,
    width: "30%",
    marginBottom: 11,
    backgroundColor: "rgba(0,0,0,1)",
  },
}));

const ScreamSkeleton = (props) => {
  const classes = useStyles();

  const content = Array.from({ length: 10 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <div className={classes.cover} />
      <CardContent className={classes.cardContent}>
        <div className={classes.username} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <>{content}</>;
};

ScreamSkeleton.propTypes = {};

export default ScreamSkeleton;
