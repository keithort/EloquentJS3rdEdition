function grid(size) {
  let board = "";
  let square = " ";
  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      board += square;
      square = square === " " ? "#" : " ";
    }
    square = square === " " ? "#" : " ";
    board += "\n";
  }
  console.log(board);
}

grid(15);
