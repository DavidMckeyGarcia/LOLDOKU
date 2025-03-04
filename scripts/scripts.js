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


function preloadChampionImages() {
  // Create hidden container for preloaded images
  const preloadContainer = document.createElement('div');
  preloadContainer.style.display = 'none';
  document.body.appendChild(preloadContainer);
  
  // Preload each champion image
  searchable.forEach(champion => {
    const img = new Image();
    const championName = champion.toLowerCase().replace(/\s+/g, '');
    img.src = `images/Champions/${championName}Square.webp`;
    preloadContainer.appendChild(img);
  });

   // Preload header images
   const headerImages = [
    'Adc.png',
    'jungle.png',
    'mid.png',
    'support.png',
    'top.png',
    'arcane.png',
    'ascended.png',
    'bandle city.png',
    'bilgewater.png',
    'blink.png',
    'blood moon.png',
    'celestial.png',
    'cosmic.png',
    'coven.png',
    'dark star',
    'darkin.png',
    'dash.png',
    'demacia.png',
    'elderwood.png',
    'empyrean.png',
    'execute.png',
    'fear.png',
    'festive.png',
    'freljord.png',
    'fright night.png',
    'global.png',
    'hextech.png',
    'high noon.png',
    'immunity.png',
    'infinite.png',
    'invis.png',
    'invulrenability.png',
    'ionia.png',
    'ixtal.png',
    'jungle.png',
    'knock-up.png',
    'legacy.png',
    'life steal.png',
    'manaless.png',
    'not played.png',
    'noxus.png',
    'og40.png',
    'piltover.png',
    'pool party.png',
    'prestige.png',
    'project.png',
    'riot record.png',
    'root.png',
    'season 2-6.png',
    'season 7+.png',
    'shadow isles.png',
    'shield.png',
    'shred.png',
    'shurima.png',
    'silence.png',
    'slow.png',
    'space groove.png',
    'spirit blossom.png',
    'star guardian.png',
    'stun.png',
    'support.png',
    'targon.png',
    'tether.png',
    'the void.png',
    'true damage.png',
    'ult reset.png',
    'unstoppable.png',
    'vastayan.png',
    'victorious.png',
    'worlds.png',
    'yordle.png',
    'zaun.png',
  ];

  headerImages.forEach(imageName => {
    const img = new Image();
    img.src = `images/headers/${imageName}`;
    preloadContainer.appendChild(img);
  });

  /* Preload tooltip images
  const tooltipImages = [
    'ability-tooltip-bg.png',
    'item-tooltip-frame.png',
    'rune-tooltip-icon.png',
    // Add more tooltip image filenames here
  ];

  tooltipImages.forEach(imageName => {
    const img = new Image();
    img.src = `images/tooltips/${imageName}`;
    preloadContainer.appendChild(img);
  }); */

  console.log('Champion, Header, and Tooltip Images Preloaded');
}




// NEW loadData function to load a random puzzle file
function loadData(numPuzzles = 1000) {
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
}





/*
// old loadData function to cache all data
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
    })
    .catch(error => console.error('Error loading JSON data:', error));
}

*/



