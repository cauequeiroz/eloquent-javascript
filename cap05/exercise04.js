/*
  Dominant writing direction
  
  Write a function that computes the dominant writing direction in a string of text.
  Remember that each script object has a direction property that can be "ltr"
  (left to right), "rtl" (right to left), or "ttb" (top to bottom).

========================================================================================== */

const SCRIPTS = require('./scripts.js');

const characterScript = code => {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }

  return null;
};

const countBy = (items, condition) => {
  let counts = [];

  for (let item of items) {
    let name = condition(item);
    let known = counts.findIndex(c => c.name == name);

    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }

  return counts;
};

const dominantDirection = text => {
  let scriptsAtText = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  })
  .filter(({ name }) => name != "none")
  .sort((a, b) => a.count < b.count);

  return scriptsAtText[0].name;
};

console.log(dominantDirection("Hello!")); // → ltr
console.log(dominantDirection("Hey, مساء الخير")); // → rtl