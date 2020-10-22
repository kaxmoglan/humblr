import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import axios from "axios";

// COMPONENTS
import Murmur from "../components/murmur/Murmur";
import StaticProfile from "../components/profile/StaticProfile";
import ProfileSkeleton from "../util/ProfileSkeleton";
import MurmurSkeleton from "../util/MurmurSkeleton";

// REDUX
import { connect, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

// MATERIAL
import Grid from "@material-ui/core/Grid";

const User = (props) => {
  // Local State
  const [profile, setProfile] = useState(null);
  const [murmurIdParam, setMurmurIdParam] = useState(null);

  // Props
  const { murmurs, loading } = props.data;

  // Component did mount
  useEffect(() => {
    const username = props.match.params.username;
    props.getUserData(username);

    const murmurId = props.match.params.murmurId;
    if (murmurId) setMurmurIdParam(murmurId);

    axios
      .get(`/user/${username}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  // Markup
  const murmursMarkup = loading ? (
    <MurmurSkeleton />
  ) : murmurs.length === 0 ? (
    <p align="center">This user has no Murmurs.</p>
  ) : !murmurIdParam ? (
    murmurs.map((murmur) => <Murmur key={murmur.murmurId} murmur={murmur} />)
  ) : (
    murmurs.map((murmur) => {
      if (murmur.murmurId !== murmurIdParam) {
        return <Murmur key={murmur.murmurId} murmur={murmur} />;
      } else return <Murmur key={murmur.murmurId} murmur={murmur} openDialog />;
    })
  );

  // Render
  return (
    <Grid container spacing={3} justify="center">
      <Grid item md={4} sm={7} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
      <Grid item md={7} sm={10} xs={12}>
        {murmursMarkup}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
