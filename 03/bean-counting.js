function countBs(str) {
  let count = 0;
  for (letter of str) {
    if (letter === "B") {
      count++;
    }
  }
  return count;
}

function countChar(str, char) {
  let count = 0;
  for (letter of str) {
    if (letter === char) {
      count++;
    }
  }
  return count;
}

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4
