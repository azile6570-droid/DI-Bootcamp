const form = document.getElementById("libform");
const story = document.getElementById("story");
const shuffleButton = document.getElementById("shuffle");

let userWords = {};

const stories = [
    (words) => `Yesterday, ${words.person} went to ${words.place} to ${words.verb} a ${words.adjective} ${words.noun}.`,
    
    (words) => `Once upon a time, ${words.person} found a ${words.adjective} ${words.noun} in ${words.place} and decided to ${words.verb} it.`,
    
    (words) => `${words.person} was walking through ${words.place} when they saw a ${words.adjective} ${words.noun}. They decided to ${words.verb} it.`,
    
    (words) => `At ${words.place}, ${words.person} discovered a ${words.adjective} ${words.noun} that could ${words.verb} faster than anything else.`,
    
    (words) => `Nobody expected ${words.person} to ${words.verb} a ${words.adjective} ${words.noun} at ${words.place}, but that's exactly what happened!`
];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const noun = document.getElementById("noun").value.trim();
    const adjective = document.getElementById("adjective").value.trim();
    const person = document.getElementById("person").value.trim();
    const verb = document.getElementById("verb").value.trim();
    const place = document.getElementById("place").value.trim();

    // Make sure no input is empty
    if (!noun || !adjective || !person || !verb || !place) {
        alert("Please fill in all the fields!");
        return;
    }

    // Store the values
    userWords = {
        noun: noun,
        adjective: adjective,
        person: person,
        verb: verb,
        place: place
    };

    generateStory();
});

function generateStory() {
    const randomIndex = Math.floor(Math.random() * stories.length);

    story.textContent = stories[randomIndex](userWords);
}

shuffleButton.addEventListener("click", function() {
    // Don't shuffle if the user hasn't generated a story yet
    if (Object.keys(userWords).length === 0) {
        alert("Please create a story first!");
        return;
    }

    generateStory();
});
