import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";

//Page Content
import Plan from "./Plan";

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
  alerts,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  //Loading
  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
  //No Profile
  else if (profile == null) {
    return <Redirect to="/profile"></Redirect>;
  } else {
    return <Plan profile={profile} />;
  }
};

const SpinnerContainer = styled.div`
  margin-top: 300px;
`;

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  alerts: state.alert,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
