import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

import Murmur from "../components/Murmur";
import Profile from "../components/Profile";

import { connect } from 'react-redux';
import { getMurmurs } from '../redux/actions/dataActions';

const Home = (props) => {
  const { murmurs, loading } = props.data;

  useEffect(() => {
    props.getMurmurs();
  }, []);

  let recentMurmursMarkup = !loading ? (
      murmurs.map((murmur) => 
        <Murmur key={murmur.murmurId} murmur={murmur} />
      )
    ) : <p>Loading...</p>;

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

Home.propTypes = {
  getMurmurs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getMurmurs })(Home);
