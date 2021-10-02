import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LoginForm from "../forms/LoginForm";
import WelcomeText from "../texts/WelcomeText";

export default function Landing() {
  return (
    <Wrapper>
      <ContentWrapper>
        <WelcomeText />
        <LoginForm />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 1100px;
  width: 100%;
  background: #e77b7b;
  justify-content: center;
  margin-top: 100px;
  margin: auto;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: grid;
  margin: auto;
  grid-template-columns: auto auto;
  width: 90%;
  top: 30%;
  gap: 200px;
  justify-content: center;
  align-items: top;
`;
