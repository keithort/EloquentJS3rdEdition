function isEven(x) {
  if (x === 0) {
    return true;
  } else if (x === 1) {
    return false;
  } else {
    return x > 0 ? isEven(x - 2) : isEven(x + 2);
  }
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??
