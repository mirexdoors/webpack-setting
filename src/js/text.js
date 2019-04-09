function setText() {
  const text = `I'm the text...!`;
  const textHolder = document.createElement(`DIV`);
  textHolder.innerHTML = text;
  document.body.appendChild(textHolder);
}

export default setText;
