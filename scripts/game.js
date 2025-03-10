// Game state variables
let answers = new Array(9).fill('');
let correctSquares = new Array(9).fill(false);
let livesRemaining = 3; 
let score = 0;


// Initialises user input 
function initializeSearch() {
  const searchInput = document.getElementById('user-answer');
  const searchWrapper = document.querySelector('.wrapper');
  const resultsWrapper = document.querySelector('.results');
  let firstResult = null; // Variable to track the first result
  let currentFocus = -1; // Track which item is currently selected

  searchInput.addEventListener('keyup', function(event) {
    // Don't process up/down/enter key events here - they're handled in keydown
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
      return;
    }
    
    let results = [];
    let input = searchInput.value.trim();
  
    // Only search if input has at least 2 characters
    if (input.length >= 2) {
      // Get matching results
      const matchingItems = searchable.filter((item) => {
        return item.toLowerCase().includes(input.toLowerCase());
      });
      
      // Sort the results by relevance
      results = matchingItems.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const inputLower = input.toLowerCase();
        
        // Check if the item starts with the search input
        const aStartsWith = aLower.startsWith(inputLower);
        const bStartsWith = bLower.startsWith(inputLower);
        
        if (aStartsWith && !bStartsWith) {
          return -1; // a comes first
        } else if (!aStartsWith && bStartsWith) {
          return 1;  // b comes first
        } else {
          // If both either start with or don't start with input,
          // then sort by position of match
          const aIndex = aLower.indexOf(inputLower);
          const bIndex = bLower.indexOf(inputLower);
          
          if (aIndex !== bIndex) {
            return aIndex - bIndex; // Sort by position of match
          } else {
            // If matches are at the same position, sort alphabetically
            return aLower.localeCompare(bLower);
          }
        }
      });
    } else {
      // Hide the results dropdown if less than 2 characters
      resultsWrapper.classList.remove('show');
      return;
    }
    
    // Store the first result
    firstResult = results.length > 0 ? results[0] : null;
    
    // Reset the current focus when results change
    currentFocus = -1;
    
    renderResults(results);
  });
    
    // Handle navigation with arrow keys
    searchInput.addEventListener('keydown', function(event) {
      const resultItems = resultsWrapper.querySelectorAll('li');
      
      if (!resultItems.length) return;
      
      if (event.key === 'ArrowDown') {
        currentFocus++;
        // Loop back to start if at the end
        if (currentFocus >= resultItems.length) currentFocus = 0;
        setActiveSuggestion(resultItems, currentFocus);
        event.preventDefault(); // Prevent cursor from moving in input
      } 
      else if (event.key === 'ArrowUp') {
        currentFocus--;
        // Loop to end if at the start
        if (currentFocus < 0) currentFocus = resultItems.length - 1;
        setActiveSuggestion(resultItems, currentFocus);
        event.preventDefault(); // Prevent cursor from moving in input
      } 
      else if (event.key === 'Enter') {
        if (currentFocus > -1) {
          // If an item is focused, select it
          searchInput.value = resultItems[currentFocus].textContent;
          resultsWrapper.classList.remove('show');
        } else if (firstResult) {
          // If no item is focused but there's a first result, select it
          searchInput.value = firstResult;
          resultsWrapper.classList.remove('show');
        }
      }
    });
  
    // Function to highlight the active suggestion
  function setActiveSuggestion(items, index) {
    if (!items) return;
    
    // Remove active class from all items
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
    }
    
    // Add active class to current item
    if (index >= 0 && index < items.length) {
      items[index].classList.add('active');
      // Update input value to show the currently selected item
      searchInput.value = items[index].querySelector('span').textContent;
    }
  }
  
