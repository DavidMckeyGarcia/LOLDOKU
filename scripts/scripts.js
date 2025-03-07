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


/*
function preloadImages() {
  // Create hidden container for preloaded images
  const preloadContainer = document.createElement('div');
  preloadContainer.style.display = 'none';
  document.body.appendChild(preloadContainer);

  // Preload header images
  const headerImages = [
    'Adc',
    'jungle',
    'mid',
    'support',
    'top',
    'arcane',
    'ascended',
    'bandle city',
    'bilgewater',
    'blink',
    'blood moon',
    'celestial',
    'cosmic',
    'coven',
    'dark star',
    'darkin',
    'dash',
    'demacia',
    'elderwood',
    'empyrean',
    'execute',
    'fear',
    'festive',
    'freljord',
    'fright night',
    'global',
    'hextech',
    'high noon',
    'immunity',
    'infinite',
    'invis',
    'invulrenability',
    'ionia',
    'ixtal',
    'jungle',
    'knock-up',
    'legacy',
    'life steal',
    'manaless',
    'not played',
    'noxus',
    'og40',
    'piltover',
    'pool party',
    'prestige',
    'project',
    'riot records',
    'root',
    'season 2-6',
    'season 7+',
    'shadow isles',
    'shield',
    'shred',
    'shurima',
    'silence',
    'slow',
    'space groove',
    'star guardian',
    'stun',
    'support',
    'targon',
    'tether',
    'the void',
    'true damage',
    'ult reset',
    'unstoppable',
    'vastayan',
    'worlds',
    'yordle',
    'zaun',
  ];

  headerImages.forEach(imageName => {
    const img = new Image();
    img.src = `images/headers/${imageName}.webp`;
    preloadContainer.appendChild(img);
  });

  
  // Preload each champion image
  searchable.forEach(champion => {
    const img = new Image();
    const championName = champion.toLowerCase().replace(/\s+/g, '');
    img.src = `images/Champions/${championName}Square.webp`;
    preloadContainer.appendChild(img);
  });
  
  console.log('Champion, Header, and Tooltip Images Preloaded');
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




// NEW loadData function to load a random puzzle file

function loadData(numPuzzles = 300) {
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



