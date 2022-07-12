import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createEvent } from '../../gateway/eventsGateway';
import './modal.scss';
import ModalForm from './modalForm/ModalForm';

const Modal = ({
  tooggleModalHandler,
  updateEvents,
  dateValue,
  startTimeValue,
  endTimeValue,
  dateChangeHandler,
  startTimeChangeHandler,
  endTimeChangeHandler,
  events,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const changeValueHandler = e =>
    e.target.name === 'title' ? setTitleValue(e.target.value) : setDescriptionValue(e.target.value);

  async function createEventHandler(e) {
    e.preventDefault();
    const [year, month, day] = dateValue.split('-');
    const [startHour, startMinute] = startTimeValue.split(':');
    const [endHour, endMinute] = endTimeValue.split(':');

    if (startMinute % 15 !== 0 && endMinute % 15 !== 0) {
      alert('Event timing must be a multiple of 15');
      return null;
    }

    const event = {
      title: titleValue,
      description: descriptionValue,
      dateFrom: new Date(year, month - 1, day, startHour, startMinute),
      dateTo: new Date(year, month - 1, day, endHour, endMinute),
    };

    if (event.dateFrom > event.dateTo) {
      alert('Event cannot end earlier than it started');
      return null;
    }

    const diffTime = event.dateTo - event.dateFrom;
    const sixHours = 60 * 1000 * 60 * 6;

    if (diffTime > sixHours) {
      alert('One event cannot be longer than 6 hours');
      return null;
    }

    const timeCrossing = events.some(ev => {
      if (ev.dateFrom < event.dateFrom && ev.dateTo > event.dateFrom) {
        return true;
      }
      if (ev.dateFrom > event.dateFrom && ev.dateFrom < event.dateTo) {
        return true;
      }
      return false;
    });

    if (timeCrossing) {
      alert('Two events cannot overlap in time');
      return null;
    }

    tooggleModalHandler();
    await createEvent(event);
    await updateEvents();
    return null;
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={tooggleModalHandler}>
            +
          </button>
          <ModalForm
            titleValue={titleValue}
            dateValue={dateValue}
            startTimeValue={startTimeValue}
            endTimeValue={endTimeValue}
            descriptionValue={descriptionValue}
            changeValueHandler={changeValueHandler}
            createEventHandler={createEventHandler}
            endTimeChangeHandler={endTimeChangeHandler}
            startTimeChangeHandler={startTimeChangeHandler}
            dateChangeHandler={dateChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  tooggleModalHandler: PropTypes.func,
  updateEvents: PropTypes.func,
  dateValue: PropTypes.string,
  startTimeValue: PropTypes.string,
  endTimeValue: PropTypes.string,
  dateChangeHandler: PropTypes.func,
  startTimeChangeHandler: PropTypes.func,
  endTimeChangeHandler: PropTypes.func,
  events: PropTypes.array,
};
