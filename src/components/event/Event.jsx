import React, { useState } from "react";

import "./event.scss";

const Event = ({
  height,
  marginTop,
  title,
  time,
  events,
  id,
  updateEvents,
}) => {
  const [event, setevent] = useState({
    showBtn: false,
    showEvent: true,
  });
  const changeHandler = () => {
    setevent({
      showBtn: !event.showBtn,
      showEvent: true,
    });
  };

  const deleteEventHandler = () => {
    setevent({
      showBtn: false,
      showEvent: false,
    });

    const newEvents = events.filter((el) => el.id !== id);
    updateEvents(newEvents);
  };

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <>
      {event.showEvent && (
        <>
          <div style={eventStyle} className="event" onClick={changeHandler}>
            <div className="event__title">{title}</div>
            <div className="event__time">{time}</div>
            {event.showBtn && (
              <button className="delete-event-btn" onClick={deleteEventHandler}>
                <i class="fas fa-trash-alt">Delete</i>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Event;
