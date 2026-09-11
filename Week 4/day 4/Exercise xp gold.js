<<<<<<< HEAD
// Exercise 1 
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // Output after 3 seconds: [3, 42, "foo"]
  })
  .catch((error) => {
    console.error("One of the promises rejected:", error);
  });

/*
  EXPLANATION FOR EXERCISE 1:
  1. How Promise.all() works:
     - Promise.all() takes an iterable (an array) of promises as input and returns a single Promise.
     - It runs all input promises concurrently and waits for EVERY promise to resolve.
     - Non-promise primitive values (like 42 in `promise2`) are automatically wrapped in a resolved Promise (`Promise.resolve(42)`).

  2. Why we receive this output ([3, 42, "foo"]):
     - `promise1` resolves immediately with `3`.
     - `promise2` is a primitive value (42), treated as immediately resolved.
     - `promise3` takes 3 seconds (3000ms) to resolve with `'foo'`.
     - `Promise.all` waits for the slowest promise (`promise3`) to complete before resolving.
     - The output array preserves the exact order of the items passed into `Promise.all()`, regardless of execution speed.
*/


// Exercise 2 
function timesTwoAsync(x) {
  return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
  .then(result => {
    console.log(result); // Output: [2, 4, 6]
  });

/*
  EXPLANATION FOR EXERCISE 2:
  - `arr.map(timesTwoAsync)` creates an array of promises: [Promise(2), Promise(4), Promise(6)].
  - `Promise.all(promiseArr)` executes them concurrently and resolves with the array of outputs: [2, 4, 6].
*/
=======
// Exercise 1 
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // Output after 3 seconds: [3, 42, "foo"]
  })
  .catch((error) => {
    console.error("One of the promises rejected:", error);
  });

/*
  EXPLANATION FOR EXERCISE 1:
  1. How Promise.all() works:
     - Promise.all() takes an iterable (an array) of promises as input and returns a single Promise.
     - It runs all input promises concurrently and waits for EVERY promise to resolve.
     - Non-promise primitive values (like 42 in `promise2`) are automatically wrapped in a resolved Promise (`Promise.resolve(42)`).

  2. Why we receive this output ([3, 42, "foo"]):
     - `promise1` resolves immediately with `3`.
     - `promise2` is a primitive value (42), treated as immediately resolved.
     - `promise3` takes 3 seconds (3000ms) to resolve with `'foo'`.
     - `Promise.all` waits for the slowest promise (`promise3`) to complete before resolving.
     - The output array preserves the exact order of the items passed into `Promise.all()`, regardless of execution speed.
*/


// Exercise 2 
function timesTwoAsync(x) {
  return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
  .then(result => {
    console.log(result); // Output: [2, 4, 6]
  });

/*
  EXPLANATION FOR EXERCISE 2:
  - `arr.map(timesTwoAsync)` creates an array of promises: [Promise(2), Promise(4), Promise(6)].
  - `Promise.all(promiseArr)` executes them concurrently and resolves with the array of outputs: [2, 4, 6].
*/
>>>>>>> fc995034e357a1aaacbc3b8e44a3bff29f29f053
