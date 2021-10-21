import React, { useEffect, useRef, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";
import styled from "styled-components";
import RegisterForm from "../forms/RegisterForm";
import WelcomeText from "../texts/WelcomeText";
import PropTypes from "prop-types";
import About from "../sections/About";

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    code: "",
  });

  //Redirect if logged in
  if (props.isAuthenticated) {
    console.log("This is authenticated");
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <Fragment>
      <Wrapper>
        <ContentWrapper>
          <TextWrapper>
            <WelcomeText />
            <LearnMoreTop>Learn More</LearnMoreTop>
          </TextWrapper>
          <RegisterForm
            formData={formData}
            setFormData={(formData) => setFormData(formData)}
          />
          <LinkScroll to="/#about">
            <LearnMoreBottom>Learn More</LearnMoreBottom>
          </LinkScroll>
        </ContentWrapper>
      </Wrapper>
      <About id="about" />
    </Fragment>
  );
};
const Wrapper = styled.div`
  height: auto;
  width: 100%;
  background: #e77b7b;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: grid;
  margin: auto;
  grid-template-columns: auto auto;
  width: 90%;
  gap: 200px;
  justify-content: center;
  align-items: top;
  margin-top: 200px;
  margin-bottom: 100;

  @media (max-width: 1000px) {
    gap: 80px;
  }

  @media (max-width: 760px) {
    grid-template-columns: auto;
    top: 10%;
    margin-top: 100px;
    margin-bottom: 50px;
    gap: 50px;
  }
`;

const TextWrapper = styled.div``;

const LearnMoreTop = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: white;
  margin-top: 40px;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 760px) {
    display: none;
  }
`;

const LearnMoreBottom = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: white;
  :hover {
    cursor: pointer;
  }
  @media (min-width: 760px) {
    display: none;
  }
`;

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Register);
