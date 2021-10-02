import React, { Fragment, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import HamburgerButton from "./components/buttons/HamburgerButton";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import useOnClickOutside from "./helpers/hooks";

//Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  //For side menu
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("Login");

  const ref = useRef();

  useOnClickOutside(ref, () => {
    setOpen(false);
    console.log("Clicked outside");
  });

  return (
    <Provider store={store}>
      <Router>
        <div ref={ref}>
          <Wrapper>
            <HamburgerButton open={open} setOpen={(open) => setOpen(open)} />
            <Navbar />
            <SideMenu open={open} setOpen={(open) => setOpen(open)} />
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
            </Switch>
          </Wrapper>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

const Wrapper = styled.div``;
