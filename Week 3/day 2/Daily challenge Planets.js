// Daily Challenge: Create a Solar System

// Array of planets with their properties (object-based for bonus moon feature)
const planets = [
  { name: "Mercury", className: "mercury", moons: 0 },
  { name: "Venus", className: "venus", moons: 0 },
  { name: "Earth", className: "earth", moons: 1 },
  { name: "Mars", className: "mars", moons: 2 },
  { name: "Jupiter", className: "jupiter", moons: 4 }, // Simplified for display
  { name: "Saturn", className: "saturn", moons: 6 }, // Simplified for display
  { name: "Uranus", className: "uranus", moons: 5 }, // Simplified for display
  { name: "Neptune", className: "neptune", moons: 3 } // Simplified for display
];

// Get the section element
const section = document.querySelector(".listPlanets");

// Function to create planets with moons
function createPlanets() {
  planets.forEach((planet) => {
    // Create planet div
    const planetDiv = document.createElement("div");
    planetDiv.className = `planet ${planet.className}`;
    planetDiv.textContent = planet.name;
    
    // Add moons to the planet
    if (planet.moons > 0) {
      createMoons(planetDiv, planet.moons);
    }
    
    // Append planet to section
    section.appendChild(planetDiv);
  });
}

// Function to create moons around a planet
function createMoons(planetDiv, numberOfMoons) {
  const radius = 80; // Distance from planet center
  const anglePerMoon = 360 / numberOfMoons; // Distribute moons evenly
  
  for (let i = 0; i < numberOfMoons; i++) {
    const moon = document.createElement("div");
    moon.className = "moon";
    
    // Calculate position in a circle around the planet
    const angle = (anglePerMoon * i) * (Math.PI / 180);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    // Position the moon
    moon.style.left = `calc(50% + ${x}px)`;
    moon.style.top = `calc(50% + ${y}px)`;
    moon.style.transform = "translate(-50%, -50%)";
    
    // Append moon to planet
    planetDiv.appendChild(moon);
  }
}

// Create the solar system
createPlanets();
