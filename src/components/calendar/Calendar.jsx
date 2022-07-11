import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({ events, weekDates, updateEvents, tooggleModalHandler, setModalHandler }) => (
  <section className="calendar">
    <Navigation weekDates={weekDates} />
    <div className="calendar__body">
      <div className="calendar__week-container">
        <Sidebar />
        <Week
          weekDates={weekDates}
          events={events}
          updateEvents={updateEvents}
          tooggleModalHandler={tooggleModalHandler}
          setModalHandler={setModalHandler}
        />
      </div>
    </div>
  </section>
);

export default Calendar;

Calendar.propTypes = {
  events: PropTypes.array,
  weekDates: PropTypes.array,
  updateEvents: PropTypes.func,
  tooggleModalHandler: PropTypes.func,
  setModalHandler: PropTypes.func,
};
