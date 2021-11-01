import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Meal = (props) => {
  return (
    <Wrapper>
      <ComponentWrapper>
        <ImageWrapper>
          <Image src="https://spoonacular.com/recipeImages/638604-636x393.jpg" />
        </ImageWrapper>
      </ComponentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 450px;
  width: 350px;
  margin: auto;
  padding-top: 20px;
`;
const ComponentWrapper = styled.div`
  display: grid;
  align-items: start;
  box-shadow: 0px 0px 10px #b0b0b0;
  margin: auto;

  height: 400px;
  width: 300px;
  border-radius: 30px;
  padding-top: 0px;
  overflow: hidden;

  @media (max-width: 420px) {
    height: 300px;
    width: 200px;
  }
`;

const ImageWrapper = styled.div`
  height: 70%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 30px;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 30px;
  object-fit: cover;
`;

Meal.propTypes = {};

export default Meal;
