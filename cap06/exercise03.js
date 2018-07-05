/*
  Iterable groups

  Make the Group class from the previous exercise iterable. Refer to the section about
  the iterator interface earlier in the chapter if you aren’t clear on the exact
  form of the interface anymore.

  If you used an array to represent the group’s members, don’t just return the
  iterator created by calling the Symbol.iterator method on the array. That would work,
  but it defeats the purpose of this exercise.

  It is okay if your iterator behaves strangely when the group is modified during iteration.

============================================================================================= */
class Group {
  constructor(elements = []) {
    this.elements = elements;
  }

  static from(elements) {
    return new Group(elements);
  }
}
 
Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
};

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.elements = group.elements;
  }

  next() {
    if (this.index > this.elements.length - 1)
      return { done: true };

    let value = this.elements[this.index++];
    return { value, done: false };
  }
}


for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}

// → a
// → b
// → c