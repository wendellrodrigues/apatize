import React, { useEffect } from "react";
import styled from "styled-components";

export default function DatesTitle({ month, dates }) {
  //Helper function for getting dates
  const getDates = () => {
    //Get today
    var date = new Date();

    //Standardize Time to UTC
    date.setTime(
      date.getTime() +
        date.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ +
        /* UTC+8 */ 8 * 60 * 60 * 1000
    );

    const today = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDay();

    //Get Sunday of this week
    const firstDay = today - day;

    //Get Saturday of this week
    const lastDay = today + (6 - day);

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

    const monthWord = months[month];
    return { firstDay, lastDay, monthWord };
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <Month>{getDates().monthWord}</Month>
        <Dates>{`${getDates().firstDay}-${getDates().lastDay}`}</Dates>
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
  margin: auto;
`;

const Month = styled.h1``;
const Dates = styled.h3``;
