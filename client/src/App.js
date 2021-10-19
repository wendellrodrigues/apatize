import React, { Fragment, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import HamburgerButton from "./components/buttons/HamburgerButton";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "./components/auth/Register";
import useOnClickOutside from "./helpers/hooks";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./utils/setAuthToken";

const App = () => {
  //For side menu
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("Login");

  const ref = useRef();

  useOnClickOutside(ref, () => {
    setOpen(false);
    console.log("Clicked outside");
  });

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
        <div ref={ref}>
          <Wrapper>
            <HamburgerButton open={open} setOpen={(open) => setOpen(open)} />
            <Navbar />
            <SideMenu open={open} setOpen={(open) => setOpen(open)} />
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
              </Switch>
            </Content>
          </Wrapper>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

const Wrapper = styled.div``;
const Content = styled.div`
  margin-top: 120px;
`;
