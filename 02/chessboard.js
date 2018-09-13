let board = "";
let square = " ";
for (let i = 0; i <= 7; i++) {
  for (let j = 0; j <= 7; j++) {
    board += square;
    square = square === " " ? "#" : " ";
  }
  square = square === " " ? "#" : " ";
  board += "\n";
}
console.log(board);
