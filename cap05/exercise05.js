/*
  Filter, Map, Reject

  That is not an exercise from Eloquent Javascript Book.
  Implements filter, map and reject (oposite of filter) functions only
  with reduce method.

========================================================================= */

const filter = (list, condition) => list.reduce((arr, item) => {
  return condition(item) ? [...arr, item] : arr;
}, []);

const map = (list, transform) => list.reduce((arr, item) => {
  return arr.concat(transform(item));
}, []);

const reject = (list, condition) => list.reduce((arr, item) => {
  return condition(item) ? arr : [...arr, item];
}, []);


console.log(filter([1, 2, 3, 4, 5, 6], number => number > 3)); // → [4, 5, 6]
console.log(map([1, 2, 3, 4, 5, 6], number => number * 2)); // → [2, 4, 6, 8, 10, 12]
console.log(reject([1, 2, 3, 4, 5, 6], number => number > 3)); // → [1, 2, 3]