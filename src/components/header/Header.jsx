import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ month, tooggleWeekHandler, tooggleModalHandler }) => (
  <header className="header">
    <button className="button create-event-btn" onClick={tooggleModalHandler}>
      <i className="fas fa-plus create-event-btn__icon"></i>Create
    </button>
    <div className="navigation">
      <button className="navigation__today-btn button" onClick={tooggleWeekHandler}>
        Today
      </button>
      <button className="icon-button navigation__nav-icon" onClick={tooggleWeekHandler}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        id="nextWeek"
        className="icon-button navigation__nav-icon"
        onClick={tooggleWeekHandler}
      >
        <i id="nextWeek" className="fas fa-chevron-right"></i>
      </button>
      <span className="navigation__displayed-month">{month}</span>
    </div>
  </header>
);

export default Header;

Header.propTypes = {
  month: PropTypes.string,
  tooggleWeekHandler: PropTypes.func,
  updateEvents: PropTypes.func,
};
