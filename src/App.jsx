import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import btnAnimation from './animation/btnAnimation.js';
import { fetchEventsList } from './gateway/eventsGateway.js';
import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';
import './styles/common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalWindow, setModalWindow] = useState(false);
  const [dateValue, setDateValue] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [startTimeValue, setStartTimeValue] = useState(moment(new Date()).format('HH:00'));
  const [endTimeValue, setEndTimeValue] = useState(
    moment(new Date().setHours(new Date().getHours() + 1)).format('HH:00'),
  );

  const updateEvents = () => {
    fetchEventsList().then(eventsList => {
      const updateEventsList = eventsList.map(({ id, description, title, dateFrom, dateTo }) => ({
        id,
        description,
        title,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
      }));
      setEvents(updateEventsList);
    });
  };

  useEffect(() => {
    updateEvents();
  }, []);

  const onSwitchPrevWeek = () => {
    const newDate = new Date(weekStartDate.setDate(weekStartDate.getDate() - 7));
    setWeekStartDate(newDate);
  };

  const onSwitchNextWeek = () => {
    const newDate = new Date(weekStartDate.setDate(weekStartDate.getDate() + 7));
    setWeekStartDate(newDate);
  };

  const onSwitchCurrentWeek = () => {
    setWeekStartDate(new Date());
  };

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const month =
    weekDates[0].getMonth() === weekDates[6].getMonth()
      ? moment(weekDates[0]).format('MMMM')
      : `${moment(weekDates[0]).format('MMMM')} - ${moment(weekDates[6]).format('MMMM')}`;

  const tooggleModalHandler = e => {
    btnAnimation(e);
    setModalWindow(!modalWindow);
  };

  const setModalHandler = (day, startTime, endTime) => {
    setDateValue(day);
    setStartTimeValue(startTime);
    setEndTimeValue(endTime);
  };

  const dateChangeHandler = e => {
    setDateValue(e.target.value);
  };

  const startTimeChangeHandler = e => {
    setStartTimeValue(e.target.value);
  };

  const endTimeChangeHandler = e => {
    setEndTimeValue(e.target.value);
  };

  return (
    <>
      {modalWindow && (
        <Modal
          tooggleModalHandler={tooggleModalHandler}
          updateEvents={updateEvents}
          dateValue={dateValue}
          startTimeValue={startTimeValue}
          endTimeValue={endTimeValue}
          dateChangeHandler={dateChangeHandler}
          startTimeChangeHandler={startTimeChangeHandler}
          endTimeChangeHandler={endTimeChangeHandler}
          events={events}
        />
      )}
      <Header
        onSwitchCurrentWeek={onSwitchCurrentWeek}
        onSwitchNextWeek={onSwitchNextWeek}
        onSwitchPrevWeek={onSwitchPrevWeek}
        tooggleModalHandler={tooggleModalHandler}
        modalWindow={modalWindow}
        month={month}
        updateEvents={updateEvents}
      />
      <Calendar
        weekDates={weekDates}
        tooggleModalHandler={tooggleModalHandler}
        setModalHandler={setModalHandler}
        events={events}
        updateEvents={updateEvents}
      />
    </>
  );
};

export default App;
