function loop(val, testFn, updateFn, bodyFn) {
  let valid = true;
  while (valid) {
    if (!testFn(val)) {
      valid = !valid;
      return false;
    }
    bodyFn(val);
    val = updateFn(val);
  }
  return true;
}
