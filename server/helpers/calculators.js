module.exports = {
  getDays: () => {
    //Get today
    var date = new Date();
    const today = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDay();

    const leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

    //Standardize Time to UTC
    date.setTime(
      date.getTime() +
        date.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ +
        /* UTC+8 */ 8 * 60 * 60 * 1000
    );

    var sunday = today - day;
    var monday = today - day + 1;
    var tuesday = today - day + 2;
    var wednesday = today - day + 3;
    var thursday = today - day + 4;
    var friday = today - day + 5;
    var saturday = today - day + 6;

    //31 Day months
    if (
      month == "January" ||
      month == "March" ||
      month == "May" ||
      month == "July" ||
      month == "August" ||
      month == "October" ||
      month == "December"
    ) {
      //Handle end of month
      if (sunday > 31) sunday = sunday - 31;
      if (monday > 31) monday = monday - 31;
      if (tuesday > 31) tuesday = tuesday - 31;
      if (wednesday > 31) wednesday = wednesday - 31;
      if (thursday > 31) thursday = thursday - 31;
      if (friday > 31) friday = friday - 31;
      if (saturday > 31) saturday = saturday - 31;

      //Handle beginning of month
      //Months with 30 days the month prior
      if (
        month == "May" ||
        month == "July" ||
        month == "October" ||
        month == "December"
      ) {
        if (sunday < 1) sunday = sunday + 30;
        if (monday < 1) monday = monday + 30;
        if (tuesday < 1) tuesday = tuesday + 30;
        if (wednesday < 1) wednesday = wednesday + 30;
        if (thursday < 1) thursday = thursday + 30;
        if (friday < 1) friday = friday + 30;
        if (saturday < 1) saturday = saturday + 30;
      }
      //Months with 31 days prior
      else if (month == "January" || month == "August") {
        if (sunday < 1) sunday = sunday + 31;
        if (monday < 1) monday = monday + 31;
        if (tuesday < 1) tuesday = tuesday + 31;
        if (wednesday < 1) wednesday = wednesday + 31;
        if (thursday < 1) thursday = thursday + 31;
        if (friday < 1) friday = friday + 31;
        if (saturday < 1) saturday = saturday + 31;
      }
      //Month is march (February prior 28/29)
      else {
        //29 days
        if (leapYear) {
          if (sunday < 1) sunday = sunday + 29;
          if (monday < 1) monday = monday + 29;
          if (tuesday < 1) tuesday = tuesday + 29;
          if (wednesday < 1) wednesday = wednesday + 29;
          if (thursday < 1) thursday = thursday + 29;
          if (friday < 1) friday = friday + 29;
          if (saturday < 1) saturday = saturday + 29;
        }
        //28 days
        else {
          if (sunday < 1) sunday = sunday + 28;
          if (monday < 1) monday = monday + 28;
          if (tuesday < 1) tuesday = tuesday + 28;
          if (wednesday < 1) wednesday = wednesday + 28;
          if (thursday < 1) thursday = thursday + 28;
          if (friday < 1) friday = friday + 28;
          if (saturday < 1) saturday = saturday + 28;
        }
      }
    } else if (month == "February") {
      //Beginning of month
      //29 days
      if (leapYear) {
        if (sunday > 28) sunday = sunday - 28;
        if (monday > 28) monday = monday - 28;
        if (tuesday > 28) tuesday = tuesday - 28;
        if (wednesday > 28) wednesday = wednesday - 28;
        if (thursday > 28) thursday = thursday - 28;
        if (friday > 28) friday = friday - 28;
        if (saturday > 28) saturday = saturday - 28;
      }
      //28 days
      else {
        if (sunday > 29) sunday = sunday - 29;
        if (monday > 29) monday = monday - 29;
        if (tuesday > 29) tuesday = tuesday - 29;
        if (wednesday > 29) wednesday = wednesday - 29;
        if (thursday > 29) thursday = thursday - 29;
        if (friday > 29) friday = friday - 29;
        if (saturday > 29) saturday = saturday - 29;
      }

      //End of month
      //February is preceded by January, a 31 day month
      if (sunday < 1) sunday = sunday + 31;
      if (monday < 1) monday = monday + 31;
      if (tuesday < 1) tuesday = tuesday + 31;
      if (wednesday < 1) wednesday = wednesday + 31;
      if (thursday < 1) thursday = thursday + 31;
      if (friday < 1) friday = friday + 31;
      if (saturday < 1) saturday = saturday + 31;
    }
    //30 Day (all others)
    else {
      //End of month
      if (sunday > 30) sunday = sunday - 30;
      if (monday > 30) monday = monday - 30;
      if (tuesday > 30) tuesday = tuesday - 30;
      if (wednesday > 30) wednesday = wednesday - 30;
      if (thursday > 30) thursday = thursday - 30;
      if (friday > 30) friday = friday - 30;
      if (saturday > 30) saturday = saturday - 30;

      //Beginning of month
      //All 30 day months have prior months of 31 days
      if (sunday < 1) sunday = sunday + 31;
      if (monday < 1) monday = monday + 31;
      if (tuesday < 1) tuesday = tuesday + 31;
      if (wednesday < 1) wednesday = wednesday + 31;
      if (thursday < 1) thursday = thursday + 31;
      if (friday < 1) friday = friday + 31;
      if (saturday < 1) saturday = saturday + 31;
    }

    return {
      month: month,
      year: year,
      sunday: sunday,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
    };
  },
  //Calculates a goal caloric expenditure
  calculateGoal: (weight, height, age, sex, lifestyle, goal) => {
    //Calculate caloric expenditure using harris benedict formula
    const expenditure = calculateHarrisBenedict(
      weight,
      height,
      age,
      sex,
      lifestyle
    );

    var recommendedCals = expenditure;

    if (goal == "lose") {
      recommendedCals = expenditure - 500;
    } else if (goal == "maintain") {
      recommendedCals = expenditure; //Do nothing
    } else if (goal == "gain") {
      recommendedCals = expenditure + 500;
    }

    return Math.round(recommendedCals);
  },
};

//Calulates basal metabolic rate
calculateBMR = (weight, height, age, sex) => {
  //Convert weight from lbs to kgs
  const kgs = weight * 0.453592;
  //Convert height from in to cm
  const cms = height * 2.54;
  var bmr = 0;
  //Calculate bmr based on sex
  if (sex == "male") {
    bmr = 10 * kgs + 6.25 * cms - 5 * age + 5;
  } else {
    bmr = 10 * kgs + 6.25 * cms - 5 * age - 161;
  }
  return bmr;
};

//Calculates energy expenditure based on harris/benedict formula
calculateHarrisBenedict = (weight, height, age, sex, lifestyle) => {
  const bmr = calculateBMR(weight, height, age, sex);

  if (lifestyle == "sedentary") {
    return bmr * 1.2;
  } else if (lifestyle == "light") {
    return bmr * 1.375;
  } else if (lifestyle == "moderate") {
    return bmr * 1.55;
  } else if (lifestyle == "active") {
    return bmr * 1.725;
  } else {
    return bmr * 1.9;
  }
};
