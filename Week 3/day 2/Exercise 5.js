// Exercise 5
const container = document.getElementById("container");
console.log(container);
const firstUL = document.querySelector(".list");
const liItems = firstUL.querySelectorAll("li");
liItems[1].textContent = "Richard";
const allULs = document.querySelectorAll(".list");
const secondUL = allULs[1];
const secondULItems = secondUL.querySelectorAll("li");
secondULItems[1].remove();
const myName = "Alex";
allULs.forEach((ul) => {
  const firstLi = ul.querySelector("li");
  firstLi.textContent = myName;
});
allULs.forEach((ul) => {
  ul.classList.add("student_list");
});
firstUL.classList.add("university", "attendance");
container.style.backgroundColor = "lightblue";
container.style.padding = "20px";
const allListItems = document.querySelectorAll(".list li");
allListItems.forEach((li) => {
  if (li.textContent === "Dan") {
    li.style.display = "none";
  }
});
allListItems.forEach((li) => {
  if (li.textContent === "Richard") {
    li.style.border = "2px solid red";
  }
});
document.body.style.fontSize = "18px";
const bgColor = window.getComputedStyle(container).backgroundColor;
if (bgColor === "rgb(173, 216, 230)" || container.style.backgroundColor === "lightblue") {
  const users = [];
  allListItems.forEach((li) => {
    if (li.textContent !== "Dan" && li.parentElement.classList.contains("student_list")) {
      users.push(li.textContent);
    }
  });
  const firstListUsers = firstUL.querySelectorAll("li");
  const userNames = [];
  firstListUsers.forEach((li) => {
    if (li.style.display !== "none" && li.textContent !== "") {
      userNames.push(li.textContent);
    }
  });
  
  if (userNames.length > 0) {
    const userString = userNames.join(" and ");
    alert("Hello " + userString);
  }
}

