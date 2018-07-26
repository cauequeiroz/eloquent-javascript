/*
  Mouse trail

  In JavaScript’s early days, which was the high time of gaudy home pages with lots of
  animated images, people came up with some truly inspiring ways to use the language.

  One of these was the mouse trail—a series of elements that would follow the mouse pointer
  as you moved it across the page.

  In this exercise, I want you to implement a mouse trail. Use absolutely positioned <div>
  elements with a fixed size and background color (refer to the code in the “Mouse Clicks”
  section for an example). Create a bunch of such elements and, when the mouse moves,
  display them in the wake of the mouse pointer.

  There are various possible approaches here. You can make your solution as simple or as
  complex as you want. A simple solution to start with is to keep a fixed number of trail
  elements and cycle through them, moving the next one to the mouse’s current position every
  time a "mousemove" event occurs.

========================================================================================== */

const createTrail = (x, y) => {
  const trail = document.createElement('div');
  trail.className = 'trail';
  trail.style.top = y + 'px';
  trail.style.left = x + 'px';

  return trail;
};

window.addEventListener('mousemove', event => {  
  const trails = document.querySelectorAll('.trail');
  if (trails.length == 10) trails[0].remove();
  
  const trail = createTrail(event.pageX, event.pageY);
  document.body.appendChild(trail);
});