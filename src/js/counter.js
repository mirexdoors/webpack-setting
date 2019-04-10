function setCounter() {
  let counterData = 0;
  const counterView = document.createElement(`H1`);
  const counterBtn = document.createElement(`BUTTON`);
  counterBtn.innerText = `Click Me!!`;
  document.body.appendChild(counterBtn);

  counterBtn.addEventListener(`click`, () => {
    counterData += 1;
    counterView.innerText = counterData;
  });


  counterView.innerText = counterData;
  document.body.appendChild(counterView);
}

export default setCounter;
