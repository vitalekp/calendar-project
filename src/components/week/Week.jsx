import React from "react";
import PropTypes from "prop-types";
import Day from "../day/Day";

import "./week.scss";
// algo
// 1 найти ячейку
// 2 добавити дані з ячейки у модальне вікно
// 3 відкрити вікно

const Week = ({ events, weekDates, updateEvents, tooggleModalHandler }) => {
  const createEEE = (e) => {
    if (e.target.className === "calendar__time-slot") {
      tooggleModalHandler();
    }
    console.log(e.nativeEvent.path[0].dataset.time);
    console.log(e.nativeEvent.path[1].dataset.day);
  };

  return (
    <div className="calendar__week" onClick={createEEE}>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            events={events}
            updateEvents={updateEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;

Week.propTypes = {
  events: PropTypes.array,
  weekDates: PropTypes.array,
  updateEvents: PropTypes.func,
};
