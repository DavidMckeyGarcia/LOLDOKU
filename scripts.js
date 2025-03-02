let puzzleData = {
  rows: [],
  cols: [],
  difficulty: null,
  solutions: []
};

//Champion list
let searchable = [
  'Aatrox',
  'Ahri',
  'Akali',
  'Akshan',
  'Alistar',
  'Ambessa',
  'Amumu',
  'Anivia',
  'Annie',
  'Aphelios',
  'Ashe',
  'Aurelion Sol',
  'Aurora',
  'Azir',
  'Bard',
  'BelVeth',
  'Blitzcrank',
  'Brand',
  'Braum',
  'Briar',
  'Caitlyn',
  'Camille',
  'Cassiopeia',
  'ChoGath',
  'Corki',
  'Darius',
  'Diana',
  'Draven',
  'Dr. Mundo',
  'Ekko',
  'Elise',
  'Evelynn',
  'Ezreal',
  'Fiddlesticks',
  'Fiora',
  'Fizz',
  'Galio',
  'Gangplank',
  'Garen',
  'Gnar',
  'Gragas',
  'Graves',
  'Gwen',
  'Hecarim',
  'Heimerdinger',
  'Hwei',
  'Illaoi',
  'Irelia',
  'Ivern',
  'Janna',
  'Jarvan IV',
  'Jax',
  'Jayce',
  'Jhin',
  'Jinx',
  'KaiSa',
  'Kalista',
  'Karma',
  'Karthus',
  'Kassadin',
  'Katarina',
  'Kayle',
  'Kayn',
  'Kennen',
  'KhaZix',
  'Kindred',
  'Kled',
  'KogMaw',
  'Ksante',
  'LeBlanc',
  'Lee Sin',
  'Leona',
  'Lillia',
  'Lissandra',
  'Lucian',
  'Lulu',
  'Lux',
  'Malphite',
  'Malzahar',
  'Maokai',
  'Master Yi',
  'Mel',
  'Milio',
  'Miss Fortune',
  'Mordekaiser',
  'Morgana',
  'Naafiri',
  'Nami',
  'Nasus',
  'Nautilus',
  'Neeko',
  'Nidalee',
  'Nilah',
  'Nocturne',
  'Nunu',
  'Olaf',
  'Orianna',
  'Ornn',
  'Pantheon',
  'Poppy',
  'Pyke',
  'Qiyana',
  'Quinn',
  'Rakan',
  'Rammus',
  'RekSai',
  'Rell',
  'Renata Glasc',
  'Renekton',
  'Rengar',
  'Riven',
  'Rumble',
  'Ryze',
  'Samira',
  'Sejuani',
  'Senna',
  'Seraphine',
  'Sett',
  'Shaco',
  'Shen',
  'Shyvana',
  'Singed',
  'Sion',
  'Sivir',
  'Skarner',
  'Smolder',
  'Sona',
  'Soraka',
  'Swain',
  'Sylas',
  'Syndra',
  'Tahm Kench',
  'Taliyah',
  'Talon',
  'Taric',
  'Teemo',
  'Thresh',
  'Tristana',
  'Trundle',
  'Tryndamere',
  'Twisted Fate',
  'Twitch',
  'Udyr',
  'Urgot',
  'Varus',
  'Vayne',
  'Veigar',
  'VelKoz',
  'Vex',
  'Vi',
  'Viego',
  'Viktor',
  'Vladimir',
  'Volibear',
  'Warwick',
  'Wukong',
  'Xayah',
  'Xerath',
  'Xin Zhao',
  'Yasuo',
  'Yone',
  'Yorick',
  'Yuumi',
  'Zac',
  'Zed',
  'Zeri',
  'Ziggs',
  'Zilean',
  'Zoe',
  'Zyra'
  
  ]

  
loadData();


// Update loadData function to cache all data
function loadData() {
  fetch('puzzle_data.json')
    .then(response => response.json())
    .then(data => {
      // Store all data in our global variable
      puzzleData = data;
      
      // Update headers using the cached data
      updateHeaders(puzzleData);

      console.log('Rows:', puzzleData.rows); 
      console.log('Cols:', puzzleData.cols);
      console.log('sols:', puzzleData.solutions);
      console.log('rank:', puzzleData.difficulty);

      // Load game state after data is available
      loadGameState();
      
      // Initialize the grid with the loaded state
      initializeGrid();

      // INITIQ
      createSecondGrid();
      updateSecondGridContent();

      clearSavedGame();
      console.log('cleard game state')
    })
    .catch(error => console.error('Error loading JSON data:', error));
}


