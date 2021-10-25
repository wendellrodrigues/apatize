import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatesTitle from "./PlanComponents/DatesTitle";
import DaysWheel from "./PlanComponents/DaysWheel";

const Plan = ({ profile }) => {
  const dates = profile.week.dates;
  //Check if today's date is within range of dates in profile object
  //If within range, display foods
  //If out of range, display (generate plan button)

  return (
    <Wrapper>
      <ContentWrapper>
        <DatesTitle dates={dates} />
        <DaysWheel dates={dates} />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 100px;
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: 50px;
`;

Plan.propTypes = {};

export default Plan;
