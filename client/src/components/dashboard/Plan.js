import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatesTitle from "./PlanComponents/DatesTitle";
import DaysWheel from "./PlanComponents/DaysWheel";

const Plan = ({ profile }) => {
  //Handler for generating a weekly plan
  const generatePlan = () => {};

  //Check to see if today's date is within the days AND plan is generated
  const handleRender = () => {
    //Check if profile
    if (!profile.week) return false;
    //Get today
    var d = new Date();
    var date = new Date(d.toUTCString());
    //Convert to PST (PDT)
    date.setHours(date.getHours() - 7);
    const today = date.getDate();
    const dates = profile.week.dates;
    const days = [
      dates.sunday,
      dates.monday,
      dates.tuesday,
      dates.wednesday,
      dates.thursday,
      dates.friday,
      dates.saturday,
    ];

    for (let day of days) {
      if (today == day) return true;
    }

    //Clear plan from profile
    return false;
  };

  if (handleRender()) {
    const dates = profile.week.dates;

    return (
      <Wrapper>
        <ContentWrapper>
          <DatesTitle dates={dates} />
          <DaysWheel dates={dates} />
        </ContentWrapper>
      </Wrapper>
    );
  }
  //If plan not generated
  else {
    return (
      <Wrapper>
        <ContentWrapper>
          <WelcomeWrapper>
            <Welcome>Welcome</Welcome>
            <GreenButton>Generate Plan</GreenButton>
          </WelcomeWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }

  //Check if today's date is within range of dates in profile object
  //If within range, display foods
  //If out of range, display (generate plan button)
};

const Wrapper = styled.div`
  display: grid;
  margin: auto;
  margin-top: 100px;
`;

const ContentWrapper = styled.div`
  display: grid;
  margin: auto;
  gap: 50px;
  width: 100%;
`;

//Holds components before plan is formed
const WelcomeWrapper = styled.div`
  display: grid;
  margin: auto;
  margin-top: 200px;
  gap: 50px;
`;

const Welcome = styled.h1`
  margin: auto;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  color: black;
  font-size: 60px;
  overflow: hidden;
`;

export const GreenButton = styled.div`
  display: grid;
  margin: auto;
  margin-top: 10px;
  height: 50px;
  width: 200px;
  background: #cbf6da;
  border-radius: 15px;
  justify-items: center;
  align-items: center;

  :hover {
    background: #e3faeb;
    cursor: pointer;
    color: #76a385;
  }

  color: #0b461b;
  font-size: 17px;
  font-weight: bold;
  line-height: normal;

  transition: 0.2s ease-in;
`;

Plan.propTypes = {};

export default Plan;
