import React, { useEffect, useRef, useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import styled from "styled-components";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

//Hook
import useOnClickOutside from "../../helpers/hooks";

import {
  ProfileInput,
  ProfileSelectInput,
  NumberField,
  SelectField,
  TxtIdentifier,
  SaveButton,
  SaveButtonText,
  ErrorText,
} from "../../styles/ProfileInputFieldStyles";

const ProfileForm = ({ alerts, setAlert, profile: { profile, loading } }) => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    sex: "Male",
    goal: "Lose Weight",
    lifestyle: "Sedentary",
  });

  const [heightData, setHeight] = useState({
    feet: "",
    inches: "",
  });

  //Load profile data if exists
  useEffect(() => {
    if (profile) {
      const { height, weight, age, sex, goal, lifestyle } = profile;
      const { feet, inches } = convertInchesToHeight(height);
      setFormData({
        height: height,
        weight: weight,
        age: age,
        sex: sex,
        goal: goal,
        lifestyle: lifestyle,
      });
      setHeight({
        feet: feet,
        inches: inches,
      });
    }
  }, []);

  const convertInchesToHeight = (totalInches) => {
    const inches = totalInches % 12;
    const leftover = totalInches - inches;
    const feet = leftover / 12;
    return {
      feet: feet,
      inches: inches,
    };
  };

  const [clickedState, setClickedState] = useState("");

  //Destructure
  const { height, weight, age, sex, goal, lifestyle } = formData;
  const { feet, inches } = heightData;

  //To update form data
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Update Height
  const changeHeight = (e) => {
    setHeight({
      ...heightData,
      [e.target.name]: e.target.value,
    });
  };

  //Calculates Height
  const calculateHeight = (data) => {
    const feet = parseInt(data.feet);
    const inches = parseInt(data.inches);
    const totalHeight = feet * 12 + inches;

    //Check if height input is valid
    if (totalHeight) return totalHeight;
    else return null;
  };

  //Sets height on the main form
  //Also checks to make sure the input is valud
  const setFormHeight = (data) => {
    const totalHeight = calculateHeight(data);
    if (totalHeight == null || totalHeight < 24 || totalHeight > 107) {
      return null;
    } else {
      setFormData({ ...formData, height: totalHeight });
      return 1;
    }
  };

  //Submitting the form
  const onSubmit = async () => {
    var errors = 0;
    const heightRes = setFormHeight(heightData);
    const parsedWeight = parseInt(weight);
    const parsedAge = parseInt(age);
    if (heightRes == null) {
      setAlert("Enter a valid height", "height");
      errors++;
    }
    if (
      !Number.isInteger(parsedWeight) ||
      parsedWeight < 50 ||
      parsedWeight > 1000
    ) {
      setAlert("Enter a valid weight", "weight");
      errors++;
    }
    if (!Number.isInteger(parsedAge) || parsedAge < 18 || parsedAge > 150) {
      setAlert("Enter a valid age", "age");
      errors++;
    }

    if (errors == 0) {
      console.log("No Errors");
      console.log(formData);
    }
  };

  const checkError = (type) => {
    let found = false;
    for (alert of alerts) {
      if (alert.alertType == type) {
        found = true;
        return <ErrorText>{alert.msg}</ErrorText>;
      }
    }
    if (found == false) {
      return <Spacer />;
    }
  };

  //Custom use effect for setting the form data (height Data)
  useEffect(() => {
    setFormHeight(heightData);
  }, [heightData]);

  //To handle UI animations for clicked fields
  const setClicked = (e) => {
    setClickedState(e);
  };

  //For Outside Clicks
  const ref = useRef();
  const insideRef = useRef();

  useOnClickOutside(ref, () => {
    setClickedState("");
  });

  useOnClickOutside(insideRef, () => {
    setClickedState("");
  });

  return (
    <Wrapper>
      <ContentWrapper>
        <AttributesWrapper>
          <AttributesFields>
            <FieldWrapper>
              <FieldTitle>Height</FieldTitle>
              <HeightFieldsWrapper>
                <ProfileInput name="feet">
                  <NumberField
                    type="text"
                    name="feet"
                    value={feet}
                    onChange={(e) => changeHeight(e)}
                    onClick={(name) => setClicked("feet")}
                    stateName={clickedState}
                    required
                  />
                  <TxtIdentifier>ft.</TxtIdentifier>
                </ProfileInput>
                <ProfileInput name="inches">
                  <NumberField
                    type="text"
                    name="inches"
                    value={inches}
                    onChange={(e) => changeHeight(e)}
                    onClick={(name) => setClicked("inches")}
                    stateName={clickedState}
                    required
                  />
                  <TxtIdentifier>in.</TxtIdentifier>
                </ProfileInput>
              </HeightFieldsWrapper>
              {checkError("height")}
            </FieldWrapper>
            <FieldWrapper>
              <FieldTitle>Weight</FieldTitle>
              <ProfileInput name="weight">
                <NumberField
                  type="text"
                  name="weight"
                  value={weight}
                  onChange={(e) => onChange(e)}
                  onClick={(name) => setClicked("weight")}
                  stateName={clickedState}
                  required
                />
                <TxtIdentifier>lbs.</TxtIdentifier>
              </ProfileInput>
              {checkError("weight")}
            </FieldWrapper>
            <FieldWrapper>
              <FieldTitle>Age</FieldTitle>
              <ProfileInput name="age">
                <NumberField
                  type="text"
                  name="age"
                  value={age}
                  onChange={(e) => onChange(e)}
                  onClick={(name) => setClicked("age")}
                  stateName={clickedState}
                  required
                />
                <TxtIdentifier>yrs.</TxtIdentifier>
              </ProfileInput>
              {checkError("age")}
            </FieldWrapper>
            <FieldWrapper>
              <FieldTitle>Sex</FieldTitle>
              <ProfileSelectInput name="sex">
                <SelectField
                  type="text"
                  name="sex"
                  value={sex}
                  onChange={(e) => onChange(e)}
                  onClick={(name) => setClicked("sex")}
                  stateName={clickedState}
                  required
                >
                  <option name="male"> Male</option>
                  <option name="female">Female</option>
                </SelectField>
              </ProfileSelectInput>
            </FieldWrapper>
          </AttributesFields>
        </AttributesWrapper>
        <ObjectivesWrapper>
          <ObjectivesFields>
            <FieldWrapper>
              <FieldTitle>Goal</FieldTitle>
              <ProfileSelectInput name="goal">
                <SelectField
                  type="text"
                  name="goal"
                  value={goal}
                  onChange={(e) => onChange(e)}
                  onClick={(name) => setClicked("goal")}
                  stateName={clickedState}
                  required
                >
                  <option name="loseWeight"> Lose Weight</option>
                  <option name="maintain">Maintain</option>
                  <option name="gainMuscle"> Gain Muscle</option>
                </SelectField>
              </ProfileSelectInput>
            </FieldWrapper>
            <FieldWrapper>
              {checkError()}
              <FieldTitle>Activity Level</FieldTitle>
              <ProfileSelectInput name="lifestyle">
                <SelectField
                  type="text"
                  name="lifestyle"
                  value={lifestyle}
                  onChange={(e) => onChange(e)}
                  onClick={(name) => setClicked("lifestyle")}
                  stateName={clickedState}
                  required
                >
                  <option name="sedentary">Sedentary</option>
                  <option name="light">Light</option>
                  <option name="moderate">Moderate</option>
                  <option name="active">Active</option>
                </SelectField>
              </ProfileSelectInput>
            </FieldWrapper>
          </ObjectivesFields>
          <SaveButton onClick={onSubmit}>
            <SaveButtonText>Save</SaveButtonText>
          </SaveButton>
        </ObjectivesWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 100px;
  width: 60%;

  @media (max-width: 1300px) {
    width: 90%;
  }
`;
const ContentWrapper = styled.div`
  position: relative;
  display: grid;
  margin: auto;
  grid-template-columns: auto auto;

  @media (max-width: 860px) {
    grid-template-columns: auto;
    gap: 30px;
  }
`;

const AttributesWrapper = styled.div`
  position: relative;
  margin: auto;
  width: 350px;

  @media (max-width: 400px) {
    width: 280px;
  }
`;
const ObjectivesWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 350px;

  @media (max-width: 400px) {
    width: 280px;
  }
`;

const AttributesFields = styled.div`
  position: relative;
  display: grid;
  align-content: start;
  gap: 30px;
  border-radius: 30px;
  width: 100%;
  height: auto;
  border: 3px solid #f4f4f4;
  padding-top: 50px;
  padding-bottom: 50px;
`;
const ObjectivesFields = styled(AttributesFields)``;

const FieldWrapper = styled.div`
  position: relative;
  display: grid;
  gap: 5px;
  margin: auto;
  width: 75%;
`;

const FieldTitle = styled.h1`
  position: relative;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  color: black;
`;

const HeightFieldsWrapper = styled.div`
  display: grid;
  margin: auto;
  gap: 10px;
  grid-template-columns: auto auto;
`;

const Spacer = styled.div`
  height: 13px;
`;

ProfileForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert, //From root reducer
  profile: state.profile,
});

export default connect(mapStateToProps, { setAlert })(ProfileForm);
