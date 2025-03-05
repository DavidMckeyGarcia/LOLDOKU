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
        livesRemaining = 0;
        updateLivesDisplay();
        saveGameState();
        
        // Reveal the second grid
        setTimeout(() => {
            revealSecondGrid();
        }, 500);

        // Close the modal
        ff15Modal.style.display = 'none';
    });
}

// Refresh Button Functionality
function setupRefreshButton() {
    const refreshBtn = document.getElementById('refresh');
    
    // Show modal when Refresh button is clicked
    refreshBtn.addEventListener('click', function() {
        //Reset Game State
        resetGame()
        loadData()
        
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