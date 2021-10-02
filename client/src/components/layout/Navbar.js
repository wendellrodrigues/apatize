import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SideWaysLogo from "../../static/logos/sideways_logo.svg";
import { MenuText } from "../../styles/TextStyles";

export default function Navbar() {
  //Menu for when app is at login screen
  const LoginMenu = [
    { title: "Login", link: "/" },
    { title: "Register", link: "/register" },
  ];

  return (
    <Wrapper>
      <LogoImg src={SideWaysLogo} />
      <MenuWrapper count={LoginMenu.length}>
        {LoginMenu.map((item, index) => (
          <Link to={item.link}>
            <MenuItem>{item.title}</MenuItem>
          </Link>
        ))}
      </MenuWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 44px auto;
  background: #fae6e6;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  width: 100%;
  margin-top: 0;

  @media (max-width: 760px) {
    display: none;
  }
`;

const LogoImg = styled.img`
  padding-left: 50px;
  @media (max-width: 760px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  display: grid;
  height: auto;
  gap: 30px;
  grid-template-columns: repeat(${(props) => props.count}, auto);
  padding-right: 50px;
  @media (max-width: 760px) {
    > a {
      display: none;
    }
    grid-template-columns: auto;
  }
`;

const MenuItem = styled(MenuText)``;
