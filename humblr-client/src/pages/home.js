import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Murmur from "../components//murmur/Murmur";
import Profile from "../components/profile/Profile";
import MurmurSkeleton from "../util/MurmurSkeleton";

import { connect } from "react-redux";
import { getMurmurs } from "../redux/actions/dataActions";

const Home = (props) => {
  const { murmurs, loading } = props.data;

  useEffect(() => {
    props.getMurmurs();
  }, []);

  let recentMurmursMarkup = !loading ? (
    murmurs.map((murmur) => <Murmur key={murmur.murmurId} murmur={murmur} />)
  ) : (
    <MurmurSkeleton />
  );

  return (
    <Grid container spacing={3} justify="center">
      <Grid item md={4} sm={7} xs={12}>
        <Profile />
      </Grid>
      <Grid item md={7} sm={10} xs={12}>
        {recentMurmursMarkup}
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getMurmurs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getMurmurs })(Home);
