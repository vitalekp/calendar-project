import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";

import { fetchEventsList } from "./gateway/eventsGateway.js";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [modalWindow, setModalWindow] = useState(false);
  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [startTimeValue, setStartTimeValue] = useState(
    moment(new Date()).format("HH:00")
  );

  const [endTimeValue, setEndTimeValue] = useState(
    moment(new Date().setHours(new Date().getHours() + 1)).format("HH:00")
  );

  const dateChangeHandler = (e) => {
    setDateValue(e.target.value);
  };

  const startTimeChangeHandler = (e) => {
    setStartTimeValue(e.target.value);
  };

  const endTimeChangeHandler = (e) => {
    setEndTimeValue(e.target.value);
  };

  const tooggleModalHandler = (e) => {
    if (e) {
      e.preventDefault;

      e.target.classList.remove("animate");
      e.target.classList.add("animate");
      setTimeout(function () {
        e.target.classList.remove("animate");
      }, 700);
    }

    setModalWindow(!modalWindow);
  };

  const setModalHandler = (day, startTime, endTime) => {
    setDateValue(day);
    setStartTimeValue(startTime);
    setEndTimeValue(endTime);
  };

  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const updateEvents = () => {
    fetchEventsList().then((eventsList) => {
      const tasks = eventsList.map((event) => {
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
      {modalWindow && (
        <Modal
          tooggleModalHandler={tooggleModalHandler}
          updateEvents={updateEvents}
          dateValue={dateValue}
          startTimeValue={startTimeValue}
          endTimeValue={endTimeValue}
          dateChangeHandler={dateChangeHandler}
          startTimeChangeHandler={startTimeChangeHandler}
          endTimeChangeHandler={endTimeChangeHandler}
          events={events}
        />
      )}
      <Header
        tooggleWeekHandler={tooggleWeekHandler}
        tooggleModalHandler={tooggleModalHandler}
        modalWindow={modalWindow}
        month={month}
        updateEvents={updateEvents}
      />
      <Calendar
        weekDates={weekDates}
        tooggleModalHandler={tooggleModalHandler}
        setModalHandler={setModalHandler}
        events={events}
        updateEvents={updateEvents}
      />
    </>
  );
};

export default App;
