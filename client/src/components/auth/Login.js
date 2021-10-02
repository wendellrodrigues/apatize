import React, { useEffect, useRef, useState, Fragment } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link, animateScroll as scroll } from "react-scroll";
import styled from "styled-components";
import LoginForm from "../forms/LoginForm";
import WelcomeText from "../texts/WelcomeText";
import About from "../sections/About";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <Fragment>
      <Wrapper>
        <ContentWrapper>
          <TextWrapper>
            <WelcomeText />
            <LearnMoreTop>Learn More</LearnMoreTop>
          </TextWrapper>
          <LoginForm
            formData={formData}
            setFormData={(formData) => setFormData(formData)}
          />
          <Link to="/#about">
            <LearnMoreBottom>Learn More</LearnMoreBottom>
          </Link>
        </ContentWrapper>
      </Wrapper>
      <About id="about" />
    </Fragment>
  );
}

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

  margin-top: 300px;
  margin-bottom: 300px;

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
