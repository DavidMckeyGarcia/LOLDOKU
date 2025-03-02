// Game state variables
let answers = new Array(9).fill('');
let correctSquares = new Array(9).fill(false);
let guessesRemaining = 9;

// Modified saveGameState function to include the solutions grid visibility
function saveGameState() {
    const gameState = {
      answers,
      correctSquares,
      guessesRemaining,
      solutionsGridVisible: document.getElementById('second-grid-container')?.style.display === 'block'
    };
    
    localStorage.setItem('puzzleGameState', JSON.stringify(gameState));
    console.log('Game state saved to local storage');
    console.log('Solutions grid visibility saved:', gameState.solutionsGridVisible);
}


// Modified loadGameState function to handle the solutions grid visibility
function loadGameState() {
    const savedState = localStorage.getItem('puzzleGameState');
    
    if (savedState) {
      const gameState = JSON.parse(savedState);
      answers = gameState.answers;
      correctSquares = gameState.correctSquares;
      guessesRemaining = gameState.guessesRemaining;
      
      console.log('Game state loaded from local storage');
      console.log(`Guesses remaining: ${guessesRemaining}`);
      console.log(`Correct squares: ${correctSquares.filter(Boolean).length}`);
      
      // Check if the game is completed and solutions grid should be visible
      const isGameCompleted = guessesRemaining <= 0 || correctSquares.filter(Boolean).length === 9;
      const shouldShowSolutionsGrid = gameState.solutionsGridVisible || isGameCompleted;
      
      if (shouldShowSolutionsGrid) {
        console.log('Solution grid should be visible, will show after initialization');
        // We'll reveal the grid after it's been created
        setTimeout(() => {
          createSecondGrid();
          updateSecondGridContent();
          revealSecondGrid();
        }, 500);
      }
    } else {
      // Initialize a fresh game state
      answers = new Array(9).fill('');
      correctSquares = new Array(9).fill(false);
      guessesRemaining = 9;
      console.log('No saved game found, starting fresh');
    }
}


//Check current game state
function checkGameStatus() {
    console.log('Checking game status');
    const correctCount = correctSquares.filter(Boolean).length;
    
    console.log(`Correct count: ${correctCount}, Guesses remaining: ${guessesRemaining}`);
    
    // Game is won if all squares are correct
    if (correctCount === 9) {
        console.log('Game won, preparing to reveal second grid');
        setTimeout(() => {
            // Reveal the second grid
            revealSecondGrid();
            
            alert('Congratulations! You solved the puzzle! Bonus content unlocked!');
            // Optionally reset the game or offer to play a new one
            if (confirm('Would you like to play again? (Your bonus content will remain visible)')) {
                resetGame();
            }
        }, 500); // Short delay to allow the UI to update first
    }
    // Game is lost if no guesses remain and not all squares are correct
    else if (guessesRemaining <= 0) {
        console.log('Game lost, preparing to reveal second grid');
        setTimeout(() => {
            // Reveal the second grid

            revealSecondGrid();
            console.log("Second grid should be revealed")

            alert(`Game over! You correctly identified ${correctCount} out of 9 champions. Bonus content unlocked!`);
            // Optionally reset the game or offer to play a new one
            if (confirm('Would you like to play again? (Your bonus content will remain visible)')) {
                resetGame();
            }
        }, 500); // Short delay to allow the UI to update first
    } else {
        console.log('Game still in progress');
    }
}


//Reset Game Function
function resetGame() {
    // Store whether the solutions grid was visible
    const wasGridVisible = document.getElementById('second-grid-container')?.style.display === 'block';
    
    answers = new Array(9).fill('');
    correctSquares = new Array(9).fill(false);
    guessesRemaining = 9;
    
    // Reset the UI
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
      item.classList.remove('correct', 'incorrect');
      item.style.backgroundImage = ""; // Reset the background image
      
      // Re-enable click if it was disabled
      item.style.cursor = 'pointer';
      
      // Remove existing event listener if any
      if (item.clickHandler) {
        item.removeEventListener('click', item.clickHandler);
      }
      
      // Add new click handler
      const clickHandler = function() {
        openModal(index);
      };
      item.clickHandler = clickHandler;
      item.addEventListener('click', clickHandler);
    });
    
    // If the grid was visible, keep it visible
    if (wasGridVisible) {
        // Make sure the solutions grid exists and is visible
        if (!document.getElementById('second-grid-container')) {
            createSecondGrid();
            updateSecondGridContent();
        }
        revealSecondGrid();
    }
    
    // Save the reset state with grid visibility info
    saveGameState();
    
    console.log('Game reset, solutions grid visibility maintained:', wasGridVisible);
}

// Add a function to clear the saved game (useful for testing)
function clearSavedGame() {
    localStorage.removeItem('puzzleGameState');
    console.log('Saved game cleared from local storage');
}

//reset button
function addResetButton() {
    // Check if button already exists
    if (document.getElementById('reset-game-btn')) return;
    
    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-game-btn';
    resetBtn.textContent = 'Reset Game';
    resetBtn.style.marginTop = '10px';
    resetBtn.style.padding = '5px 10px';
    resetBtn.style.backgroundColor = '#f44336';
    resetBtn.style.color = 'white';
    resetBtn.style.border = 'none';
    resetBtn.style.borderRadius = '4px';
    resetBtn.style.cursor = 'pointer';
    
    resetBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
        resetGame();
      }
    });
}




