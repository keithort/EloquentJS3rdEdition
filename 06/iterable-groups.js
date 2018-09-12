class Group {
  constructor(group) {
    this.group = [];
  }

  has(value) {
    return this.group.includes(value);
  }

  add(value) {
    if (!this.has(value)) {
      this.group.push(value);
    }
  }

  delete(value) {
    if (this.has(value)) {
      this.group.splice(this.group.indexOf(value), 1);
    }
  }

  static from(array) {
    let temp = new Group();
    for (let n of array) {
      temp.add(n);
    }
    return temp;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.index = 0;
  }

  next() {
    if (this.index === this.group.group.length) {
      return { done: true };
    }
    let value = { value: this.group.group[this.index] };
    this.index++;
    return { value, done: false };
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
