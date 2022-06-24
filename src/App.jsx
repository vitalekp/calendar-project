import React, { useState } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import events from "./gateway/events";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [event, setEvents] = useState(events);

  const updateEvents = (arr) => {
    setEvents(arr);
  };

  const tooggleWeekHandler = (e) => {
    if (e.target.className === "navigation__today-btn button") {
      setWeekStartDate(new Date());
      return;
    }

    let newDate;

    if (e.target.id) {
      newDate = new Date(weekStartDate.setDate(weekStartDate.getDate() + 7));
      setWeekStartDate(newDate);
      return;
    }

    newDate = new Date(weekStartDate.setDate(weekStartDate.getDate() - 7));
    setWeekStartDate(newDate);
  };

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const month =
    weekDates[0].getMonth() === weekDates[6].getMonth()
      ? moment(weekDates[0]).format("MMMM")
      : `${moment(weekDates[0]).format("MMMM")} - ${moment(weekDates[6]).format(
          "MMMM"
        )}`;

  return (
    <>
      <Header
        tooggleWeekHandler={tooggleWeekHandler}
        month={month}
        updateEvents={updateEvents}
      />
      <Calendar weekDates={weekDates} events={event} />
    </>
  );
};

export default App;
