// FF15 Button Functionality
function setupFF15Button() {
    const ff15Btn = document.getElementById('forfeit');
    const ff15Modal = document.getElementById('ff15-modal');
    const ff15ConfirmBtn = document.getElementById('ff15-confirm-btn');
    const ff15CancelBtn = document.getElementById('ff15-cancel-btn');
    
    if (!ff15Btn || !ff15Modal || !ff15ConfirmBtn || !ff15CancelBtn) {
        console.error('FF15 button or modal elements not found');
        return;
    }
    
    // Show modal when FF15 button is clicked
    ff15Btn.addEventListener('click', function() {
        ff15Modal.style.display = 'flex';
    });
    
    // Cancel button closes the modal
    ff15CancelBtn.addEventListener('click', function() {
        ff15Modal.style.display = 'none';
    });
    
    // Confirm button triggers forfeit
    ff15ConfirmBtn.addEventListener('click', function() {
        // Set guesses to 0 to trigger game over
        guessesRemaining = 0;
        saveGameState();
        
        // Check game status to reveal solutions
        checkGameStatus();

        
        // Close the modal
        ff15Modal.style.display = 'none';
    });
}

// Refresh Button Functionality
function setupRefreshButton() {
    const refreshBtn = document.getElementById('refresh');
    
    // Show modal when Refresh button is clicked
    refreshBtn.addEventListener('click', function() {

        // Clear the game state
        clearSavedGame();
        
        // Reset the game
        answers = new Array(9).fill('');
        correctSquares = new Array(9).fill(false);
        guessesRemaining = 9;
        
        // Reset the UI
        const gridItems = document.querySelectorAll('.grid-container .grid-item');
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
        
        // Hide the solutions grid if visible
        const secondGridTitle = document.getElementById('second-grid-title');
        const secondGridContainer = document.getElementById('second-grid-container');
        const solutionsContainer = document.getElementById('solutions-container');
        
        if (secondGridTitle) {
            secondGridTitle.style.display = 'none';
            secondGridTitle.classList.remove('visible');
        }
        
        if (secondGridContainer) {
            secondGridContainer.style.display = 'none';
            secondGridContainer.classList.remove('visible');
        }
        
        if (solutionsContainer) {
            solutionsContainer.classList.remove('visible');
        }
        
        // Save the new state
        saveGameState();
        
    });
}

// Initialize the buttons
function initializeButtons() {
    setupFF15Button();
    setupRefreshButton();
    console.log("buttons setup")
}

// Ensure these changes are applied when the page loads
window.addEventListener('load', () => {
    loadData(); // This will load game state and initialize the grid
    
    setTimeout(() => {
        preloadChampionImages();
        initializeButtons(); // Initialize the FF15 and Refresh buttons
        
        // Check if the game is completed and solutions grid should be revealed
        const correctCount = correctSquares.filter(Boolean).length;
        if (correctCount === 9) {
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