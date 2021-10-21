import React, { Fragment, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import HamburgerButton from "./components/buttons/HamburgerButton";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/dashboard/Profile";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "./components/auth/Register";
import useOnClickOutside from "./helpers/hooks";

import { showMenu, hideMenu } from "./actions/sideMenu";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./utils/setAuthToken";

const App = () => {
  //For side menu
  const [page, setPage] = useState("Login");

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  //Run this localStorage token check on page load
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Wrapper>
            <HamburgerButton />
            <Navbar />
            <SideMenu />
            <Content>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={Login}
                  page={(page) => setPage("Login")}
                />
                <Route
                  exact
                  path="/register"
                  component={Register}
                  page={(page) => setPage("Register")}
                />
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={Dashboard}
                  page={(page) => setPage("Dashboard")}
                />
                <PrivateRoute
                  exact
                  path="/profile"
                  component={Profile}
                  page={(page) => setPage("Profile")}
                />
              </Switch>
            </Content>
          </Wrapper>
        </div>
      </Router>
    </Provider>
  );
};

const Wrapper = styled.div``;
const Content = styled.div`
  margin-top: 120px;

  @media (max-width: 745px) {
    margin-top: 0px;
  }
`;
export default App;
