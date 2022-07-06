import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import { fetchEventsList } from "./gateway/eventsGateway.js";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const updateEvents = () => {
    fetchEventsList().then((tasksList) => {
      const tasks = tasksList.map((event) => {
        event.dateFrom = new Date(event.dateFrom);
        event.dateTo = new Date(event.dateTo);
        return event;
      });
      setEvents(tasks);
    });
  };

  useEffect(() => {
    updateEvents();
  }, []);

  // const fetchEvents = () => {
  //   fetchEventsList().then((tasksList) => {
  //     const tasks = tasksList.map((event) => {
  //       event.dateFrom = new Date(event.dateFrom);
  //       event.dateTo = new Date(event.dateTo);
  //       return event;
  //     });
  //     setEvents(tasks);
  //   });
  // };

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
      <Calendar
        weekDates={weekDates}
        events={events}
        updateEvents={updateEvents}
      />
    </>
  );
};

export default App;

// const str = "gs ha frddd";

// const func = (text) => {
//   let arr = text.split(" ");

//   return arr.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
// };

// const test = func(str);

// console.log(test);
