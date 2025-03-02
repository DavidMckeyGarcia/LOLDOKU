// Add this function to create and initially hide the second grid
function createSecondGrid() {
    console.log('Starting createSecondGrid function');

    // Check if second grid already exists
    if (document.getElementById('grid-container-2')) return;
    
    // Create container for the second grid
    const secondGridContainer = document.createElement('div');
    secondGridContainer.id = 'grid-container-2';
    secondGridContainer.className = 'grid-container';
    secondGridContainer.style.display = 'none'; // Initially hidden
    secondGridContainer.style.marginTop = '30px'; // Space between grids

    console.log('Second grid container created');
    
    // Create title for the second grid
    const gridTitle = document.createElement('h2');
    gridTitle.textContent = 'Bonus Content';
    gridTitle.style.textAlign = 'center';
    
    // Add the grid items
    for (let i = 0; i < 9; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.textContent = `Bonus ${i + 1}`;
        // You can add your specific content or functionality for each grid item here
        
        secondGridContainer.appendChild(gridItem);
    }
    
    console.log('Grid items added to second grid');

    // Add the title and grid to the main container
    const mainContainer = document.querySelector('.container') || document.body;
    mainContainer.appendChild(gridTitle);
    mainContainer.appendChild(secondGridContainer);
    
    console.log('Second grid created and hidden');
}



// Function to reveal the second grid
function revealSecondGrid() {
    console.log('Starting revealSecondGrid function');
    
    // Check for the existing grid
    let secondGrid = document.getElementById('grid-container-2');
    let gridTitle = document.getElementById('grid-2-title');
    
    // If second grid doesn't exist yet, create it
    if (!secondGrid) {
        console.log('Second grid not found, creating it now');
        createSecondGrid();
        
        // Get references again after creation
        secondGrid = document.getElementById('grid-container-2');
        gridTitle = document.getElementById('grid-2-title');
    } else {
        console.log('Second grid found, will reveal it');
    }
    
    // Make sure we have references before proceeding
    if (!secondGrid || !gridTitle) {
        console.error('Failed to find or create second grid elements');
        return;
    }
    
    // Show the title
    gridTitle.style.display = 'block';
    
    // Show the second grid with a fade-in effect
    secondGrid.style.opacity = '0';
    secondGrid.style.display = 'grid';
    
    console.log('Beginning fade-in animation for second grid');
    
    // Apply fade-in animation
    let opacity = 0;
    const fadeIn = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(fadeIn);
            console.log('Fade-in animation complete');
        } else {
            opacity += 0.1;
            secondGrid.style.opacity = opacity;
        }
    }, 50);
}

// Initialize game and create the second grid (but keep it hidden)
window.addEventListener('load', () => {
    console.log('Page loaded, initializing game');
    
    // Load game data
    if (typeof loadData === 'function') {
        loadData(); // This will also load the game state and initialize the grid
        console.log('Game data loaded');
    } else {
        console.error('loadData function not found');
    }
    
    setTimeout(() => {
        console.log('Running delayed initialization');
        
        if (typeof preloadChampionImages === 'function') {
            preloadChampionImages();
            console.log('Champion images preloaded');
        } else {
            console.warn('preloadChampionImages function not found');
        }
            createSecondGrid(); // Create but don't show the second grid
        
        console.log('Delayed initialization complete');
    }, 1000); // Delay by 1 second to prioritize initial page render
});