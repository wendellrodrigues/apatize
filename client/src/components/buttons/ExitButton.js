// Burger.js
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { hideMenu, showMenu } from "../../actions/sideMenu";

const ExitButton = ({
  hideMenu,
  showMenu,
  sideMenu: { open },
  auth: { isAuthenticated },
}) => {
  return (
    <Wrapper
      open={open}
      auth={isAuthenticated}
      onClick={() => {
        hideMenu();
      }}
    >
      <div />
      <div />
    </Wrapper>
  );
};

const handleColorType = (obj) => {
  const { open, auth } = obj;
  if (!auth && open) {
    return "background: #e77b7b";
  } else if (!auth && !open) {
    return "background: #fae6e6";
  } else if (auth) {
    return "background: #e77b7b";
  } else {
    return "background: black";
  }
};

const Wrapper = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  z-index: 4;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    ${(auth) => handleColorType(auth)};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: absolute;
    //transform-origin: 1px;

    :first-child {
      transform: rotate(45deg);
    }

    /* :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: translateX(20px);
    } */

    :nth-child(2) {
      transform: rotate(-45deg);
    }
  }

  @media (min-width: 760px) {
    display: none;
  }
`;

ExitButton.propTypes = {
  sideMenu: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  sideMenu: state.sideMenu,
  auth: state.auth,
});

export default connect(mapStateToProps, { hideMenu, showMenu })(ExitButton);