// Function to create the second grid if it doesn't exist yet
function createSecondGrid() {
    console.log('Creating second grid');
    
    // Check if the second grid already exists
    if (document.getElementById('second-grid-container')) {
        console.log('Second grid already exists');
        return;
    }
    
    // Get the dimensions and styling from the original grid
    const originalGrid = document.querySelector('.grid-container .grid');
    const originalGridStyle = window.getComputedStyle(originalGrid);
    const originalWidth = originalGridStyle.width;
    const originalMaxWidth = originalGridStyle.maxWidth;
    
    // Create elements for the second grid
    const secondGridTitle = document.createElement('h2');
    secondGridTitle.id = 'second-grid-title';
    secondGridTitle.textContent = 'SOLUTIONS GRID';
    secondGridTitle.style.textAlign = 'center';
    secondGridTitle.style.marginTop = '30px';
    secondGridTitle.style.display = 'none';
    
    // Create the container with the same class as the original
    const secondGridContainer = document.createElement('div');
    secondGridContainer.id = 'second-grid-container';
    secondGridContainer.className = 'grid-container'; // Same class as original
    secondGridContainer.style.display = 'none';
    secondGridContainer.style.marginTop = '20px';
    
    // Create a grid element with the same structure as your main grid
    const gridElement = document.createElement('div');
    gridElement.className = 'grid';
    
    // Apply the same width and max-width
    if (originalWidth) gridElement.style.width = originalWidth;
    if (originalMaxWidth) gridElement.style.maxWidth = originalMaxWidth;
    
    secondGridContainer.appendChild(gridElement);
    
    // Add header row (column headers)
    const headerTopLeft = document.createElement('div');
    headerTopLeft.className = 'grid-header';
    gridElement.appendChild(headerTopLeft);
    
    for (let i = 0; i < 3; i++) {
        const colHeader = document.createElement('div');
        colHeader.className = 'grid-header';
        gridElement.appendChild(colHeader);
    }
    
    // Empty cell for top right
    const headerTopRight = document.createElement('div');
    headerTopRight.className = 'grid-header';
    gridElement.appendChild(headerTopRight);
    
    // Create the 3x3 grid with row headers
    for (let row = 0; row < 3; row++) {
        // Row header
        const rowHeader = document.createElement('div');
        rowHeader.className = 'grid-header';
        gridElement.appendChild(rowHeader);
        
        // Three cells for this row
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridElement.appendChild(gridItem);
        }
        
        // Empty cell for row end
        const rowEnd = document.createElement('div');
        rowEnd.className = 'grid-header';
        gridElement.appendChild(rowEnd);
    }
    
    // Find the container to append to - try to find the closest parent of the original grid
    const mainGridContainer = document.querySelector('.grid-container');
    if (mainGridContainer && mainGridContainer.parentElement) {
        // Append to the parent of the original grid container
        mainGridContainer.parentElement.appendChild(secondGridTitle);
        mainGridContainer.parentElement.appendChild(secondGridContainer);
        console.log('Second grid added as sibling to first grid container');
    } else {
        // Fallback - append to body
        document.body.appendChild(secondGridTitle);
        document.body.appendChild(secondGridContainer);
        console.log('Second grid added to body (container not found)');
    }
}


function updateSecondGridContent() {
    // Array of possible solutions for each grid item
    const solutions = puzzleData.solutions

    // Get the second grid container
    const secondGridContainer = document.getElementById('second-grid-container');
    
    if (secondGridContainer) {
        // Get the grid element inside the container
        const gridElement = secondGridContainer.querySelector('.grid');
        
        // Get all the grid items (the cells in the grid, not the headers)
        const gridItems = gridElement.querySelectorAll('.grid-item');
        
        // Loop through the grid items and assign a random solution for each grid item
        gridItems.forEach((item, index) => {
            // Get the possible solutions for the current grid item
            const possibleSolutions = solutions[index];
            
            // Select a random solution from the current array of solutions
            const randomIndex = Math.floor(Math.random() * possibleSolutions.length);
            
            // Assign the randomly selected solution to the grid item
            const randomSolution = possibleSolutions[randomIndex].toLowerCase().replace(/\s+/g, '');
            gridItems[index].style.backgroundImage = `url('Images/Champions/${randomSolution}Square.png')`;

        });
    } else {
        console.error('Second grid container not found');
    }
}


function revealSecondGrid() {
    console.log('Revealing second grid');
    
    // Get references to the second grid elements
    const secondGridTitle = document.getElementById('second-grid-title');
    const secondGridContainer = document.getElementById('second-grid-container');
    
    if (secondGridTitle && secondGridContainer) {
        // Show the title and container
        secondGridTitle.style.display = 'block';
        secondGridContainer.style.display = 'block';
        
        // Add a fade-in effect
        secondGridTitle.style.opacity = 0;
        secondGridContainer.style.opacity = 0;
        
        // Animate the opacity
        let opacity = 0;
        const fadeInterval = setInterval(() => {
            opacity += 0.1;
            secondGridTitle.style.opacity = opacity;
            secondGridContainer.style.opacity = opacity;
            
            if (opacity >= 1) {
                clearInterval(fadeInterval);
                console.log('Fade-in animation complete');
            }
        }, 50);
        
        console.log('Second grid revealed');
    } else {
        console.error('Could not find second grid elements');
    }
}



// Modified window.addEventListener for page load to ensure proper order of execution
window.addEventListener('load', () => {
    loadData(); // This will load game state and initialize the grid
    
    setTimeout(() => {
        preloadChampionImages();
        addResetButton();
        
        // Check if the game is completed and solutions grid should be revealed
        const correctCount = correctSquares.filter(Boolean).length;
        if (guessesRemaining <= 0 || correctCount === 9) {
            console.log('Game is completed, ensuring solutions grid is visible');
            if (!document.getElementById('second-grid-container') || 
                document.getElementById('second-grid-container').style.display !== 'block') {
                createSecondGrid();
                updateSecondGridContent();
                revealSecondGrid();
            }
        }
    }, 1000);
});
