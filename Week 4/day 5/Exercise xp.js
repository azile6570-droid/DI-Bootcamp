//  Exercise 1  

const fetchGiphyData = async () => {
  const url = "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Exercise 1 Result:", data);
  } catch (error) {
    console.error("Exercise 1 Error:", error.message);
  }
};

fetchGiphyData();


// Exercise 2 

const fetchSunGifs = async () => {
  const url = "https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Exercise 2 Result:", data);
  } catch (error) {
    console.error("Exercise 2 Error:", error.message);
  }
};

fetchSunGifs();


// Exercise 3 

const getStarship = async () => {
  const url = "https://www.swapi.tech/api/starships/9/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const objectStarWars = await response.json();
    console.log("Exercise 3 Result:", objectStarWars.result);
  } catch (error) {
    console.error("Exercise 3 Error:", error.message);
  }
};

getStarship();


// Exercise 4 

/*
Analysis of Exercise 4 Execution:

1. `asyncCall()` is called.
2. `console.log('calling')` executes immediately and logs: "calling".
3. `await resolveAfter2Seconds()` is reached. Execution of `asyncCall` is paused 
   while waiting for the Promise returned by `resolveAfter2Seconds` to resolve.
4. Inside `resolveAfter2Seconds`, a 2-second timer starts via `setTimeout`.
5. After 2 seconds, the Promise resolves with the value `'resolved'`.
6. `let result` receives `'resolved'`.
7. `console.log(result)` executes and logs: "resolved".

Output Order & Timing:
- Logged immediately: "calling"
- Logged 2 seconds later: "resolved"
*/