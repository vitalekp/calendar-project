import React from 'react';
import PropTypes from 'prop-types';
import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => (
  <header className="calendar__header">
    {weekDates.map(dayDate => {
      const isCurrentDay = new Date().getDate() === dayDate.getDate();

      const dayNameStyles = isCurrentDay
        ? {
            fontWeight: '700',
            color: '#005bff',
          }
        : null;

      const dayNumberStyles = isCurrentDay
        ? {
            backgroundColor: 'rgba(100, 149, 237, 0.15)',
            borderRadius: '90%',
            color: '#005bff',
            width: '35px',
            textAlign: 'center',
          }
        : null;

      return (
        <div key={dayDate} className="calendar__day-label day-label">
          <span className="day-label__day-name" style={dayNameStyles}>
            {days[dayDate.getDay()]}
          </span>
          <span className="day-label__day-number" style={dayNumberStyles}>
            {dayDate.getDate()}
          </span>
        </div>
      );
    })}
  </header>
);

export default Navigation;

Navigation.propTypes = {
  weekDates: PropTypes.array,
};
