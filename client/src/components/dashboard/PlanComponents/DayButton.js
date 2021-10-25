import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { changeDay } from "../../../actions/day";

const DayButton = ({ changeDay, day: { day }, today: { word, number } }) => {
  //Handles the change of day state
  const handleClick = () => {
    changeDay(word);
  };

  return (
    <Wrapper day={day} word={word} onClick={handleClick}>
      <DayOfTheWeek day={day} word={word}>
        {word}
      </DayOfTheWeek>
      <Day day={day} word={word}>
        {number}
      </Day>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  margin: auto;
  justify-items: center;
  gap: 5px;
  overflow: hidden;
  background: ${(props) => (props.day == props.word ? "#fae6e6" : "null")};
  border-radius: 10px;
  padding: 10px;
  transition: 0.3s linear;

  :hover {
    cursor: pointer;
    background: ${(props) => (props.day == props.word ? "#e6bebe" : "#fae6e6")};
  }
`;

const DayOfTheWeek = styled.p`
  font-style: normal;
  font-weight: bold;
  color: ${(props) => (props.day == props.word ? "#e77b7b" : "gray")};
  font-size: 14px;
  overflow: hidden;
`;

const Day = styled(DayOfTheWeek)``;

DayButton.propTypes = {
  changeDay: PropTypes.func.isRequired,
  day: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  day: state.day,
});

export default connect(mapStateToProps, { changeDay })(DayButton);
