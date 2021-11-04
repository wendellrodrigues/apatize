const express = require("express");
const axios = require("axios");

module.exports = {
  /**
      Generates Weekly breakfasts
      Makes axios call to return data based on caloric input
      @param calories Is the max number of calories for each meal
   */
  generateWeeklyBreakfasts: async (calories) => {
    const params = {
      apiKey: process.env.SPOONACULAR_KEY,
      maxCalories: calories,
      type: "breakfast",
      addRecipeNutrition: true,
      includeIngredients: true,
      instructionsRequired: true,
      number: 1,
      offset: 0,
    };

    let data = null;

    try {
      await axios
        .get("https://api.spoonacular.com/recipes/complexSearch", {
          params,
        })
        .then((result) => {
          data = result.data.results;
        });
    } catch (err) {
      return null;
    }

    return data;
  },

  /**
      Generates Weekly lunches and dinners
      Makes axios call to return data based on caloric input
      @param calories Is the max number of calories for each meal
      @param offset Is the offset of search resulsts to the API endpoint
   */
  generateWeeklyMainCourses: async (calories, offset) => {
    const params = {
      apiKey: process.env.SPOONACULAR_KEY,
      maxCalories: calories,
      type: "main course",
      addRecipeNutrition: true,
      includeIngredients: true,
      instructionsRequired: true,
      number: 30,
      offset: offset,
    };

    try {
      await axios
        .get("https://api.spoonacular.com/recipes/complexSearch", {
          params,
        })
        .then((result) => {
          data = result.data.results;
        });
    } catch (err) {
      return null;
    }

    return data;
  },

  /**
      Saves current plan plan to user object in mongodb
      @param plan Is the full weekly saved plan specified by the user
   */
  saveCurrentMealPlan: async (id, plan) => {
    try {
      let profile = await Profile.findOne({ user: id }); //Matched from token
      if (profile) {
        const profileFields = {
          week: {
            sunday: profile.week.sunday,
            monday: profile.week.monday,
            tuesday: profile.week.tuesday,
            wednesday: profile.week.wednesday,
            thursday: profile.week.thursday,
            friday: profile.week.friday,
            saturday: profile.week.saturday,
            dates: profile.week.dates,
            currentMealPlan: plan,
          },
        };

        //Update
        profile = await Profile.findOneAndUpdate(
          { user: id },
          { $set: profileFields },
          { useFindAndModify: false }
        );
        return true;
      } else return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
