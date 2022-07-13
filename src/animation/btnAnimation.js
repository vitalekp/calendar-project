const btnAnimation = e => {
  if (e) {
    e.preventDefault();
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(() => {
      e.target.classList.remove('animate');
    }, 700);
  }
};

export default btnAnimation;
