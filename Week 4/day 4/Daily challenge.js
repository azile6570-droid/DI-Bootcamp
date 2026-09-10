// 1st Daily Challenge: Play with Words

function makeAllCaps(wordsArray) {
  return new Promise((resolve, reject) => {
    const isAllStrings = wordsArray.every((word) => typeof word === "string");

    if (isAllStrings) {
      const upperArray = wordsArray.map((word) => word.toUpperCase());
      resolve(upperArray);
    } else {
      reject("Error: Not all elements in the array are strings!");
    }
  });
}

function sortWords(upperWordsArray) {
  return new Promise((resolve, reject) => {
    if (upperWordsArray.length > 4) {
      resolve(upperWordsArray.sort());
    } else {
      reject("Error: Array length is not greater than 4!");
    }
  });
}


makeAllCaps([1, "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

makeAllCaps(["apple", "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// 2nd Daily Challenge

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs() {
  return new Promise((resolve, reject) => {
    const morseJS = JSON.parse(morse);
    if (Object.keys(morseJS).length === 0) {
      reject("Error: Morse object is empty!");
    } else {
      resolve(morseJS);
    }
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Enter a word or a sentence:")?.toLowerCase() || "";
    const morseTranslation = [];

    for (let char of userInput) {
      if (char === " ") continue; 

      if (char in morseJS) {
        morseTranslation.push(morseJS[char]);
      } else {
        reject(`Error: Character "${char}" does not exist in the Morse object!`);
        return;
      }
    }

    resolve(morseTranslation);
  });
}

function joinWords(morseTranslation) {
  const output = morseTranslation.join("<br>");
  document.body.innerHTML = `<p style="font-family: monospace; font-size: 1.2rem;">${output}</p>`;
}

toJs()
  .then((morseJS) => toMorse(morseJS))
  .then((morseTranslation) => joinWords(morseTranslation))
  .catch((error) => console.log(error));
