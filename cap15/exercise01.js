/*
  Balloon

  Write a page that displays a balloon (using the balloon emoji, 🎈). When you press the
  up arrow, it should inflate (grow) 10 percent, and when you press the down arrow, it
  should deflate (shrink) 10 percent.

  You can control the size of text (emoji are text) by setting the font-size CSS
  property (style.fontSize) on its parent element. Remember to include a unit in the
  value—for example, pixels (10px).

  The key names of the arrow keys are "ArrowUp" and "ArrowDown". Make sure the keys change
  only the balloon, without scrolling the page.

  When that works, add a feature where, if you blow up the balloon past a certain size,
  it explodes. In this case, exploding means that it is replaced with an 💥 emoji, and the
  event handler is removed (so that you can’t inflate or deflate the explosion).

========================================================================================== */

let balloon = document.querySelector('#balloon');
balloon.style.fontSize = '20px';

const changeSize = (balloon, operator) => {
  let size = Number(balloon.style.fontSize.replace('px', ''));
  let tenPercent = Math.round((size * 10) / 100);

  const operation = {
    '+': size + tenPercent,
    '-': size - tenPercent
  };

  if (operator == '+' && operation[operator] > 150) {
    balloon.textContent = '💥';
    window.removeEventListener('keydown', controlBalloon);
  } else {
    balloon.style.fontSize = operation[operator] + 'px';
  }
};

const growBalloon = balloon => changeSize(balloon, '+');
const shrinkBalloon = balloon => changeSize(balloon, '-');

const controlBalloon = event => {
  if (event.key == 'ArrowUp') {
    growBalloon(balloon);
  
  } else if (event.key == 'ArrowDown') {
    shrinkBalloon(balloon);
  }
};

window.addEventListener('keydown', controlBalloon);