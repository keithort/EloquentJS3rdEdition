function reverseArray(arr) {
  let newArr = [];
  arr.forEach(val => newArr.unshift(val));
  return newArr;
}

function reverseArrayInPlace(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr.splice(i, 0, arr[arr.length - 1]);
    arr.splice(arr.length - 1, 1);
  }
  return arr;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
