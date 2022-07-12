import React from 'react';
import PropTypes from 'prop-types';
import './modalForm.scss';

const ModalForm = ({
  titleValue,
  dateValue,
  startTimeValue,
  endTimeValue,
  descriptionValue,
  changeValueHandler,
  createEventHandler,
  endTimeChangeHandler,
  startTimeChangeHandler,
  dateChangeHandler,
}) => (
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
    <button type="submit" className="event-form__submit-btn" onClick={createEventHandler}>
      Create
    </button>
  </form>
);

export default ModalForm;

ModalForm.propTypes = {
  dateChangeHandler: PropTypes.func,
  dateValue: PropTypes.string,
  endTimeChangeHandler: PropTypes.func,
  endTimeValue: PropTypes.string,
  events: PropTypes.array,
  startTimeChangeHandler: PropTypes.func,
  startTimeValue: PropTypes.string,
  tooggleModalHandler: PropTypes.func,
  updateEvents: PropTypes.func,
};
