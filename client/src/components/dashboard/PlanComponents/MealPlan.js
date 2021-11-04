import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Meal from "./Meal";
import { adjustCurrentMeals } from "../../../actions/food";

const MealPlan = ({
  week,
  day: { day },
  food: { plan, currentMeals },
  adjustCurrentMeals,
}) => {
  //Returns day's meals based on day of the week
  const returnDay = (day) => {
    if (day == "Sunday") return plan.sunday;
    else if (day == "Monday") return plan.monday;
    else if (day == "Tuesday") return plan.tuesday;
    else if (day == "Wednesday") return plan.wednesday;
    else if (day == "Thursday") return plan.thursday;
    else if (day == "Friday") return plan.friday;
    else return plan.saturday;
  };

  const returnCurrentMeals = (currentMeals, day) => {
    if (day == "Sunday") return currentMeals.sunday;
    else if (day == "Monday") return currentMeals.monday;
    else if (day == "Tuesday") return currentMeals.tuesday;
    else if (day == "Wednesday") return currentMeals.wednesday;
    else if (day == "Thursday") return currentMeals.thursday;
    else if (day == "Friday") return currentMeals.friday;
    else return currentMeals.saturday;
  };

  //Previous button on meal
  const handlePrevButton = async (type) => {
    //Get current plan, breakfast, & breakfast Id
    var plan = returnDay(day);
    var curMeal = returnCurrentMeals(currentMeals, day)[type];
    var curMealId = curMeal[0];

    //Find its index
    var index = 0;
    var allMeals = plan[`${type}s`];
    if (type == "lunch") allMeals = plan.lunches;

    for (var idx in allMeals) {
      if (allMeals[idx][0] == curMealId) index = idx;
    }

    //Find length of the array of current meals for that day and type
    const lastItemIdx = allMeals.length - 1;

    //Decrease by 1 or set to end
    if (index == 0) {
      index = lastItemIdx;
    } else {
      var decreaseIdxBy1 = parseFloat(index) - parseFloat(1);
      index = decreaseIdxBy1;
    }

    //Create new meal and adjust day
    const newMeal = allMeals[index];
    const dayLowercase = day.toLowerCase();

    //Engage action to set current meal to this meal
    await adjustCurrentMeals(currentMeals, newMeal, dayLowercase, type);
    //To Do: Create current meal object in profile (maybe set to only ID)
  };

  const handleNextButton = async (type) => {
    //Get current plan, breakfast, & breakfast Id
    var plan = returnDay(day);
    var curMeal = returnCurrentMeals(currentMeals, day)[type];
    var curMealId = curMeal[0];

    //Find its index
    var index = 0;
    var allMeals = plan[`${type}s`];
    if (type == "lunch") allMeals = plan.lunches;

    for (var idx in allMeals) {
      if (allMeals[idx][0] == curMealId) index = idx;
    }

    //Find length of the array of current meals for that day and type
    const lastItemIdx = allMeals.length - 1;

    //Increase by 1 or set to beginning
    if (index == lastItemIdx) {
      index = 0;
    } else {
      var increaseIdxBy1 = parseFloat(index) + parseFloat(1);
      index = increaseIdxBy1;
    }

    //Create new meal and adjust day
    const newMeal = allMeals[index];
    const dayLowercase = day.toLowerCase();

    //Engage action to set current meal to this meal
    await adjustCurrentMeals(currentMeals, newMeal, dayLowercase, type);
    //To Do: Create current meal object in profile (maybe set to only ID)
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Breakfast>
          <Icon />
          <Meal meal={currentMeals[day.toLowerCase()].breakfast} />
          <PrevNextButtons>
            <PrevButton onClick={() => handlePrevButton("breakfast")}>
              PREV
            </PrevButton>
            <NextButton onClick={() => handleNextButton("breakfast")}>
              NEXT
            </NextButton>
          </PrevNextButtons>
        </Breakfast>
        <Lunch>
          <Icon />
          <Meal meal={currentMeals[day.toLowerCase()].lunch} />
          <PrevNextButtons>
            <PrevButton onClick={() => handlePrevButton("lunch")}>
              PREV
            </PrevButton>
            <NextButton onClick={() => handleNextButton("lunch")}>
              NEXT
            </NextButton>
          </PrevNextButtons>
        </Lunch>
        <Dinner>
          <Icon />
          <Meal meal={currentMeals[day.toLowerCase()].dinner} />
          <PrevNextButtons>
            <PrevButton onClick={() => handlePrevButton("dinner")}>
              PREV
            </PrevButton>
            <NextButton onClick={() => handleNextButton("dinner")}>
              NEXT
            </NextButton>
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

  grid-template-columns: auto auto auto;
  justify-items: space-between;
`;

//Breakfast, lunch, and dinner icons
const Icon = styled.img``;

const Breakfast = styled.div`
  display: grid;
  gap: 10px;
`;
const Lunch = styled(Breakfast)``;
const Dinner = styled(Breakfast)``;

const PrevNextButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const PrevButton = styled.div`
  display: grid;
  margin: auto;
  justify-items: center;
  align-items: center;
  background: #fae6e6;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  transition: 0.3s linear;

  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #e77b7b;

  :hover {
    cursor: pointer;
    background: #faf2f2;
  }
`;
const NextButton = styled(PrevButton)``;

MealPlan.propTypes = {
  adjustCurrentMeals: PropTypes.func,
  day: PropTypes.object.isRequired,
  food: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  day: state.day,
  food: state.food,
});

export default connect(mapStateToProps, { adjustCurrentMeals })(MealPlan);
