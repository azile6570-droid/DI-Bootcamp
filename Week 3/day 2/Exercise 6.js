// Exercise 6: Change the navbar

// Get the navbar div
const navBar = document.getElementById("navBar");

// 1. Change the id attribute from "navBar" to "socialNetworkNavigation"
navBar.setAttribute("id", "socialNetworkNavigation");
console.log("Changed id to:", navBar.getAttribute("id"));

// Get the ul element
const ul = navBar.querySelector("ul");

// 2. Create a new <li> element
const newLi = document.createElement("li");

// 3. Create a text node with "Logout"
const logoutText = document.createTextNode("Logout");

// 4. Append the text node to the new <li>
newLi.appendChild(logoutText);

// 5. Append the new <li> to the <ul>
ul.appendChild(newLi);

console.log("Added 'Logout' to the navbar");

// 6. Retrieve the first and last <li> elements and display their text
const firstLi = ul.firstElementChild;
const lastLi = ul.lastElementChild;

console.log("First link text:", firstLi.textContent);
console.log("Last link text:", lastLi.textContent);

// Display in the page as well
const displayDiv = document.createElement("div");
displayDiv.style.marginTop = "20px";
displayDiv.style.padding = "10px";
displayDiv.style.border = "1px solid blue";
displayDiv.innerHTML = `
  <p><strong>First item in navbar:</strong> ${firstLi.textContent}</p>
  <p><strong>Last item in navbar:</strong> ${lastLi.textContent}</p>
`;
document.body.appendChild(displayDiv);
