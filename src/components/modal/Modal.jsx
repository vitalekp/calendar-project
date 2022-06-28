import React, { useState } from "react";
import events from "../../gateway/events";
import moment from "moment";

import "./modal.scss";

// Read modal form & save event
// algo
// 1 взяти значення кожного інпуту
// 2 перекинути events
// 3 помістити значення в массив обєктів events
// value="2018-07-22"
// var dateComponent = date.utc().format('YYYY-MM-DD');
// var timeComponent = date.utc().format('HH:mm:ss');

const Modal = ({ tooggleModalHandler, updateEvents }) => {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [startTimeValue, setStartTimeValue] = useState(
    moment(new Date()).format("HH:mm")
  );

  const [endTimeValue, setEndTimeValue] = useState(
    moment(new Date()).format("HH:mm")
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

  const changeValueHandler = (e) => {
    e.target.name === "title"
      ? setTitleValue(e.target.value)
      : setDescriptionValue(e.target.value);
  };

  const createEventHandler = (e) => {
    e.preventDefault();
    const [year, month, day] = dateValue.split("-");
    const [startHour, startMinute] = startTimeValue.split(":");
    const [endHour, endMinute] = endTimeValue.split(":");
    const event = {
      // id: Date.now(),
      title: titleValue,
      description: descriptionValue,
      dateFrom: new Date(year, month - 1, day, startHour, startMinute),
      dateTo: new Date(year, month - 1, day, endHour, endMinute),
    };

    fetch("https://62ac7a419fa81d00a7b2f6c1.mockapi.io/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    events.push(event);
    const newEvents = events.slice();

    updateEvents(newEvents);
    tooggleModalHandler();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={tooggleModalHandler}
          >
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={titleValue}
              onChange={changeValueHandler}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={dateValue}
                onChange={dateChangeHandler}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTimeValue}
                onChange={startTimeChangeHandler}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTimeValue}
                onChange={endTimeChangeHandler}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={descriptionValue}
              onChange={changeValueHandler}
            />
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={createEventHandler}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
