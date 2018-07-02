/*
  Chessboard
  Write a program that creates a string that represents an 8×8 grid, using newline characters
  to separate lines. At each position of the grid there is either a space or a "#" character.
  The characters should form a chessboard.

  Passing this string to console.log should show something like this:

   # # # #
  # # # # 
   # # # #
  # # # # 
   # # # #
  # # # # 
   # # # #
  # # # #
  
  When you have a program that generates this pattern, define a binding size = 8 and change
  the program so that it works for any size, outputting a grid of the given width and height.
===================================================================================================== */

let chessboard = "\n";
let size = 8;

for (let line = 0; line < size; line++) {
  for (let column = 0; column < size; column++ ) {
    
    chessboard += line % 2 == 0
      ? column % 2 == 0 ? " " : "#"
      : column % 2 == 0 ? "#" : " ";

  }

  chessboard += "\n";
}