// Update the renderResults function to submit the answer on click
function renderResults(results) {
  // If there are no results, hide the results dropdown
  if (!results.length) {
    resultsWrapper.classList.remove('show');
    return;
  }

  // Create a list of result items with images
  const content = results
    .map((item, index) => {
      // Transform the champion name to match your image naming convention
      const championName = item.toLowerCase().replace(/\s+/g, '');
      const imagePath = `images/Champions/${championName}Square.webp`;
      
      return `<li>
        <div style="display: flex; align-items: center;">
          <img src="${imagePath}" alt="${item}" style="width: 30px; height: 30px; margin-right: 10px; border-radius: 3px;">
          <span class="champion-name">${item}</span>
        </div>
      </li>`;
    })
    .join('');

  // Show the results dropdown and populate it with the search results
  resultsWrapper.classList.add('show');
  resultsWrapper.innerHTML = `<ul>${content}</ul>`;

  // Add click event to each result item
  const resultItems = resultsWrapper.querySelectorAll('li');
  resultItems.forEach((item) => {
    item.addEventListener('click', function() {
      // Get the text content from the span element inside this li
      const championName = this.querySelector('span').textContent;
      searchInput.value = championName;
      resultsWrapper.classList.remove('show');
      
      // Add this line to submit the answer when an item is clicked
      if (typeof submitAnswer === 'function') {
        submitAnswer();
      }
    });

    // Add mouseover event to highlight the item
    item.addEventListener('mouseover', function() {
      // Remove highlight from all items
      resultItems.forEach(i => i.classList.remove('active'));
      // Add highlight to this item
      this.classList.add('active');
    });
  });
}
}
  
// Add this at the top with your other game state variables
let currentActiveIndex = -1;

// Modify your openModal function
function openModal(index) {
  const gridItems = document.querySelectorAll('.grid-item');
  
  // Check if the index is within the range of 1 to 9
  if (index < 0 || index > 8) {
      console.log(`Grid item index ${index + 1} is out of allowed range (1-9) and cannot open modal.`);
      return; // Exit the function early
  }

  // Check if the cell is already correctly answered
  if (gridItems[index].classList.contains('correct')) {
    console.log(`Grid item ${index + 1} is already correct and cannot be changed`);
    return; // Exit the function early
  }

  if (livesRemaining <= 0 && !window.unlimitedMode) {
    console.log(`User ran out of lives`);
    return; // Exit the function early
  }
  
  const modal = document.getElementById('answer-modal');
  const userAnswerInput = document.getElementById('user-answer');
  const submitButton = document.getElementById('submit-answer');
  const resultsList = document.querySelector('.results ul');
  
  // Store the current grid item index in global variable
  currentActiveIndex = index;

  // Show the modal
  modal.style.display = 'flex';

  //update sub headers
  updateModalh2(currentActiveIndex);

  // Focus the input field
  userAnswerInput.focus();

  // Add event listener for the Enter key
  userAnswerInput.addEventListener('keyup', handleKeyUp);
  
  // Handle the answer submission when the submit button is clicked
  submitButton.onclick = submitAnswer;

  // Set up event delegation for dropdown items
  // First remove any existing event listener to avoid duplicates
  if (resultsList._clickListener) {
      resultsList.removeEventListener('click', resultsList._clickListener);
  }
  
  // Create a new click listener function
  resultsList._clickListener = function(event) {
      const listItem = event.target.closest('li');
      if (listItem) {
          // Set the input value to the selected champion
          userAnswerInput.value = listItem.textContent.trim();
          
          // Submit the answer
          submitAnswer();
      }
  };
  
  // Add the new click listener
  resultsList.addEventListener('click', resultsList._clickListener);

  // Close the modal if clicked outside the modal content
  modal.onclick = function(event) {
    if (event.target === modal) {
      closeModal();
    }
  };
}

function submitAnswer() {
    const userAnswerInput = document.getElementById('user-answer');
    const userAnswer = userAnswerInput.value.trim();
    
    if (userAnswer && currentActiveIndex !== -1) {
      answers[currentActiveIndex] = userAnswer; // Store the user's answer
      
      // Check if the answer is correct
      const isCorrect = validateAnswer(currentActiveIndex, userAnswer);
      
      // Only decrease lives on incorrect answers
      if (!isCorrect && !window.unlimitedMode) {
        livesRemaining--;
        updateLivesDisplay();
      }
      
      // Update the UI based on correctness
      updateCellStatus(currentActiveIndex, isCorrect);

      if (isCorrect) {
        correctSquares[currentActiveIndex] = true;
        score = score + 100
        updateScoreDisplay()
      }

      // Save game state
      saveGameState();
      
      // Check if the game is over
      checkGameStatus();
      
      console.log(`User's answer for grid item ${currentActiveIndex + 1}: ${userAnswer} - ${isCorrect ? 'Correct' : 'Incorrect'}`);
      console.log(`Lives remaining: ${livesRemaining}`);
      console.log(`Score: ${score}`)
    }
    closeModal();
    userAnswerInput.value = '';
}

