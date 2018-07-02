/*
  Minimum
  The previous chapter introduced the standard function Math.min that returns its
  smallest argument. We can build something like that now. Write a function min that takes
  two arguments and returns their minimum.

===================================================================================================*/

const min = (x, y) => x < y ? x : y;

console.log(min(0, 10));
console.log(min(0, -10));
