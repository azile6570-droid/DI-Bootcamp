// Exercise 1
const landscape = () => {
    let result = "";

    const flat = (x) => {
        for (let count = 0; count < x; count++) {
            result += "_";
        }
    };

    const mountain = (x) => {
        result += "/";
        for (let counter = 0; counter < x; counter++) {
            result += "'";
        }
        result += "\\";
    };

    flat(4);
    mountain(4);
    flat(4);

    return result;
};

console.log("Ex 1 - Landscape:", landscape()); 

// Exercise 2
const addTo = x => y => x + y;
const addToTen = addTo(10);

console.log("Ex 2 - Closure:", addToTen(3)); // Output: 13

// Exercise 3
const curriedSum1 = (a) => (b) => a + b;

console.log("Ex 3 - Currying:", curriedSum1(30)(1));

// Exercise 4
const curriedSum2 = (a) => (b) => a + b;
const add5Curried = curriedSum2(5);

console.log("Ex 4 - Currying with Partial Application:", add5Curried(12)); // Output: 17

// Exercise 5
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5 = (num) => num + 5;

console.log("Ex 5 - Composition:", compose(add1, add5)(10)); // Output: 16