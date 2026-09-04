 //EXERCISE 1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`) }  
let (a) = 0
function funcTwo() {
    a = 5;
}
function funcThree() {
    alert(`inside the funcThree function ${a}`);
}
function funcFour() {
    window.a = "hello";
}
function funcFive() {
    alert(`inside the funcFive function ${a}`);
}
let (a) = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);



 // EXERCISE 2

const winBattle = () => true;
const experiencePoints = winBattle() ? 10 : 1;

console.log("Ex 2 - Experience Points:", experiencePoints); // Output: 10


// EXERCISE 3

const isString = (value) => typeof value === 'string';

console.log("Ex 3 - 'hello':", isString('hello'));         // Output: true
console.log("Ex 3 - [1, 2, 4, 0]:", isString([1, 2, 4, 0])); // Output: false

// EXERCISE 4

const sum = (a, b) => a + b;

console.log("Ex 4 - Sum (5 + 10):", sum(5, 10)); // Output: 15


// EXERCISE 5
function kgToGramsDeclaration(kg) {
    return kg * 1000;
}
const kgToGramsExpression = function(kg) {
    return kg * 1000;
};
const kgToGramsArrow = kg => kg * 1000;

console.log("Ex 5 - Arrow (2kg):", kgToGramsArrow(2));


// EXERCISE 6

((numChildren, partnerName, location, jobTitle) => {
    const sentence = `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numChildren} kids.`;
    const p = document.createElement("p");
    p.textContent = `Ex 6: ${sentence}`;
    document.body.appendChild(p);
})(2, "Sarah", "Tokyo", "Software Engineer");


// EXERCISE 7

((userName) => {
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

//EXERCISE 8

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