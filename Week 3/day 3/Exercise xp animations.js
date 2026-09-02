// Exercise 1
setTimeout(function() {
    alert("Hello World");
}, 2000);

setTimeout(function() {
    const container = document.getElementById("container");
    const paragraph = document.createElement("p");
    paragraph.textContent = "Hello World";
    container.appendChild(paragraph);
}, 2000);

const container = document.getElementById("container");
const clearButton = document.getElementById("clear");

let intervalId = setInterval(function() {
    const paragraphs = container.querySelectorAll("p");
    
    if (paragraphs.length >= 5) {
        clearInterval(intervalId);
        return;
    }
    
    const paragraph = document.createElement("p");
    paragraph.textContent = "Hello World";
    container.appendChild(paragraph);
}, 2000);

clearButton.addEventListener("click", function() {
    clearInterval(intervalId);
});

// Exercise 2
let intervalId2;

function myMove() {
    const animate = document.getElementById("animate");
    let position = 0;
    
    if (intervalId2) {
        clearInterval(intervalId2);
    }
    
    intervalId2 = setInterval(function() {
        if (position >= 350) {
            clearInterval(intervalId2);
            return;
        }
        
        position++;
        animate.style.left = position + "px";
    }, 1);
}
