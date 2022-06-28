import React from "react";

import { days } from "../../utils/dateUtils.js";

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const currentDay = new Date().getDate();
        const dayStyles =
          currentDay === dayDate.getDate()
            ? {
                backgroundColor: "#08284f",
                borderRadius: "50%",
                color: "#fff",
                padding: "4px",
              }
            : { backgroundColor: "none" };

        return (
          <div key={dayDate} className="calendar__day-label day-label">
            <span className="day-label__day-name">
              {days[dayDate.getDay()]}
            </span>
            <span className="day-label__day-number" style={dayStyles}>
              {dayDate.getDate()}
            </span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
