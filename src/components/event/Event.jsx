import React, { useState } from "react";
import PropTypes from "prop-types";
import { deleteTask } from "../../gateway/eventsGateway";

import "./event.scss";

const Event = ({
  height,
  marginTop,
  title,
  time,
  dateFrom,
  id,
  updateEvents,
}) => {
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

  const deleteEventHandler = (e) => {
    e.stopPropagation();
    const fifteenMinutes = -60 * 1000 * 15;
    const diffTime = new Date() - dateFrom;

    if (diffTime < fifteenMinutes) {
      setEvent({
        showBtn: !event.showBtn,
        showEvent: true,
      });
      alert("You cannot delete the event 15 minutes before the start");
      return null;
    }

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
          <div style={eventStyle} className="event" onClick={changeHandler}>
            <div className="event__title">{title}</div>
            <div className="event__time">{time}</div>
            {event.showBtn && (
              <button className="delete-event-btn" onClick={deleteEventHandler}>
                <i className="fas fa-trash-alt">Delete</i>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Event;

Event.propTypes = {
  events: PropTypes.array,
  height: PropTypes.number,
  id: PropTypes.string,
  marginTop: PropTypes.number,
  time: PropTypes.string,
  title: PropTypes.string,
  updateEvents: PropTypes.func,
};
