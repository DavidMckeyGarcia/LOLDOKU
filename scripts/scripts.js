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
    img.src = `images/Champions/${championName}Square.png`;
    preloadContainer.appendChild(img);
  });

  console.log('Champion Images Preloaded');
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



