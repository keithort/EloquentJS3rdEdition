function every(array, test) {
  for (let val of array) {
    if (!test(val)) {
      return false;
    }
  }
  return true;
}
