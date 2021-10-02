import React from "react";
import styled from "styled-components";

export default function WelcomeText() {
  return (
    <Wrapper>
      <Title>apatize</Title>
      <BottomSection>
        <Tagline>find meals to fit your goals</Tagline>
        <Line />
      </BottomSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  position: relative;

  @media (max-width: 760px) {
    gap: 0px;
  }
`;

//Contains Tagline, Line, and Find more
const BottomSection = styled.div`
  display: grid;
  gap: 30px;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 90px;
  line-height: 130px;
  text-align: center;
  color: white;
  @media (max-width: 1000px) {
    font-size: 70px;
  }

  @media (max-width: 760px) {
    line-height: auto;
  }
`;

const Tagline = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 52px;
  text-align: center;
  color: white;
  white-space: nowrap;

  @media (max-width: 1000px) {
    font-size: 20px;
  }
}
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  background: white;
  justify-items: center;
  align-items: center;

  @media (max-width: 760px) {
    display: none;
  }
`;
