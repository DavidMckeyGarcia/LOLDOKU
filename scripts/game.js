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



// Modified window.addEventListener for page load to ensure proper order of execution
window.addEventListener('load', () => {
    loadData(); // This will load game state and initialize the grid
    
    setTimeout(() => {
        preloadChampionImages();
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
