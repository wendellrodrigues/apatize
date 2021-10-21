import React, { useEffect, useRef, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import SideWaysLogo from "../../static/logos/sideways_logo.svg";
import { MenuText } from "../../styles/TextStyles";
import useOnClickOutside from "../../helpers/hooks";

import { logout } from "../../actions/auth";

const SideMenu = (props) => {
  const {
    open,
    setOpen,
    auth: { isAuthenticated, loading },
    logout,
  } = props;

  //For closing the side menu (small screens) on selection
  const closeMenu = () => {
    setOpen(false);
  };

  //Menu for when app is at login screen
  const LoginMenu = [
    { title: "Login", link: "/" },
    { title: "Register", link: "/register" },
  ];

  const guestLinks = [
    { title: "Login", link: "/" },
    { title: "Register", link: "/register" },
  ];

  //Menu Items for when app is authenticated
  const authLinks = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Profile", link: "/profile" },
    { title: "Logout", action: logout, link: "/" },
  ];

  const guestMenu = (
    <MenuWrapper count={guestLinks.length}>
      {guestLinks.map((item, index) => (
        <Link to={item.link}>
          <MenuItem>{item.title}</MenuItem>
        </Link>
      ))}
    </MenuWrapper>
  );

  const authMenu = (
    <MenuWrapper count={authLinks.length}>
      {authLinks.map((item, index) => (
        <Link to={item.link}>
          <MenuItem onClick={item.action}>{item.title}</MenuItem>
        </Link>
      ))}
    </MenuWrapper>
  );

  return (
    <Wrapper open={open}>
      {!loading && (
        <Fragment>{isAuthenticated ? authMenu : guestMenu}</Fragment>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: grid;
  background: white;
  z-index: 3;
  height: 100%;
  width: 40%;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  @media (min-width: 760px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  display: grid;
  gap: 20px;
  position: absolute;
  top: 7rem;
  left: 2rem;
  padding-right: ${({ open }) => (open ? "50px" : "0px")};
`;

const MenuItem = styled(MenuText)`
  padding: 5px;
`;

SideMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(SideMenu);
