import React from "react";
import Day from "../day/Day";

import "./week.scss";

const Week = ({ weekDates, events, updateEvents, lineTime }) => {
  return (
    <div className="calendar__week">
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
            lineTime={lineTime}
          />
        );
      })}
    </div>
  );
};

export default Week;