function handleKeyUp(event) {
    if (event.key === 'Enter') {
      // At this point the search input should contain the selected item
      submitAnswer();
    }
}


function closeModal() {
  const modal = document.getElementById('answer-modal');
  const userAnswerInput = document.getElementById('user-answer');
  const submitButton = document.getElementById('submit-answer');
  const resultsList = document.querySelector('.results ul');

  // Remove event listeners
  userAnswerInput.removeEventListener('keyup', handleKeyUp);
  submitButton.onclick = null;
  modal.onclick = null;
  
  // Remove dropdown item click listener if it exists
  if (resultsList && resultsList._clickListener) {
      resultsList.removeEventListener('click', resultsList._clickListener);
      resultsList._clickListener = null;
  }

  // Add the closing animation class
  modal.classList.add('closing');
  
  setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('closing'); // Remove the class for next time
      // Reset the current active index
      currentActiveIndex = -1;
  }, 150); // Match this to the animation duration (0.15s = 150ms)
}
  
function updateModalh2(index) {
    // Use the cached data instead of fetching again
    const rows = puzzleData.rows;
    const cols = puzzleData.cols;
    
    // Calculate the row and column based on the flat index
    const rowIndex = Math.floor(index / 3); // For a 3x3 grid
    const colIndex = index % 3;
    
    // Ensure rowIndex and colIndex are within bounds
    if (rowIndex >= 0 && rowIndex < rows.length && colIndex >= 0 && colIndex < cols.length) {
      const rowValue = rows[rowIndex];
      const colValue = cols[colIndex];
      
      // Find the h2 element in the modal
      const modalHeader = document.getElementById('modal-cats');
      
      // Update the h2 text content with row and col values
      modalHeader.textContent = `${rowValue} / ${colValue}`;
    } else {
      console.error('Index is out of bounds!', { index, rowIndex, colIndex });
    }
}
  

// function to update the cell's visual status
function updateCellStatus(index, isCorrect) {
  const gridItems = document.querySelectorAll('.grid-item');
  
  if (index >= 0 && index < gridItems.length) {
    // Get the current grid item
    const gridItem = gridItems[index];
    
    // Clear any existing animations and classes
    gridItem.classList.remove('correct', 'incorrect', 'shake-animation', 'flash-animation');
    
    if (isCorrect) {
      // Your existing correct answer code works fine
      const championName = answers[index].toLowerCase().replace(/\s+/g, '');
      
      const preloader = document.createElement('div');
      preloader.style.display = 'none';
      document.body.appendChild(preloader);
      
      const img = new Image();
      img.onload = function() {
        document.body.removeChild(preloader);
        gridItem.style.backgroundImage = 'none';
        gridItem.classList.add('correct');
        
        requestAnimationFrame(() => {
          gridItem.style.backgroundImage = `url('images/Champions/${championName}Square.webp')`;
        });
        
        gridItem.removeEventListener('click', gridItem.clickHandler);
        gridItem.style.cursor = 'default';
      };
      
      img.src = `images/Champions/${championName}Square.webp`;
      preloader.appendChild(img);
      
    } else {
      // For incorrect answers, use classes instead of direct style manipulation
      console.log("Incorrect answer - applying animations");
      
      // Add both animation classes
      gridItem.classList.add('shake-animation', 'incorrect-flash');
      
      // Remove the animation classes after they complete
      setTimeout(() => {
        gridItem.classList.remove('shake-animation', 'incorrect-flash');
      }, 700); // Slightly longer than animation duration to ensure it completes
    }
  }
}

