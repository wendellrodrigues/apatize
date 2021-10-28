import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Meal = (props) => {
  return (
    <Wrapper>
      <ComponentWrapper>
        <ImageWrapper></ImageWrapper>
      </ComponentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ComponentWrapper = styled.div`
  display: grid;
  align-items: start;

  height: 400px;
  width: 300px;
  border-radius: 30px;
  border: 1px solid gray;
  padding-top: 5px;

  @media (max-width: 420px) {
    height: 300px;
    width: 200px;
  }
`;

const ImageWrapper = styled.div`
  height: 70%;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 30px;
  border: 1px solid gray;
`;

Meal.propTypes = {};

export default Meal;
