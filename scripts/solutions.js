// Add these functions to your JavaScript file (e.g., scripts.js or game.js)
// This replaces your original createSecondGrid, updateSecondGridContent, and revealSecondGrid functions

// Function to initialize the second grid
function initializeSecondGrid() {
    console.log('Initializing second grid');
    
    // Get the dimensions and styling from the original grid
    const originalGrid = document.querySelector('.grid-container .grid');
    const originalGridStyle = window.getComputedStyle(originalGrid);
    
    // Get the second grid
    const secondGrid = document.querySelector('#second-grid-container .grid');
    
    // Apply the same dimensions as the original grid
    if (originalGridStyle.width) secondGrid.style.width = originalGridStyle.width;
    if (originalGridStyle.maxWidth) secondGrid.style.maxWidth = originalGridStyle.maxWidth;
    
    console.log('Second grid initialized');
}

// Function to update the second grid content with solutions
function updateSecondGridContent() {
    console.log('Updating second grid content');
    
    // Array of possible solutions for each grid item
    const solutions = puzzleData.solutions;

    // Get all grid items in the second grid
    const gridItems = document.querySelectorAll('#second-grid-container .grid-item');
    
    if (gridItems.length > 0) {
        // Loop through grid items and assign a random solution for each
        gridItems.forEach((item, index) => {
            // Get the possible solutions for the current grid item
            const possibleSolutions = solutions[index];
            
            // Select a random solution from the possible solutions
            const randomIndex = Math.floor(Math.random() * possibleSolutions.length);
            
            // Format the solution string and set as background image
            const randomSolution = possibleSolutions[randomIndex].toLowerCase().replace(/\s+/g, '');
            item.style.backgroundImage = `url('images/Champions/${randomSolution}Square.png')`;
        });
        
        console.log('Second grid content updated successfully');
    } else {
        console.error('No grid items found in the second grid');
    }
}

// Function to reveal the second grid with animation
function revealSecondGrid() {
    console.log('Revealing second grid');
    
    // Get the second grid elements
    const secondGridTitle = document.getElementById('second-grid-title');
    const secondGridContainer = document.getElementById('second-grid-container');
    const  solutionsContainer = document.getElementById('solutions-container');
    
    if (secondGridTitle && secondGridContainer) {
        // Make sure the content is updated before showing
        updateSecondGridContent();
        
        // Show the elements (but still with opacity 0)
        secondGridTitle.style.display = 'block';
        secondGridContainer.style.display = 'block';

        secondGridTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add a small delay to ensure display change is applied
        setTimeout(() => {
            // Add the visible class to trigger the CSS transition
            secondGridTitle.classList.add('visible');
            secondGridContainer.classList.add('visible');
            solutionsContainer.classList.add('visible');
            console.log('Second grid revealed');
        }, 10);
    } else {
        console.error('Could not find second grid elements');
    }
}

// Replace createSecondGrid function with initialization
function createSecondGrid() {
    // This function now just initializes the pre-existing grid
    initializeSecondGrid();
}

// Run initialization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the second grid
    initializeSecondGrid();
    
    // Add any other initialization code here
    
    // If you have a button that reveals the second grid, you can hook it up here
    // Example: document.getElementById('reveal-solutions').addEventListener('click', revealSecondGrid);
});