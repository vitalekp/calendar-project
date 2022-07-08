import React, { useState } from "react";
import { deleteTask } from "../../gateway/eventsGateway";

import "./event.scss";

const Event = ({ height, marginTop, title, time, id, updateEvents }) => {
  const [event, setEvent] = useState({
    showBtn: false,
    showEvent: true,
  });
  const changeHandler = () => {
    setEvent({
      showBtn: !event.showBtn,
      showEvent: true,
    });
  };

  const deleteEventHandler = () => {
    setEvent({
      showBtn: false,
      showEvent: false,
    });

    deleteTask(id);
    updateEvents();
  };

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <>
      {event.showEvent && (
        <>
          {event.showBtn && (
            <button className="delete-event-btn" onClick={deleteEventHandler}>
              <i className="fas fa-trash-alt">Delete</i>
            </button>
          )}
          <div style={eventStyle} className="event" onClick={changeHandler}>
            <div className="event__title">{title}</div>
            <div className="event__time">{time}</div>
          </div>
        </>
      )}
    </>
  );
};

export default Event;
