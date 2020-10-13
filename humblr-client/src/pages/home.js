import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Murmur from "../components/Murmur";
import Profile from "../components/Profile";

const Home = (props) => {
  const [murmursState, setMurmursState] = useState(null);

  useEffect(() => {
    axios
      .get("/murmurs")
      .then((res) => {
        // console.log(res.data);
        setMurmursState({
          murmurs: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  let recentMurmursMarkup = murmursState ? (
    murmursState.murmurs.map((murmur) => (
      <Murmur key={murmur.murmurId} murmur={murmur} />
    ))
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12}>
        {recentMurmursMarkup}
      </Grid>
    </Grid>
  );
};

export default Home;
