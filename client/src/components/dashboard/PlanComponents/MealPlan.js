import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Meal from "./Meal";

const MealPlan = ({ week, day: { day } }) => {
  //Returns day's meals based on day of the week
  const returnDay = (day) => {
    if (day == "Sunday") return week.sunday;
    else if (day == "Monday") return week.monday;
    else if (day == "Tuesday") return week.tuesday;
    else if (day == "Wednesday") return week.wednesday;
    else if (day == "Thursday") return week.thursday;
    else if (day == "Friday") return week.friday;
    else return week.saturday;
  };

  const dayPlan = returnDay(day);
  const breakfasts = dayPlan.breakfasts;
  const lunches = dayPlan.lunches;
  const dinners = dayPlan.dinners;

  //Previous button on meal
  const handlePrevMeal = (type) => {};

  //Next button on meal
  const handleNextMeal = (type) => {};

  console.log(breakfasts);
  console.log(lunches);
  console.log(dinners);

  return (
    <Wrapper>
      <ContentWrapper>
        <Breakfast>
          <Icon />
          <Meal />
          <PrevNextButtons>
            <PrevButton />
            <NextButton />
          </PrevNextButtons>
        </Breakfast>
        <Lunch>
          <Icon />
          <Meal />
          <PrevNextButtons>
            <PrevButton />
            <NextButton />
          </PrevNextButtons>
        </Lunch>
        <Dinner>
          <Icon />
          <Meal />
          <PrevNextButtons>
            <PrevButton />
            <NextButton />
          </PrevNextButtons>
        </Dinner>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  margin: auto;
`;

const ContentWrapper = styled.div`
  margin: auto;
  display: grid;
  width: 100%;
  gap: 100px;
  grid-template-columns: auto auto auto;
`;

//Breakfast, lunch, and dinner icons
const Icon = styled.img``;

const Breakfast = styled.div``;
const Lunch = styled.div``;
const Dinner = styled.div``;

const PrevNextButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const PrevButton = styled.div``;
const NextButton = styled.div``;

MealPlan.propTypes = {
  day: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  day: state.day,
});

export default connect(mapStateToProps)(MealPlan);
