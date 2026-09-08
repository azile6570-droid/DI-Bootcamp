// Exercise 1 
console.log("--- EXERCISE 1 ---");
const menu = [
  {
    type: "starter",
    name: "Houmous with Pita"
  },
  {
    type: "starter",
    name: "Vegetable Soup with Houmous peas"
  },
  {
    type: "dessert",
    name: "Chocolate Cake"
  }
]
const hasDessert = menu.some(item => item.type === "dessert");
console.log(hasDessert ? "At least one dessert is on the menu." : "No dessert found on the menu.");
const allStarters = menu.every(item => item.type === "starter");
console.log("Are all items starters?", allStarters); 
const hasMain = menu.some(item => item.type === "main");
if (!hasMain) {
  menu.push({ type: "main", name: "Grilled Salmon" });
}
console.log("Updated Menu:", menu);
const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];

menu.forEach(course => {
  const courseNameLower = course.name.toLowerCase();
  course.vegetarian = vegetarian.some(ingredient => courseNameLower.includes(ingredient));
});
console.log("Menu with vegetarian property:", menu);

// Exercise 2 
function string_chop(str, length) {
  if (!str) return [];
  const chunks = [];
  for (let i = 0; i < str.length; i += length) {
    chunks.push(str.slice(i, i + length));
  }
  return chunks;
}

console.log(string_chop('developers', 2)); 

// Exercise 3 
function search_word(str, word) {
  if (!str || !word) return `'${word}' was found 0 times.`;
  const words = str.split(/\W+/);
  const count = words.filter(w => w.toLowerCase() === word.toLowerCase()).length;
  return `'${word}' was found ${count} times.`;
}

console.log(search_word('The quick brown fox', 'fox')); 

// Exercise 4 
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }

  return arr;
}

console.log(reverseArray([1, 2, 3, 4, 5])); 
console.log(reverseArray([1, 2]));          
console.log(reverseArray([]));              
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));