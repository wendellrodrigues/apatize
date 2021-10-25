import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import DayButton from "./DayButton";

const DaysWheel = ({
  dates: { sunday, monday, tuesday, wednesday, thursday, friday, saturday },
}) => {
  const days = [
    { word: "Sunday", number: sunday },
    { word: "Monday", number: monday },
    { word: "Tuesday", number: tuesday },
    { word: "Wednesday", number: wednesday },
    { word: "Thursday", number: thursday },
    { word: "Friday", number: friday },
    { word: "Saturday", number: saturday },
  ];

  return (
    <Wrapper>
      {days.map((today, index) => (
        <DayButton today={today} key={index} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  gap: 10px;
  margin: auto;
  width: 50%;
`;

export default DaysWheel;
