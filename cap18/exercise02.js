/*
  A JavaScript workbench

  Build an interface that allows people to type and run pieces of
  JavaScript code.

  Put a button next to a <textarea> field that, when pressed, uses the
  Function constructor we saw in Chapter 10 to wrap the text in a function
  and call it. Convert the return value of the function, or any error it
  raises, to a string and display it below the text field.

============================================================================= */

let code = document.querySelector('#code');
let output = document.querySelector('#output');
let button = document.querySelector('#button');

const runCode = (code, outputElement) => {
  let result = new Function(code)();
  outputElement.textContent = result;
};

button.addEventListener('click', () => runCode(code.value, output));

