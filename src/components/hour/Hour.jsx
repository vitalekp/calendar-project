import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ events, updateEvents, dataDay, dataHour, hourEvents }) => {
  const [isLine, setLine] = useState();
  const [lineStyle, setLineStyle] = useState({
    marginTop: new Date().getMinutes() - 1,
  });

  useEffect(() => {
    const isHour = new Date().getHours() === dataHour;
    const isDay = new Date().getDate() === dataDay;
    const line = isHour && isDay;
    setLine(line);

    const interval = setInterval(() => {
      setLine(line);
      setLineStyle({
        marginTop: lineStyle.marginTop + 1,
      });
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {isLine && <div className="red-line" style={lineStyle}></div>}
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

Hour.propTypes = {
  events: PropTypes.array,
  updateEvents: PropTypes.func,
  hourEvents: PropTypes.array,
  dataDay: PropTypes.number,
  dataHour: PropTypes.number,
};
