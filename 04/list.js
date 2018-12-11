function arrayToList(arr) {
  let list = {};
  for (let i = 0; i < arr.length; i++) {
    list.value = arr.splice(0, 1)[0];
    list.rest = arr.length ? arrayToList(arr) : null;
  }
  return list;
}

function listToArray(list) {}
