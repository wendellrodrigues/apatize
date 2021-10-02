import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div>
      <AlertText key={alert.id}>{alert.msg}</AlertText>
    </div>
  ));

const AlertText = styled.p`
  color: #e77b7b;
  font-size: 16px;
  font-weight: bold;
  line-height: normal;
`;

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//Mapping the redux state as a prop to the component
const mapStateToProps = (state) => ({
  alerts: state.alert, //From root reducer
});

export default connect(mapStateToProps)(Alert);