// Add a function to update the lives display with animation
function updateLivesDisplay() {
  const livesDisplay = document.getElementById('lives-display');
  if (livesDisplay) {
      // Store original transform for restoration
      const originalTransform = getComputedStyle(livesDisplay).transform;
      
      // Apply animation via direct style manipulation
      livesDisplay.style.transition = "transform 0.5s ease";
      livesDisplay.style.transform = "scale(1.6)";
      
      // Update content
      if (window.unlimitedMode) {
          livesDisplay.innerHTML = '∞';
      } else {
          livesDisplay.innerHTML = '❤️'.repeat(livesRemaining) + '🖤'.repeat(3 - livesRemaining);
      }
      
      // Remove animation after it completes
      setTimeout(() => {
          livesDisplay.style.transform = "scale(1)";
      }, 250);
  }
}

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById('score');
  if (!window.unlimitedMode && scoreDisplay) {
      // Store original transform for restoration
      const originalTransform = getComputedStyle(scoreDisplay).transform;
      
      // Apply animation via direct style manipulation
      scoreDisplay.style.transition = "transform 0.5s ease";
      scoreDisplay.style.transform = "scale(1.2)";
      
      // Update content
      scoreDisplay.innerHTML = score.toString() + "G";
      
      // Remove animation after it completes
      setTimeout(() => {
          scoreDisplay.style.transform = "scale(1)";
      }, 250);
  }
}


// Function to initialize the grid based on saved state
function initializeGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
  
    gridItems.forEach((item, index) => {
      // If the square was already correct, restore its state
      if (correctSquares[index]) {
        const championName = answers[index].toLowerCase().replace(/\s+/g, '');
        item.classList.add('correct');
        item.style.backgroundImage = `url('images/Champions/${championName}Square.webp')`;
        item.style.cursor = 'default';
      } else {
        // Create the click handler function and store it on the element
        const clickHandler = function() {
          openModal(index);
          console.log(`Grid item ${index + 1} clicked`);
        };
        
        // Store the handler on the element for later reference
        item.clickHandler = clickHandler;
        
        // Add the click event listener
        item.addEventListener('click', clickHandler);
      }
    });
}
  
  
// Function to validate user input answer
function validateAnswer(index, answer) {
    // Convert the answer to lowercase for case-insensitive comparison
    const normalizedAnswer = answer.trim().toLowerCase();
    
    // Check if the answer is in the solutions list for this cell
    const cellSolutions = puzzleData.solutions[index].map(solution => solution.toLowerCase());
    
    return cellSolutions.includes(normalizedAnswer);
}


// Update saveGameState to save livesRemaining instead of guessesRemaining
function saveGameState() {
    const gameState = {
      answers,
      correctSquares,
      livesRemaining,
      score,
      solutionsGridVisible: document.getElementById('second-grid-container')?.style.display === 'block',
      unlimitedMode: window.unlimitedMode || false // Add tracking for unlimited mode
    };
    
    localStorage.setItem('puzzleGameState', JSON.stringify(gameState));
    console.log('Game state saved to local storage');
    console.log('Lives remaining:', livesRemaining);
    console.log('Score:', score);
    console.log('Solutions grid visibility saved:', gameState.solutionsGridVisible);
}


// Update loadGameState to load livesRemaining
function loadGameState() {
    const savedState = localStorage.getItem('puzzleGameState');
    
    if (savedState) {
      const gameState = JSON.parse(savedState);
      answers = gameState.answers;
      correctSquares = gameState.correctSquares;
      livesRemaining = gameState.livesRemaining !== undefined ? gameState.livesRemaining : 3;
      window.unlimitedMode = gameState.unlimitedMode || false;
      score = gameState.score !== undefined ? gameState.score : 0;
      
      console.log('Game state loaded from local storage');
      console.log(`Lives remaining: ${livesRemaining}`);
      console.log(`Score: ${score}`);
      console.log(`Correct squares: ${correctSquares.filter(Boolean).length}`);
      
      // Update lives display
      updateLivesDisplay();
      
      // Check if the game is completed and solutions grid should be visible
      const isGameCompleted = (livesRemaining <= 0 && !window.unlimitedMode) || correctSquares.filter(Boolean).length === 9;
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
      livesRemaining = 3;
      window.unlimitedMode = false;
      console.log('No saved game found, starting fresh');
      
      // Update lives display
      updateLivesDisplay();
    }
}


