import React from "react";

import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ dataDay, dataHour, hourEvents, events, updateEvents }) => {
  const isHour = new Date().getHours() === dataHour;
  const isDay = new Date().getDate() === dataDay;
  const line = isHour && isDay;

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {line && <div className="red-line"></div>}
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            events={events}
            updateEvents={updateEvents}
          />
        );
      })}
    </div>
  );
};

export default Hour;
