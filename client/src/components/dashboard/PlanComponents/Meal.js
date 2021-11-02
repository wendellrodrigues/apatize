import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Meal = ({ meal }) => {
  //Meal information

  var mealId = 0;
  var mealInfo = {};
  var image = "";
  var title = "";
  var titleShort = "";
  var nutrients = [];
  var calories = 0;
  var carbs = 0;
  var protein = 0;
  var fat = 0;

  if (meal) {
    mealId = meal[0];
    mealInfo = meal[1];
    nutrients = mealInfo.nutrients;
    calories = Math.round(nutrients[0].amount);
    carbs = Math.round(nutrients[3].amount);
    protein = Math.round(nutrients[8].amount);
    fat = Math.round(nutrients[1].amount);
    title = mealInfo.title;
    titleShort = title.substring(0, 20).concat("...");
    image = `https://spoonacular.com/recipeImages/${mealId}-636x393.jpg`;
  }

  return (
    <Wrapper>
      <ComponentWrapper>
        <ImageWrapper>
          <Image src={image} />
        </ImageWrapper>
        <InformationWrapper>
          <TitleWrapper>{titleShort}</TitleWrapper>
          <AttributesWrapper>
            <Attribute>
              <AttributeValue>{calories}</AttributeValue>
              <AttributeTitle>Cal</AttributeTitle>
            </Attribute>
            <Attribute>
              <AttributeValue>{`${carbs}g`}</AttributeValue>
              <AttributeTitle>Carb</AttributeTitle>
            </Attribute>
            <Attribute>
              <AttributeValue>{`${protein}g`}</AttributeValue>
              <AttributeTitle>Protein</AttributeTitle>
            </Attribute>
            <Attribute>
              <AttributeValue>{`${fat}g`}</AttributeValue>
              <AttributeTitle>Fat</AttributeTitle>
            </Attribute>
          </AttributesWrapper>
        </InformationWrapper>
      </ComponentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 380px;
  width: 300px;
  margin: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow: hidden;
`;
const ComponentWrapper = styled.div`
  display: grid;
  align-items: start;
  box-shadow: 0px 0px 10px #b0b0b0;
  margin: auto;
  gap: 10px;

  height: 350px;
  width: 275px;
  border-radius: 30px;
  padding-top: 0px;
  overflow: hidden;

  @media (max-width: 420px) {
    height: 300px;
    width: 200px;
  }
`;

const ImageWrapper = styled.div`
  height: 100%;
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

const InformationWrapper = styled.div`
  display: grid;
  height: 30%;
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  display: grid;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: black;
  margin: auto;
  line-height: 120%;
  overflow: hidden;
`;

const AttributesWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 90%;
  margin: auto;
  height: auto;
  padding-bottom: 15px;
  overflow: hidden;
`;

const Attribute = styled.div`
  display: grid;
  gap: 10px;
  margin: auto;
  overflow: hidden;
`;

const AttributeTitle = styled.h1`
  color: #e77b7b;
  font-style: normal;
  font-weight: bold;
  margin: auto;
  font-size: 12px;
  overflow: hidden;
  line-height: 110%;
`;

const AttributeValue = styled(AttributeTitle)`
  font-size: 16px;
  line-height: 120%;
`;

Meal.propTypes = {};

export default Meal;
