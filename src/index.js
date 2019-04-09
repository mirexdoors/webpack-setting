import './css/style.css';
import text from './js/text';
import setCounter from './js/counter';

setCounter();
text();

document.addEventListener(`DOMContentLoaded`, () => {
  const hello = `Hello world!!`;
  console.log(hello);
});
