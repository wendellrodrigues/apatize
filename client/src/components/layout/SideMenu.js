import React, { useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MenuText } from "../../styles/TextStyles";
import useOnClickOutside from "../../helpers/hooks";
import ExitButton from "../buttons/ExitButton";

import { logout } from "../../actions/auth";
import { hideMenu } from "../../actions/sideMenu";

const SideMenu = ({
  auth: { isAuthenticated, loading },
  logout,
  sideMenu: { open },
  hideMenu,
}) => {
  const ref = useRef();

  useOnClickOutside(ref, () => {
    hideMenu();
  });

  useRef(() => {}, [open]);

  const guestLinks = [
    { title: "Login", link: "/" },
    { title: "Register", link: "/register" },
  ];

  //Menu Items for when app is authenticated
  const authLinks = [
    { title: "Dashboard", action: hideMenu, link: "/dashboard" },
    { title: "Profile", action: hideMenu, link: "/profile" },
    { title: "Logout", action: logout, link: "/" },
  ];

  const guestMenu = (
    <MenuWrapper count={guestLinks.length}>
      {guestLinks.map((item, index) => (
        <Link to={item.link}>
          <MenuItem onClick={hideMenu}>{item.title}</MenuItem>
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

  if (open) {
    return (
      <Wrapper ref={ref} open={open}>
        <ExitButton />
        {!loading && (
          <Fragment>{isAuthenticated ? authMenu : guestMenu}</Fragment>
        )}
      </Wrapper>
    );
  } else {
    return <Fragment />;
  }
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

  @media (max-width: 400px) {
    width: 60%;
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
  sideMenu: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sideMenu: state.sideMenu,
});

export default connect(mapStateToProps, { hideMenu, logout })(SideMenu);
