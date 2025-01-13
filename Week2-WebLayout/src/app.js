
// Sorting elements
var array = [5, 3, 2, 1, 4].sort(sort)

function sort(a, b) {
    return a - b; // sort in ascending array
    
    // if (a > b) {
    //     return 1;
    // } else if (a < b) {
    //     return -1;
    // } else {
    //     return 0;
    // }
}

console.log(array);

// practice objects
var object = {
  name: "Bob",
  age: 50,
};

class Person {
  name;
  age;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getLegal() {
    return this.age > 18;
  }
}

console.log(new Person("Bob", 50)); // displays: Person {name: 'Bob', age: 50}
