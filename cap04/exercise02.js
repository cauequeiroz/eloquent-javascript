/*
  Reversing an array
  
  Arrays have a reverse method that changes the array by inverting the order in which its
  elements appear. For this exercise, write two functions, reverseArray and
  reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces a
  new array that has the same elements in the inverse order. The second, reverseArrayInPlace,
  does what the reverse method does: it modifies the array given as argument by
  reversing its elements. Neither may use the standard reverse method.

============================================================================================= */

const reverseArray = list => {
  let newList = [];

  for (let item of list) {
    newList.unshift(item);
  }

  return newList;
};

const reverseArrayInPlace = list => {
  let newList = reverseArray(list);

  for (let i = 0; i < list.length; i++) {
    list[i] = newList[i];
  }
};

console.log(reverseArray(["A", "B", "C"])); // → ["C", "B", "A"];

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue); // → [5, 4, 3, 2, 1]