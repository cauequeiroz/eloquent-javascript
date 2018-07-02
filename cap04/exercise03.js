/*
  A list

  Write a function arrayToList that builds up a list structure like the one shown when
  given [1, 2, 3] as argument. Also write a listToArray function that produces an
  array from a list. Then add a helper function prepend, which takes an element and a
  list and creates a new list that adds the element to the front of the input list,
  and nth, which takes a list and a number and returns the element at the given position
  in the list (with zero referring to the first element) or undefined when there is
  no such element.

  If you haven’t already, also write a recursive version of nth.

============================================================================================= */

const arrayToList = arr => {
  const createList = (arr, index) => {
    if (index > arr.length - 1) return null;

    return {
      value: arr[index],
      rest: createList(arr, index + 1)
    };
  }

  return createList(arr, 0);
};

const listToArray = list => {  
  const createArray = (list, arr) => {
    arr.push(list.value);
    return list.rest != null ? createArray(list.rest, arr) : arr;
  }
  
  return createArray(list, []);
};

const prepend = (value, rest) => ({ value, rest });

const nth = (list, index) => {
  const searchValue = (list, index, counter) =>
    (counter == index) ? list.value : searchValue(list.rest);

  return searchValue(list, index, 0);
};

console.log(arrayToList([10, 20])); // → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30]))); // → [10, 20, 30]
console.log(prepend(10, prepend(20, null))); // → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1)); // → 20