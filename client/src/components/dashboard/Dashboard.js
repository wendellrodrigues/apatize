import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";

//Page Content
import ProfileForm from "../forms/ProfileForm";

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  //Loading
  if (loading && profile == null) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
  //No Profile
  else if (profile == null) {
    return (
      <Fragment>
        <Spacer />
        <ProfileForm />
      </Fragment>
    );
  } else {
    return <Fragment>Profile</Fragment>;
  }
};

//Temporary (delete later)
const Spacer = styled.div`
  margin-top: 100px;
`;

const SpinnerContainer = styled.div`
  margin-top: 300px;
`;

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
