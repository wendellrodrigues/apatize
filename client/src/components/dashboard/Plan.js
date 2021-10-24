import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatesTitle from "./PlanComponents/DatesTitle";

const Plan = ({ profile }) => {
  //Check if today's date is within range of dates in profile object
  //If within range, display foods
  //If out of range, display (generate plan button)

  return (
    <Wrapper>
      <ContentWrapper>
        <DatesTitle />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ContentWrapper = styled.div``;

Plan.propTypes = {};

export default Plan;
