import React, { Component, useState } from "react";
import Modal from "../modal/Modal";

import "./header.scss";

// Display correct month in header
// algo
// 1 click
// 2 state: true
// 3 render

const Header = ({ tooggleWeekHandler, month }) => {
  const [modalWindow, setModalWindow] = useState(false);

  const tooggleModalHandler = (e) => {
    e.preventDefault;

    // animation
    e.target.classList.remove("animate");
    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);

    setModalWindow(!modalWindow);
  };

  return (
    <header className="header">
      {modalWindow && <Modal tooggleModalHandler={tooggleModalHandler} />}
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
