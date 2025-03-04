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

    // Select all grid items in the second grid
    const gridItems = document.querySelectorAll('#second-grid-container .grid-item');
  
    gridItems.forEach((item) => {
        // Retrieve the solution index from the data attribute
        const solutionIndex = item.getAttribute('data-solution-index');
        
        // Create the click handler function
        const clickHandler = function() {
            openSolutionsModal(solutionIndex); // Pass the solution index to the modal
            console.log(`2nd Grid item with index ${solutionIndex} clicked`);
        };
        
        // Add the click event listener
        item.addEventListener('click', clickHandler);
    });
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


// Function to open the solutions modal
function openSolutionsModal(index) {
    const modal = document.getElementById('solutions-modal');
    
    // Show the modal
    modal.style.display = 'flex';
    
    // Populate modal with solutions
    updateSolutionsModal(index);

    // Function to close the modal (modifying to handle animation and hiding)
    function closeModal() {
        const modal = document.getElementById('solutions-modal');
    
        // If you have any specific actions in your existing closeModal(), include them here
        // Example: Reset modal content, remove any dynamic classes, etc.
        modal.classList.add('closing'); // Example animation class

    setTimeout(() => {
        modal.style.display = 'none';  // Hide modal
        modal.classList.remove('closing'); // Reset animation class
    }, 150); // Adjust duration if needed for your closing animation
}

    // Close the modal if clicked outside the modal content (background click)
    modal.addEventListener('click', function(event) {
        // Check if the click target is the modal itself (background area)
        if (event.target === modal) {
            closeModal();
        }
    });
}

function updateSolutionsModal(index) {
    const solutionsList = document.getElementById('solutions-dropdown');
    const solutions = puzzleData.solutions[index];  // Assuming puzzleData contains a solutions array
    
    // Clear previous solutions (in case the modal was opened previously)
    solutionsList.innerHTML = '';

    // Ensure that solutions exist for the given index
    if (solutions && solutions.length > 0) {
        solutions.forEach(solution => {
            const li = document.createElement('li');
            
            // Create an image element for the champion
            const img = document.createElement('img');
            const championName = solution.toLowerCase().replace(/\s+/g, '');
            img.src = `images/Champions/${championName}Square.png`;
            img.alt = solution;
            img.style.width = '30px';  // Adjust size as needed
            img.style.height = '30px';
            img.style.marginRight = '10px';  // Add some spacing
            img.style.verticalAlign = 'middle';

            // Create an anchor element for the wiki link
            const link = document.createElement('a');
            link.href = `https://wiki.leagueoflegends.com/en-us/${solution.replace(/\s+/g, '')}`;
            link.target = '_blank';  // Open in new tab
            link.rel = 'noopener noreferrer';  // Security best practice for external links

            // Create a span for the text
            const textSpan = document.createElement('span');
            textSpan.textContent = solution;

            // Append image and text to the link
            link.appendChild(img);
            link.appendChild(textSpan);

            // Style the list item to use flexbox for alignment
            li.appendChild(link);
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.gap = '10px';  // Space between image and text
            
            // Add hover and cursor styles to indicate it's clickable
            link.style.display = 'flex';
            link.style.alignItems = 'center';
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';
            link.style.cursor = 'pointer';
            link.addEventListener('mouseover', () => {
                link.style.textDecoration = 'underline';
            });
            link.addEventListener('mouseout', () => {
                link.style.textDecoration = 'none';
            });

            solutionsList.appendChild(li);
        });
        
    } else {
        const noSolutionItem = document.createElement('li');
        noSolutionItem.textContent = "No solutions available";
        solutionsList.appendChild(noSolutionItem);
    }
}


// Run initialization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the second grid
    initializeSecondGrid();
    
    // Add any other initialization code here
    
    // If you have a button that reveals the second grid, you can hook it up here
    // Example: document.getElementById('reveal-solutions').addEventListener('click', revealSecondGrid);
});