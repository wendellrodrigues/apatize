import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Input, SubmitButton, ButtonText, TextField } from "./InputFieldStyles";

//The Profile Input (with letters at the end ie. in, ft, lbs)
export const ProfileInput = styled(Input)`
  height: 40px;
  border-radius: 15px;
  grid-template-columns: auto 40px;
  @media (max-width: 400px) {
    height: 40px;
  }
`;

export const ProfileSelectInput = styled(ProfileInput)`
  grid-template-columns: auto 30px;
`;

export const TxtIdentifier = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  //line-height: 16px;
  color: gray;
  overflow: hidden;
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

export const NumberField = styled(TextField)`
  margin-left: 50%;
  color: gray;
`;

export const SelectField = styled.select`
  overflow: hidden;
  margin-left: 40%;
  font-size: 15px; 
  transform: ${(props) =>
    props.name == props.stateName ? "scale(1.1)" : "none"};
  };
  font-weight: 550;
  background: none;
  border: none;
  outline: none;
  color: gray;
  ::placeholder {
    color: #b7a8a8;
  }
  transition: 0.2s linear;
  @media (max-width: 400px) {
    font-size: 12px;
  }`;

//The Profile Input (with no letters at the end but dropdown menu)
export const ProfileSecondaryInput = styled(Input)`
  grid-template-columns: auto 40px;
`;

//The Save Button
export const SaveButton = styled(SubmitButton)`
  margin-top: 30px;
  background: #cbf6da;

  :hover {
    background: #72a182;
  }
`;
export const SaveButtonText = styled(ButtonText)`
  color: #0b461b;
`;

export const ErrorText = styled.p`
  color: #bd5555;
  font-size: 12px;
  font-weight: bold;
  line-height: 13px;
`;
