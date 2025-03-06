// Game state variables
let answers = new Array(9).fill('');
let correctSquares = new Array(9).fill(false);
let livesRemaining = 3; 
let score = 0;

  
  
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
  
  // Update renderResults to include a highlighted class
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
  
  
// Open submit awnser modal
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
    
    // Store the current grid item index
    const currentIndex = index;
  
    // Show the modal
    modal.style.display = 'flex';
  
    //update sub headers
    updateModalh2(currentIndex);
  
    // Focus the input field
    userAnswerInput.focus();
  
    function submitAnswer() {
      const userAnswer = userAnswerInput.value.trim();
      if (userAnswer) {
        answers[currentIndex] = userAnswer; // Store the user's answer
        
        // Check if the answer is correct
        const isCorrect = validateAnswer(currentIndex, userAnswer);
        
        // Only decrease lives on incorrect answers
        if (!isCorrect && !window.unlimitedMode) {
          livesRemaining--;
          updateLivesDisplay();
        }
        
        // Update the UI based on correctness
        updateCellStatus(currentIndex, isCorrect);
  
        if (isCorrect) {
          correctSquares[currentIndex] = true;
          score = score + 100
          updateScoreDisplay()
        }
  
        // Save game state
        saveGameState();
        
        // Check if the game is over
        checkGameStatus();
        
        console.log(`User's answer for grid item ${currentIndex + 1}: ${userAnswer} - ${isCorrect ? 'Correct' : 'Incorrect'}`);
        console.log(`Lives remaining: ${livesRemaining}`);
        console.log(`Score: ${score}`)
      }
      closeModal();
      userAnswerInput.value = '';
    }
  
    // Updated closeModal function
    function closeModal() {
      const modal = document.getElementById('answer-modal');
    
      // Add the closing animation class
      modal.classList.add('closing');
      setTimeout(() => {
          modal.style.display = 'none';
          modal.classList.remove('closing'); // Remove the class for next time
          userAnswerInput.removeEventListener('keyup', handleKeyUp);
      }, 150); // Match this to the animation duration (0.3s = 300ms)
  }
  
  
  // In the openModal function, modify the event handling:
    function handleKeyUp(event) {
      if (event.key === 'Enter') {
        // At this point the search input should contain the selected item
        submitAnswer();
    }
  }
  
    // Handle the answer submission when the submit button is clicked
    submitButton.onclick = submitAnswer;
  
    // Add event listener for the Enter key
    userAnswerInput.addEventListener('keyup', handleKeyUp);
  
    // Close the modal if clicked outside the modal content
    modal.onclick = function(event) {
      if (event.target === modal) {
        closeModal();
      }
    };
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
      // Remove any previous status classes
      gridItems[index].classList.remove('correct', 'incorrect');
      
      if (isCorrect) {
        // Get the champion name from the user's answer
        const championName = answers[index].toLowerCase().replace(/\s+/g, '');
        
        // Create a temporary div to preload the image
        const preloader = document.createElement('div');
        preloader.style.display = 'none';
        document.body.appendChild(preloader);
        
        // Preload the image
        const img = new Image();
        img.onload = function() {
          // Image is loaded, now we can safely apply it with animation
          document.body.removeChild(preloader);
          
          // Apply a placeholder or initial state first
          gridItems[index].style.backgroundImage = 'none';
          
          // First add the correct class (which has the animation)
          gridItems[index].classList.add('correct');
          
          // Then set the background image after a tiny delay
          requestAnimationFrame(() => {
            gridItems[index].style.backgroundImage = `url('images/Champions/${championName}Square.webp')`;
          });
          
          // Remove the click event listener to prevent further changes
          gridItems[index].removeEventListener('click', gridItems[index].clickHandler);
          gridItems[index].style.cursor = 'default';
        };
        
        // Set the image source to start loading
        img.src = `images/Champions/${championName}Square.webp`;
        preloader.appendChild(img);
        
      } else {
        gridItems[index].classList.add('incorrect');
        
        // Add a brief shake animation and flash red
        gridItems[index].classList.add('shake', 'flash');
        
        setTimeout(() => {
          gridItems[index].classList.remove('shake', 'flash');
        }, 500);
      }
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


// Add a function to update the lives display
function updateLivesDisplay() {
    const livesDisplay = document.getElementById('lives-display');
    if (livesDisplay) {
        if (window.unlimitedMode) {
            livesDisplay.innerHTML = '∞';

        } else {
            livesDisplay.innerHTML = '❤️'.repeat(livesRemaining) + '🖤'.repeat(3 - livesRemaining);
        }
    }

}

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById('score');
  if (window.unlimitedMode) {
    return
  } else {
    scoreDisplay.innerHTML = score.toString()+"G";
  }
}


// Update checkGameStatus to show modals instead of alerts
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
        }
    } else {
        console.log('Game still in progress');
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