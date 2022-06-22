import React, { useState } from "react";
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

const Modal = ({ tooggleModalHandler }) => {
  const [value, setValue] = useState("");
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
    console.log(e.target.value);
    setStartTimeValue(e.target.value);
  };

  const endTimeChangeHandler = (e) => {
    console.log(e.target.value);
    setEndTimeValue(e.target.value);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
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
              value={value}
              onChange={handleChange}
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
              value={value}
              onChange={handleChange}
            />
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
