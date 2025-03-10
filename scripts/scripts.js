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
  'Khazix',
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


//DAILY PUZZLE LOADER

// Global variable to track the countdown timer
let countdownInterval;

function loadData(numPuzzles = 100) {
  // Get current date
  const currentDate = new Date();
  const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  
  // Start countdown timer to next puzzle
  // Note: We're not starting it here anymore, we'll start it when needed
  
  // Check if we need to reset the game for a new day
  const lastPlayedDate = localStorage.getItem('lastPlayedDate');
  if (lastPlayedDate !== dateString) {
    // New day, new puzzle - clear previous game state
    resetGame();
    clearSavedGame();
    // Store today's date
    localStorage.setItem('lastPlayedDate', dateString);
  }

  // Rest of your loadData function...
}

// Function to start countdown timer to next puzzle
function startCountdownTimer() {
  // Clear any existing interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  
  // Update the timer immediately
  updateCountdownTimer();
  
  // Set interval to update every second
  countdownInterval = setInterval(updateCountdownTimer, 1000);
}

// Function to calculate and display time until next puzzle
function updateCountdownTimer() {
  // Get current date and time
  const now = new Date();
  
  // Calculate the next day at midnight
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  // Calculate time difference in milliseconds
  const timeDiff = tomorrow - now;
  
  // Convert to hours, minutes, seconds
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  // Format the time string with leading zeros
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Update the countdown display
  const countdownElement = document.getElementById('countdown-timer');
  if (countdownElement) {
    countdownElement.textContent = `${timeString}`;
  }
  
  // If we've reached the next day, reload the page to get the new puzzle
  if (timeDiff <= 0) {
    clearInterval(countdownInterval);
    location.reload();
  }
}

// Update checkGameStatus to start the timer when win modal is shown
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
            // Start the countdown timer when showing the win modal
            startCountdownTimer();
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

// Update the event listener for the win modal to stop the timer when closed
window.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Win Modal
    const continueWinBtn = document.getElementById('continue-win-btn');
    const winModal = document.getElementById('win-modal');
    
    if (continueWinBtn) {
        continueWinBtn.addEventListener('click', function() {
            // Hide the modal
            if (winModal) {
                winModal.style.display = 'none';
                
                // Stop the timer when closing the modal
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                }
            }
        });
    }
})

//load a random puzzle file 
/*
function loadData(numPuzzles = 100) {
  resetGame(); // DELETE FOR LOCAL STORAGE MEMORY
  clearSavedGame(); //DELETE FOR LOCAL STORAGE MEMORY

  // Dynamically generate puzzle file paths based on the number of puzzles
  const puzzleFiles = Array.from(
    { length: numPuzzles }, 
    (_, i) => `puzzle_data/puzzle_${i + 1}.json`
  );

  // Select a random puzzle file
  const randomPuzzleFile = puzzleFiles[Math.floor(Math.random() * puzzleFiles.length)];

  // Fetch the selected random puzzle file
  fetch(randomPuzzleFile)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Store all data in our global variable
      puzzleData = data;
      
      // Update headers using the cached data
      updateHeaders(puzzleData);

      console.log(randomPuzzleFile)

      // Load game state after data is available
      loadGameState();
      
      // Initialize the grid with the loaded state
      initializeGrid();

      // INITIQ
      createSecondGrid();
      updateSecondGridContent();
    })
    .catch(error => {
      console.error('Error loading random puzzle JSON:', error);
      
      // Fallback to default puzzle_data.json if everything else fails
      fetch('puzzle_data.json')
        .then(response => response.json())
        .then(data => {
          puzzleData = data;
          updateHeaders(puzzleData);
          loadGameState();
          initializeGrid();
          createSecondGrid();
          updateSecondGridContent();
        })
        .catch(fallbackError => {
          console.error('Fallback to default puzzle file also failed:', fallbackError);
        });
    });

    console.log('Ran LoadData');
  }
*/

document.addEventListener('DOMContentLoaded', function() {
  // Get references to all needed elements
  const welcomeModal = document.getElementById('welcomeModal');
  const startButton = document.getElementById('startButton');
  const helpButton = document.getElementById('helpButton');
  
  // Check if user has visited before
  const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
  
  // If this is the first visit, show the modal
  if (!hasVisitedBefore) {
    welcomeModal.style.display = 'flex';
    // Set the flag in localStorage to remember this user has visited
    localStorage.setItem('hasVisitedBefore', 'true');
    console.log("Modal shown for first-time visit");
  }
  
  // Add click event to help button to open modal
  if (helpButton) {
    helpButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      openWelcomeModal();
    });
    console.log("Help button event listener added");
  }
  
  // Close modal when Start button is clicked
  if (startButton) {
    startButton.addEventListener('click', function() {
      closeWelcomeModal();
    });
    console.log("Start button event listener added");
  }

  // Close modal when clicking outside the modal content
  welcomeModal.addEventListener('click', function(event) {
    // If the click is on the modal background (not the content)
    if (event.target === welcomeModal) {
      closeWelcomeModal();
    }
  });
  
  // Function to open the modal
  function openWelcomeModal() {
    welcomeModal.style.display = 'flex';
    console.log("Modal opened via help button");
  }
  
  // Function to close the modal with animation
  function closeWelcomeModal() {
    welcomeModal.classList.add('closing');
    console.log("Closing animation started");
    
    setTimeout(function() {
      welcomeModal.style.display = 'none';
      welcomeModal.classList.remove('closing');
      console.log("Modal closed");
    }, 150); // Match the animation duration
  }
});



