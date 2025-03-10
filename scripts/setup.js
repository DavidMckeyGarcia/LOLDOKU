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
function loadData(numPuzzles = 1000) {
  // Get current date
  const currentDate = new Date();
  const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    
  // Check if we need to reset the game for a new day
  const lastPlayedDate = localStorage.getItem('lastPlayedDate');
  if (lastPlayedDate !== dateString) {
    // New day, new puzzle - clear previous game state
    resetGame();
    clearSavedGame();
    // Store today's date
    localStorage.setItem('lastPlayedDate', dateString);
  }
  
  // Use the date to deterministically select a puzzle
  // This ensures the same puzzle is shown on the same date for all users
  // Get a numeric hash from the date string
  let dateHash = 0;
  for (let i = 0; i < dateString.length; i++) {
    dateHash = ((dateHash << 5) - dateHash) + dateString.charCodeAt(i);
    dateHash = dateHash & dateHash; // Convert to 32bit integer
  }
    
  // Make sure the hash is positive and within the range of available puzzles
  dateHash = Math.abs(dateHash) % numPuzzles;
    
  // Get the puzzle file for today
  const todaysPuzzleFile = `puzzle_data/puzzle_${dateHash + 1}.json`;
    
  console.log(`Today's puzzle: ${todaysPuzzleFile}`);
  
  // Fetch today's puzzle file
  fetch(todaysPuzzleFile)
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

      // Load game state after data is available
      loadGameState();
        
      // Initialize the grid with the loaded state
      initializeGrid();
  
      createSecondGrid();
      updateSecondGridContent();
    })
    .catch(error => {
      console.error('Error loading daily puzzle JSON:', error);
        
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