// Update checkGameStatus to show modals instead of alerts
// Update checkGameStatus to show modals and initialize timer if needed
function checkGameStatus() {
  console.log('Checking game status');
  const correctCount = correctSquares.filter(Boolean).length;
  
  console.log(`Correct count: ${correctCount}, Lives remaining: ${livesRemaining}`);
  
  // Game is won if all squares are correct
  if (correctCount === 9) {
      console.log('Game won, showing win modal');
      
      // Show win modal
      const winModal = document.getElementById('win-modal');
      if (winModal) {
          winModal.style.display = 'flex';
          
          // Initialize the countdown timer in the win modal
          initializeCountdownTimer();
      }
      
      // Reveal the second grid
      setTimeout(() => {
          revealSecondGrid();
      }, 500);
  }
  // Game is lost if no lives remain and not all squares are correct
  else if (livesRemaining <= 0 && !window.unlimitedMode) {
      console.log('Game lost, showing game over modal');
      
      // Show game over modal
      const gameOverModal = document.getElementById('game-over-modal');
      if (gameOverModal) {
          gameOverModal.style.display = 'flex';

          // Initialize the countdown timer in the win modal
          initializeCountdownTimer();
      }
  } else {
      console.log('Game still in progress');
  }
}

// Simple function to initialize the countdown timer
function initializeCountdownTimer() {
  // Get the countdown element
  const countdownElement = document.getElementById('countdown-timer');
  if (!countdownElement) return;
  
  // Function to update the timer
  function updateTimer() {
      // Get current time
      const now = new Date();
      
      // Set target time (next midnight)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      // Calculate remaining time
      const diff = tomorrow - now;
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Display time with leading zeros
      countdownElement.textContent = 
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      // If we've reached the next day, reload the page
      if (diff <= 0) {
          clearInterval(timerId);
          location.reload();
      }
  }
  
  // Update immediately then set interval
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
  
  // Store the timer ID on the modal element so we can clear it when closed
  const winModal = document.getElementById('win-modal');
  if (winModal) {
      winModal.timerId = timerId;
  }
}



// Reset game function - update to reset lives instead of guesses
function resetGame() {
    // Clear the game state
    clearSavedGame();
        
    // Reset the game
    answers = new Array(9).fill('');
    correctSquares = new Array(9).fill(false);
    livesRemaining = 3;
    score = 0;
    window.unlimitedMode = false;
    
    // Update lives display
    updateLivesDisplay();
    updateScoreDisplay();
            
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
}


// Add a function to clear the saved game (useful for testing)
function clearSavedGame() {
    localStorage.removeItem('puzzleGameState');
    console.log('Saved game cleared from local storage');
}



// Initialize event listeners for the new modals when the page loads
window.addEventListener('DOMContentLoaded', function() {
    // Game Over Modal
    const continueBtn = document.getElementById('continue-btn');
    const revealBtn = document.getElementById('reveal-btn');
    const gameOverModal = document.getElementById('game-over-modal');
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            // Enable unlimited mode
            window.unlimitedMode = true;
            updateLivesDisplay();
            saveGameState();
            
            // Hide the modal
            if (gameOverModal) {
                gameOverModal.style.display = 'none';
            }
        });
    }
    
    if (revealBtn) {
        revealBtn.addEventListener('click', function() {
            // Reveal solutions grid
            createSecondGrid();
            updateSecondGridContent();
            revealSecondGrid();
            
            // Hide the modal
            if (gameOverModal) {
                gameOverModal.style.display = 'none';
            }
        });
    }
    
    // Win Modal
    const continueWinBtn = document.getElementById('continue-win-btn');
    const winModal = document.getElementById('win-modal');
    
    if (continueWinBtn) {
        continueWinBtn.addEventListener('click', function() {
            // Hide the modal
            if (winModal) {
                winModal.style.display = 'none';
            }
        });
    }
});

// Update the win modal button click handler to clear the timer
window.addEventListener('DOMContentLoaded', function() {
  // Win Modal
  const continueWinBtn = document.getElementById('continue-win-btn');
  const winModal = document.getElementById('win-modal');
  
  if (continueWinBtn && winModal) {
      continueWinBtn.addEventListener('click', function() {
          // Clear the interval when closing the modal
          if (winModal.timerId) {
              clearInterval(winModal.timerId);
          }
          
          // Hide the modal
          winModal.style.display = 'none';
      });
  }
});
