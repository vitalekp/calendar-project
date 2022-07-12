import React from 'react';
import PropTypes from 'prop-types';
import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => (
  <header className="calendar__header">
    {weekDates.map(dayDate => {
      const currentDay = new Date().getDate();

      const dayNameStyles =
        currentDay === dayDate.getDate()
          ? {
              fontWeight: '700',
              color: '#08284f',
            }
          : { backgroundColor: 'none' };

      const dayNumberStyles =
        currentDay === dayDate.getDate()
          ? {
              backgroundColor: '#08284f',
              borderRadius: '90%',
              color: '#fff',
              width: '35px',
              textAlign: 'center',
            }
          : { backgroundColor: 'none' };

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
