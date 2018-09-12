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
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
