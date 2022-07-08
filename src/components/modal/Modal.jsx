import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { createEvent } from "../../gateway/eventsGateway";
import "./modal.scss";

const Modal = ({
  tooggleModalHandler,
  updateEvents,
  dateValue,
  startTimeValue,
  endTimeValue,
  dateChangeHandler,
  startTimeChangeHandler,
  endTimeChangeHandler,
}) => {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  // const [dateValue, setDateValue] = useState(
  //   moment(new Date()).format("YYYY-MM-DD")
  // );

  // const [startTimeValue, setStartTimeValue] = useState(
  //   moment(new Date()).format("HH:00")
  // );

  // const [endTimeValue, setEndTimeValue] = useState(
  //   moment(new Date().setHours(new Date().getHours() + 1)).format("HH:00")
  // );

  // const dateChangeHandler = (e) => {
  //   setDateValue(e.target.value);
  // };

  // const startTimeChangeHandler = (e) => {
  //   setStartTimeValue(e.target.value);
  // };

  // const endTimeChangeHandler = (e) => {
  //   setEndTimeValue(e.target.value);
  // };

  const changeValueHandler = (e) => {
    e.target.name === "title"
      ? setTitleValue(e.target.value)
      : setDescriptionValue(e.target.value);
  };

  const createEventHandler = async function (e) {
    e.preventDefault();
    const [year, month, day] = dateValue.split("-");
    const [startHour, startMinute] = startTimeValue.split(":");
    const [endHour, endMinute] = endTimeValue.split(":");

    if (startMinute % 15 !== 0 && endMinute % 15 !== 0) {
      alert("Event timing must be a multiple of 15");
      return null;
    }

    const event = {
      title: titleValue,
      description: descriptionValue,
      dateFrom: new Date(year, month - 1, day, startHour, startMinute),
      dateTo: new Date(year, month - 1, day, endHour, endMinute),
    };

    tooggleModalHandler();
    await createEvent(event);
    await updateEvents();
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

Modal.propTypes = {
  tooggleModalHandler: PropTypes.func,
  updateEvents: PropTypes.func,
};
