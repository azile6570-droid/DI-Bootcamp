// Exercise 1 
const ex1Result = [1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return;
});
console.log("Output:", ex1Result); 


// Exercise 2
const ex2Result = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);
console.log("Output:", ex2Result);


// Exercise 3
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
  console.log(`Value: ${num}, Index (i): ${i}`);
  return num * 2;
});  


// Exercise 4 
const array = [[1], [2], [3], [[[4]]], [[[5]]]];
const ex4_1 = array.flat(2);
console.log("4.1 Output:", ex4_1);
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const ex4_2 = greeting.map(subArr => subArr.join(' '));
console.log("4.2 Output:", ex4_2);
const ex4_3 = greeting.map(subArr => subArr.join(' ')).join(' ');
console.log("4.3 Output:", ex4_3);
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const ex4_4 = trapped.flat(Infinity);
console.log("4.4 Output:", ex4_4);