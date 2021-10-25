import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";

//Page Content
import ProfileForm from "../forms/ProfileForm";

const Profile = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
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
  } else
    return (
      <Wrapper>
        <Spacer />
        <ProfileTitle>Profile</ProfileTitle>
        <ProfileForm />
      </Wrapper>
    );
};

//Temporary (delete later)
const Spacer = styled.div`
  margin-top: 50px;

  @media (max-width: 745px) {
    margin-top: 30px;
  }

  @media (max-width: 400px) {
    margin-top: 0px;
  }
`;

const Wrapper = styled.div`
  @media (max-width: 745px) {
    margin-top: 50px;
  }
  display: grid;
  margin: auto;
  overflow: hidden;
  gap: 70px;

  @media (max-width: 745px) {
    gap: 30px;
  }

  @media (max-width: 400px) {
    gap: 20px;
  }
`;

const ProfileTitle = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 70px;
  color: black;
  margin: auto;
  overflow: hidden;

  @media (max-width: 745px) {
    font-size: 40px;
  }

  @media (max-width: 400px) {
    font-size: 30px;
  }
`;

const SpinnerContainer = styled.div`
  margin-top: 300px;
`;

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
