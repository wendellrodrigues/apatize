import React, { Fragment } from "react";
import Lottie from "react-lottie";
import LoadingSpinner from "../../static/loading.json";
import styled from "styled-components";

const Spinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingSpinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Fragment>
      <Lottie options={defaultOptions} height={200} width={200} />
    </Fragment>
  );
};

export default Spinner;
