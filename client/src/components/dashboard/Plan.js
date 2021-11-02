import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatesTitle from "./PlanComponents/DatesTitle";
import DaysWheel from "./PlanComponents/DaysWheel";
import MealPlan from "./PlanComponents/MealPlan";
import { getCurrentProfile } from "../../actions/profile";
import { generateMealPlan, deleteMealPlan, setPlan } from "../../actions/food";
import Spinner from "../layout/Spinner";

const Plan = ({
  profile: { profile },
  food: { currentMeals, loading },
  day: { day },
  generateMealPlan,
  deleteMealPlan,
  getCurrentProfile,
  setPlan,
}) => {
  //Handler for generating a weekly plan
  const generatePlan = () => {
    generateMealPlan();
  };

  //Sets the current meals
  const setCurrentPlan = () => {
    const week = profile.week;

    console.log(week);

    const sunday = week.sunday;
    const monday = week.monday;
    const tuesday = week.tuesday;
    const wednesday = week.wednesday;
    const thursday = week.thursday;
    const friday = week.friday;
    const saturday = week.saturday;

    //Entire Week (all meals in array)
    const weekPlan = {
      sunday: {
        breakfasts: Object.entries(sunday.breakfasts),
        lunches: Object.entries(sunday.lunches),
        dinners: Object.entries(sunday.dinners),
      },
      monday: {
        breakfasts: Object.entries(monday.breakfasts),
        lunches: Object.entries(monday.lunches),
        dinners: Object.entries(monday.dinners),
      },
      tuesday: {
        breakfasts: Object.entries(tuesday.breakfasts),
        lunches: Object.entries(tuesday.lunches),
        dinners: Object.entries(tuesday.dinners),
      },
      wednesday: {
        breakfasts: Object.entries(wednesday.breakfasts),
        lunches: Object.entries(wednesday.lunches),
        dinners: Object.entries(wednesday.dinners),
      },
      thursday: {
        breakfasts: Object.entries(thursday.breakfasts),
        lunches: Object.entries(thursday.lunches),
        dinners: Object.entries(thursday.dinners),
      },
      friday: {
        breakfasts: Object.entries(friday.breakfasts),
        lunches: Object.entries(friday.lunches),
        dinners: Object.entries(friday.dinners),
      },
      saturday: {
        breakfasts: Object.entries(saturday.breakfasts),
        lunches: Object.entries(saturday.lunches),
        dinners: Object.entries(saturday.dinners),
      },
    };

    //Current meal (which changes)
    const currentWeekPlan = {
      sunday: {
        breakfast: Object.entries(sunday.breakfasts)[0],
        lunch: Object.entries(sunday.lunches)[0],
        dinner: Object.entries(sunday.dinners)[0],
      },
      monday: {
        breakfast: Object.entries(monday.breakfasts)[0],
        lunch: Object.entries(monday.lunches)[0],
        dinner: Object.entries(monday.dinners)[0],
      },
      tuesday: {
        breakfast: Object.entries(tuesday.breakfasts)[0],
        lunch: Object.entries(tuesday.lunches)[0],
        dinner: Object.entries(tuesday.dinners)[0],
      },
      wednesday: {
        breakfast: Object.entries(wednesday.breakfasts)[0],
        lunch: Object.entries(wednesday.lunches)[0],
        dinner: Object.entries(wednesday.dinners)[0],
      },
      thursday: {
        breakfast: Object.entries(thursday.breakfasts)[0],
        lunch: Object.entries(thursday.lunches)[0],
        dinner: Object.entries(thursday.dinners)[0],
      },
      friday: {
        breakfast: Object.entries(friday.breakfasts)[0],
        lunch: Object.entries(friday.lunches)[0],
        dinner: Object.entries(friday.dinners)[0],
      },
      saturday: {
        breakfast: Object.entries(saturday.breakfasts)[0],
        lunch: Object.entries(saturday.lunches)[0],
        dinner: Object.entries(saturday.dinners)[0],
      },
    };

    return {
      week: weekPlan,
      current: currentWeekPlan,
    };
  };

  const getTotalNutrients = () => {
    const dayPlan = currentMeals[day.toLowerCase()];
    const breakfast = dayPlan.breakfast;
    const breakfastCalories = Math.round(breakfast[1].nutrients[0].amount);

    const lunch = dayPlan.lunch;
    const lunchCalories = Math.round(lunch[1].nutrients[0].amount);
    const dinner = dayPlan.dinner;
    const dinnerCalories = Math.round(dinner[1].nutrients[0].amount);
    const totalCalories = breakfastCalories + lunchCalories + dinnerCalories;
    console.log(`Total Calories: ${totalCalories}`);
    return {
      calories: totalCalories,
      carbs: "",
      protein: "",
      fat: "",
    };
  };

  useEffect(() => {
    if (profile.week) setPlan(setCurrentPlan());
  }, [profile]);

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
    deleteMealPlan();
    return false;
  };

  //If plan not generated
  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  } else {
    if (handleRender() == true) {
      //getTotalNutrients();
      const dates = profile.week.dates;
      return (
        <Wrapper>
          <ContentWrapper>
            <TitleWrapper>
              <IngredientsButton>Get Ingredients</IngredientsButton>
              <DatesTitle dates={dates} />
              <NutrientsBox />
            </TitleWrapper>
            <DaysWheel dates={dates} />
            <MealPlan week={profile.week} />
          </ContentWrapper>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <ContentWrapper>
            <WelcomeWrapper>
              <Welcome>Welcome</Welcome>
              <GreenButton onClick={generatePlan}>Generate Plan</GreenButton>
            </WelcomeWrapper>
          </ContentWrapper>
        </Wrapper>
      );
    }
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

const SpinnerContainer = styled.div`
  margin-top: 300px;
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

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
  align-items: center;
  width: 70%;
  margin: auto;
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

const IngredientsButton = styled.div`
  display: grid;
  height: 50px;
  width: 200px;
  background: #cbf6da;
  border-radius: 15px;
  justify-items: center;
  color: #0b461b;
  justify-self: start;
  align-self: center;
  transition: 0.2s ease-in;

  justify-items: center;
  align-items: center;

  color: #0b461b;
  font-size: 17px;
  font-weight: bold;
  line-height: normal;

  :hover {
    background: #e3faeb;
    cursor: pointer;
    color: #76a385;
  }
`;

export const NutrientsBox = styled.div`
  display: grid;
  height: 100px;
  width: 200px;
  background: #e6e6e6;
  border-radius: 15px;
  justify-items: center;
  color: #0b461b;
  justify-self: end;
`;

Plan.propTypes = {
  getCurrentProfile: PropTypes.func,
  generateMealPlan: PropTypes.func.isRequired,
  deleteMealPlan: PropTypes.func.isRequired,
  setPlan: PropTypes.func.isRequired,
  day: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  food: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  day: state.day,
  profile: state.profile,
  food: state.food,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  generateMealPlan,
  deleteMealPlan,
  setPlan,
})(Plan);
