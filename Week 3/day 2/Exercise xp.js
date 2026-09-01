// Exercise 1

function displayNumbersDivisible(divisor = 23) {
  let sum = 0;
  let numbers = [];
  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      numbers.push(i);
      sum += i;
    }
  }
  console.log(numbers.join(" "));
  console.log("Sum : " + sum);
}
displayNumbersDivisible();
console.log("\n--- Test with divisor 3 ---");
displayNumbersDivisible(3);

console.log("\n--- Test with divisor 45 ---");
displayNumbersDivisible(45);

// Exercise 2

const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
} 

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
  let totalPrice = 0;
  for (let item of shoppingList) {
    if (item in stock) {
      if (stock[item] > 0) {
        totalPrice += prices[item];
        stock[item]--;
      }
    }
  }

  return totalPrice;
}
console.log("Total bill: $" + myBill());
console.log("Stock after purchase:", stock);

//Exercise 3

function changeEnough(itemPrice, amountOfChange) {
  const coinValues = [0.25, 0.10, 0.05, 0.01];
  let totalChange = 0;
  for (let i = 0; i < amountOfChange.length; i++) {
    totalChange += amountOfChange[i] * coinValues[i];
  }
  totalChange = Math.round(totalChange * 100) / 100;
  return totalChange >= itemPrice;
}
console.log("changeEnough(4.25, [25, 20, 5, 0]) => " + changeEnough(4.25, [25, 20, 5, 0])); // 
console.log("changeEnough(14.11, [2, 100, 0, 0]) => " + changeEnough(14.11, [2, 100, 0, 0])); // 
console.log("changeEnough(0.75, [0, 0, 20, 5]) => " + changeEnough(0.75, [0, 0, 20, 5]));

// Exercise 4
function hotelCost(nights) {
  return nights * 140;
}
function planeRideCost(destination) {
  switch (destination.toLowerCase()) {
    case "london":
      return 183;
    case "paris":
      return 220;
    default:
      return 300;
  }
}
function rentalCarCost(days) {
  let cost = days * 40;
  if (days > 10) {
    cost = cost * 0.95;
  }
  return cost;
}
function totalVacationCost() {
  let nights;
  let destination;
  let days;
  while (true) {
    nights = prompt("How many nights would you like to stay at the hotel?");
    if (nights && !isNaN(nights) && nights > 0) {
      nights = parseInt(nights);
      break;
    }
  }
  while (true) {
    destination = prompt("What is your destination?");
    if (destination && typeof destination === "string" && destination.trim() !== "") {
      break;
    }
  }
  while (true) {
    days = prompt("How many days would you like to rent the car?");
    if (days && !isNaN(days) && days > 0) {
      days = parseInt(days);
      break;
    }
  }
  const hotelCostTotal = hotelCost(nights);
  const planeRideCostTotal = planeRideCost(destination);
  const rentalCarCostTotal = rentalCarCost(days);
  const totalCost = hotelCostTotal + planeRideCostTotal + rentalCarCostTotal;
  console.log("=== Vacation Cost Breakdown ===");
  console.log("Hotel cost: $" + hotelCostTotal.toFixed(2));
  console.log("Plane ticket cost: $" + planeRideCostTotal.toFixed(2));
  console.log("Car rental cost: $" + rentalCarCostTotal.toFixed(2));
  console.log("================================");
  console.log("Total vacation cost: $" + totalCost.toFixed(2));

  return totalCost;
}



