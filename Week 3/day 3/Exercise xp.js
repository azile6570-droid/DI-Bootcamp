// ===== EXERCISE 1: Select a kind of Music =====
const genresSelect = document.getElementById("genres");
const displaySpan = document.getElementById("display");

function displaySelectedMusic() {
    displaySpan.textContent = genresSelect.value;
}

displaySelectedMusic();

genresSelect.addEventListener("change", displaySelectedMusic);

const newOption = document.createElement("option");
newOption.value = "classic";
newOption.textContent = "Classic";
genresSelect.appendChild(newOption);
genresSelect.value = "classic";

displaySelectedMusic();


// ===== EXERCISE 2: Delete colors =====
const colorSelect = document.getElementById("colorSelect");
const removeButton = document.querySelector("input[type='button']");

function removeColor() {
    const selectedIndex = colorSelect.selectedIndex;
    if (selectedIndex >= 0) {
        colorSelect.remove(selectedIndex);
    }
}

removeButton.addEventListener("click", removeColor);


// ===== EXERCISE 3: Create a shopping list =====
let shoppingList = [];

const root = document.getElementById("root");

const heading = document.createElement("h2");
heading.textContent = "Shopping List";
root.appendChild(heading);

const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter item to buy";

const addButton = document.createElement("button");
addButton.type = "button";
addButton.textContent = "AddItem";

form.appendChild(input);
form.appendChild(addButton);
root.appendChild(form);

const ul = document.createElement("ul");
root.appendChild(ul);

const clearButton = document.createElement("button");
clearButton.id = "clearBtn";
clearButton.type = "button";
clearButton.textContent = "ClearAll";
root.appendChild(clearButton);

function addItem() {
    const itemText = input.value.trim();
    
    if (itemText === "") {
        alert("Please enter an item");
        return;
    }
    
    shoppingList.push(itemText);
    
    const li = document.createElement("li");
    li.textContent = itemText;
    ul.appendChild(li);
    
    input.value = "";
    input.focus();
}

function clearAll() {
    shoppingList = [];
    ul.innerHTML = "";
    input.value = "";
}

addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearAll);

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
});
