import React, { useEffect } from "react";
import styled from "styled-components";

export default function DatesTitle({ dates: { sunday, saturday, month } }) {
  //Serialize month
  const getMonth = () => {
    const months = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    return months[month];
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Month>{getMonth()}</Month>
        <Dates>{`${sunday}-${saturday}`}</Dates>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  margin: auto;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: end;
  gap: 15px;
  margin: auto;
`;

const Month = styled.h1`
  font-style: normal;
  font-weight: bold;
  color: black;
  font-size: 40px;
  overflow: hidden;
`;
const Dates = styled.h3`
  font-style: normal;
  font-weight: bold;
  color: gray;
  font-size: 20px;
  overflow: hidden;
  margin-bottom: 3px;
`;
