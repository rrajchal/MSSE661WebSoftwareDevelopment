
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

const form = document.getElementById('age-form');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);

  const person = new Person(name, age);

  if (person.getLegal()) {
    result.textContent = `${person.name} is of legal age.`;
  } else {
    result.textContent = "You need to be 18 to be legal.";
  }
});

console.log(new Person("Bob", 50)); // displays: Person {name: 'Bob', age: 50}
const p1 = new Person("Sam", 20);
const p2 = new Person("Jim", 15);
console.log(p1.getLegal());   // displays true
console.log(p2.getLegal());   // displays false