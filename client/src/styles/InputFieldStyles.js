import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const Input = styled.div`
  overflow: hidden;
  display: grid;
  position: relative;
  border-color: ${(props) =>
    props.name == props.stateName ? "#e77b7b" : "#e77b7b"};
  };
  border-style: solid;
  margin: auto;
  border-width: 3px;
  border-radius: 20px;
  grid-template-columns: 40px auto;
  align-items: center;
  width: 100%;
  height: 60px;
  background: ${(props) =>
    props.name == props.stateName
      ? "rgb(255, 255, 255, 0.3)"
      : "rgb(255, 255, 255, 0)"};
  }
  transition: 0.2s linear;
  
  

`;

export const Icon = styled.img`
  display: grid;
  position: relative;
  margin-left: ${(props) => (props.name == props.stateName ? "26px" : "25px")};
  };
  width: 15px;
  height: 15px;
  transform: ${(props) =>
    props.name == props.stateName ? "scale(1.2)" : "none"};
  };
  opacity: ${(props) => (props.name == props.stateName ? "1" : "0.7")};
  };
  transition: 0.2s linear;
`;

export const TextField = styled.input`
  overflow: hidden;
  margin-left: ${(props) => (props.name == props.stateName ? "30px" : "15px")};
  };
  font-size: 15px; 
  transform: ${(props) =>
    props.name == props.stateName ? "scale(1.1)" : "none"};
  };
  font-weight: 550;
  background: none;
  border: none;
  outline: none;
  color: #e77b7b;
  ::placeholder {
    color: #b7a8a8;
  }
  transition: 0.2s linear;
   
`;

export const SubmitButton = styled.div`
  display: grid;
  margin: auto;
  margin-top: 10px;
  height: 60px;
  width: 100%;
  background: #e77b7b;
  border-radius: 20px;
  justify-items: center;
  align-items: center;

  :hover {
    background: #f59595;
    cursor: pointer;
  }

  transition: 0.2s ease-in;
`;

export const ButtonText = styled.p`
  color: white;
  font-size: 17px;
  font-weight: bold;
  line-height: normal;
`;

export const OrDivider = styled.div`
  display: grid;
  width: 100%;
  display: grid;
  grid-template-columns: auto 20px auto;
  gap: 10px;
  justify-items: center;
  align-items: center;
`;

export const Line = styled.div`
  display: grid;
  position: relative;
  height: 1px;
  width: 95%;
  background: gray;
  opacity: 0.5;
  border-radius: 1px;
`;

export const OrText = styled.p`
  font-weight: bold;
  line-height: normal;
  margin: auto;
  font-size: 10px;
  color: gray;
  opacity: 0.5;
`;

export const ChangePageText = styled.p`
  color: #e77b7b;
  font-weight: bold;
  font-size: 17px;
  line-height: normal;
  :hover {
    color: #f59595;
    cursor: pointer;
  }
  transition: 0.2s ease-in;
`;
