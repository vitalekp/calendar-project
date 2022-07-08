import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/Modal";

import "./header.scss";

const Header = ({ month, tooggleWeekHandler, updateEvents }) => {
  const [modalWindow, setModalWindow] = useState(false);

  const tooggleModalHandler = (e) => {
    if (e) {
      e.preventDefault();

      // animation
      e.target.classList.remove("animate");
      e.target.classList.add("animate");
      setTimeout(function () {
        e.target.classList.remove("animate");
      }, 700);
    }

    setModalWindow(!modalWindow);
  };

  return (
    <header className="header">
      {modalWindow && (
        <Modal
          tooggleModalHandler={tooggleModalHandler}
          updateEvents={updateEvents}
        />
      )}
      <button className="button create-event-btn" onClick={tooggleModalHandler}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={tooggleWeekHandler}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={tooggleWeekHandler}
        >
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
};

export default Header;

Header.propTypes = {
  month: PropTypes.string,
  tooggleWeekHandler: PropTypes.func,
  updateEvents: PropTypes.func,
};