function preloadChampionImages() {
  // Create hidden container for preloaded images
  const preloadContainer = document.createElement('div');
  preloadContainer.style.display = 'none';
  document.body.appendChild(preloadContainer);
  
  // Preload each champion image
  searchable.forEach(champion => {
    const img = new Image();
    const championName = champion.toLowerCase().replace(/\s+/g, '');
    img.src = `images/Champions/${championName}Square.png`;
    preloadContainer.appendChild(img);
  });
  console.log('ChampIcons loaded')

}


window.addEventListener('load', () => {
  setTimeout(preloadChampionImages, 1000); // Delay by 1 second to prioritize initial page render
});


// Initialize search functionality
document.addEventListener('DOMContentLoaded', function () {
  initializeSearch();
});


function initializeSearch() {
  const searchInput = document.getElementById('user-answer');
  const searchWrapper = document.querySelector('.wrapper');
  const resultsWrapper = document.querySelector('.results');
  let firstResult = null; // Variable to track the first result
  let currentFocus = -1; // Track which item is currently selected

  // Listen for keyup/keydown events in the search input
  searchInput.addEventListener('keyup', function(event) {
    // Don't process up/down/enter key events here - they're handled in keydown
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
      return;
    }
    
    let results = [];
    let input = searchInput.value;

    // If the input is not empty, filter the searchable array
    if (input.length) {
      results = searchable.filter((item) => {
        return item.toLowerCase().includes(input.toLowerCase());
      });
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
      const imagePath = `images/Champions/${championName}Square.png`;
      
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


// Function to open the modal
function openModal(index) {
  const gridItems = document.querySelectorAll('.grid-item');
  
  // Check if the cell is already correctly answered
  if (gridItems[index].classList.contains('correct')) {
    console.log(`Grid item ${index + 1} is already correct and cannot be changed`);
    return; // Exit the function early
  }

  if (guessesRemaining <= 0) {
    console.log(`User ran out of guesses`);
    return; // Exit the function early
  }
  
  const modal = document.getElementById('answer-modal');
  const userAnswerInput = document.getElementById('user-answer');
  const submitButton = document.getElementById('submit-answer');
  
  // Store the current grid item index
  const currentIndex = index;

  // Show the modal
  modal.style.display = 'flex';

  //update sub headers]
  updateModalh2(currentIndex);


  // Focus the input field
  userAnswerInput.focus();

  function submitAnswer() {
    const userAnswer = userAnswerInput.value.trim();
    if (userAnswer) {
      answers[currentIndex] = userAnswer; // Store the user's answer

      // Decrease remaining guesses
      guessesRemaining--;
      
      // Check if the answer is correct
      const isCorrect = validateAnswer(currentIndex, userAnswer);
      
      // Update the UI based on correctness
      updateCellStatus(currentIndex, isCorrect);

      if (isCorrect) {
        correctSquares[currentIndex] = true;
      }

      // Save game state
      saveGameState();
      
      // Check if the game is over
      checkGameStatus();
      
      console.log(`User's answer for grid item ${currentIndex + 1}: ${userAnswer} - ${isCorrect ? 'Correct' : 'Incorrect'}`);
      console.log(`Guesses remaining: ${guessesRemaining}`);
    }
    closeModal();
    userAnswerInput.value =  '';
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


// Updated function to update the cell's visual status
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
          gridItems[index].style.backgroundImage = `url('images/Champions/${championName}Square.png')`;
        });
        
        // Remove the click event listener to prevent further changes
        gridItems[index].removeEventListener('click', gridItems[index].clickHandler);
        gridItems[index].style.cursor = 'default';
      };
      
      // Set the image source to start loading
      img.src = `images/Champions/${championName}Square.png`;
      preloader.appendChild(img);
      
    } else {
      gridItems[index].classList.add('incorrect');
      
      // Add a brief shake animation for incorrect answers
      gridItems[index].classList.add('shake');
      setTimeout(() => {
        gridItems[index].classList.remove('shake');
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
      item.style.backgroundImage = `url('images/Champions/${championName}Square.png')`;
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