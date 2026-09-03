 //EXERCISE 1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`) }  
let a = 0;
function funcTwo() {
    a = 5;
}
function funcThree() {
    alert(`inside the funcThree function ${a}`);
}
// #2.1 Order: funcThree() -> Alert "0" | funcTwo() -> sets global 'a' to 5 | funcThree() -> Alert "5"
// #2.2 If const: Uncaught TypeError inside funcTwo() when attempting to reassign 'a'.

//#3
function funcFour() {
    window.a = "hello";
}
function funcFive() {
    alert(`inside the funcFive function ${a}`);
}
// #3.1 funcFour() sets window.a | funcFive() -> Alert "hello"

//#4
let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}
// #4.1 Alert "test" (local scope shadows global scope).
// #4.2 If const: Same output ("test"), as const is valid within local scope.

//#5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);
// #5.1 First alert: "5" | Second alert: "2"
// #5.2 If const: Same behavior ("5" then "2"), const is block-scoped.


/* ==========================================================================
   🌟 EXERCISE 2: Ternary Operator
   ========================================================================== */

const winBattle = () => true;
const experiencePoints = winBattle() ? 10 : 1;

console.log("Ex 2 - Experience Points:", experiencePoints); // Output: 10


/* ==========================================================================
   🌟 EXERCISE 3: Is it a string?
   ========================================================================== */

const isString = (value) => typeof value === 'string';

console.log("Ex 3 - 'hello':", isString('hello'));         // Output: true
console.log("Ex 3 - [1, 2, 4, 0]:", isString([1, 2, 4, 0])); // Output: false


/* ==========================================================================
   🌟 EXERCISE 4: Find the sum
   ========================================================================== */

const sum = (a, b) => a + b;

console.log("Ex 4 - Sum (5 + 10):", sum(5, 10)); // Output: 15


/* ==========================================================================
   🌟 EXERCISE 5: Kg and grams
   ========================================================================== */

// 1. Function Declaration
function kgToGramsDeclaration(kg) {
    return kg * 1000;
}

// 2. Function Expression
const kgToGramsExpression = function(kg) {
    return kg * 1000;
};
// Function declarations are hoisted (callable before definition), while expressions are not.

// 3. One-line Arrow Function
const kgToGramsArrow = kg => kg * 1000;

console.log("Ex 5 - Arrow (2kg):", kgToGramsArrow(2)); // Output: 2000


/* ==========================================================================
   🌟 EXERCISE 6: Fortune Teller
   ========================================================================== */

((numChildren, partnerName, location, jobTitle) => {
    const sentence = `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numChildren} kids.`;
    const p = document.createElement("p");
    p.textContent = `Ex 6: ${sentence}`;
    document.body.appendChild(p);
})(2, "Sarah", "Tokyo", "Software Engineer");


/* ==========================================================================
   🌟 EXERCISE 7: Welcome
   ========================================================================== */

((userName) => {
    // Ensures a navbar exists in DOM
    let navbar = document.getElementById("navbar");
    if (!navbar) {
        navbar = document.createElement("nav");
        navbar.id = "navbar";
        document.body.prepend(navbar);
    }

    const userDiv = document.createElement("div");
    userDiv.textContent = `Welcome, ${userName}! `;
    
    const profileImg = document.createElement("img");
    profileImg.src = "https://via.placeholder.com/30";
    profileImg.alt = `${userName}'s avatar`;

    userDiv.appendChild(profileImg);
    navbar.appendChild(userDiv);
})("John");


/* ==========================================================================
   🌟 EXERCISE 8: Juice Bar
   ========================================================================== */

function makeJuice(size) {
    const ingredients = [];

    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }

    function displayJuice() {
        const sentence = `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;
        const p = document.createElement("p");
        p.textContent = `Ex 8: ${sentence}`;
        document.body.appendChild(p);
    }

    addIngredients("apple", "banana", "ginger");
    addIngredients("spinach", "lemon", "kale");
    displayJuice();
}

makeJuice("large");