import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DayButton = ({ day: { word, number } }) => {
  return (
    <Wrapper>
      <DayOfTheWeek>{word}</DayOfTheWeek>
      <Day>{number}</Day>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  margin: auto;
  justify-items: center;
  gap: 5px;
  overflow: hidden;
`;

const DayOfTheWeek = styled.p`
  font-style: normal;
  font-weight: bold;
  color: gray;
  font-size: 14px;
  overflow: hidden;
`;

const Day = styled(DayOfTheWeek)``;

DayButton.propTypes = {};

export default DayButton;
