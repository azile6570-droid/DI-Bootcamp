// Daily Challenge: Words in the Star

function generateFrame() {
  // Get input from the text field
  const userInput = document.getElementById('wordInput').value;
  
  // Check if user provided input
  if (!userInput.trim()) {
    alert("Please enter some words!");
    return;
  }
  
  // Split the input by commas and trim whitespace
  const words = userInput.split(',').map(word => word.trim()).filter(word => word.length > 0);
  
  // Check if we have any words
  if (words.length === 0) {
    alert("Please enter at least one word!");
    return;
  }
  
  // Find the longest word length
  const longestWordLength = Math.max(...words.map(word => word.length));
  
  // Calculate the width of the frame (longest word + 2 spaces + 2 asterisks)
  const frameWidth = longestWordLength + 2;
  
  // Build the output string
  let output = '';
  
  // Create top border with stars
  const topBorder = '*'.repeat(frameWidth + 2);
  output += topBorder + '\n';
  
  // Add each word in the frame
  words.forEach(word => {
    const padding = longestWordLength - word.length;
    const line = '* ' + word + ' '.repeat(padding) + ' *';
    output += line + '\n';
  });
  
  // Create bottom border with stars
  const bottomBorder = '*'.repeat(frameWidth + 2);
  output += bottomBorder;
  
  // Display the output
  document.getElementById('output').textContent = output;
  
  // Also log to console
  console.log(output);
}

// Allow Enter key to generate frame
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('wordInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      generateFrame();
    }
  });
});

