import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchCreateEvent } from '../../gateway/eventsGateway';
import './modal.scss';
import ModalForm from './modalForm/ModalForm';
import {
  checkEventDuration,
  checkEventStart,
  checkEventTimeCrossing,
  checkEventTiming,
} from '../../сheckValidation/сheckValidation';

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

  const createEventHandler = async e => {
    e.preventDefault();
    const [year, month, day] = dateValue.split('-');
    const [startHour, startMinute] = startTimeValue.split(':');
    const [endHour, endMinute] = endTimeValue.split(':');

    if (checkEventTiming(startMinute, endMinute)) {
      return false;
    }

    const event = {
      title: titleValue,
      description: descriptionValue,
      dateFrom: new Date(year, month - 1, day, startHour, startMinute),
      dateTo: new Date(year, month - 1, day, endHour, endMinute),
    };
    const { dateFrom, dateTo } = event;

    if (checkEventStart(dateFrom, dateTo)) {
      return false;
    }

    const diffTime = dateTo - dateFrom;

    if (checkEventDuration(diffTime)) {
      return false;
    }

    if (checkEventTimeCrossing(events, event)) {
      return false;
    }

    tooggleModalHandler();
    await fetchCreateEvent(event);
    await updateEvents();
    return true;
  };

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
