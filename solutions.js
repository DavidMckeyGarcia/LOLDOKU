// Function to create the second grid if it doesn't exist yet
function createSecondGrid() {
    console.log('Creating second grid');
    
    // Check if the second grid already exists
    if (document.getElementById('second-grid-container')) {
        console.log('Second grid already exists');
        return;
    }
    
    // Get the dimensions and styling from the original grid
    const originalGrid = document.querySelector('.grid-container .grid');
    const originalGridStyle = window.getComputedStyle(originalGrid);
    const originalWidth = originalGridStyle.width;
    const originalMaxWidth = originalGridStyle.maxWidth;
    
    // Create elements for the second grid
    const secondGridTitle = document.createElement('h2');
    secondGridTitle.id = 'second-grid-title';
    secondGridTitle.textContent = 'SOLUTIONS GRID';
    secondGridTitle.style.textAlign = 'center';
    secondGridTitle.style.marginTop = '30px';
    secondGridTitle.style.display = 'none';
    
    // Create the container with the same class as the original
    const secondGridContainer = document.createElement('div');
    secondGridContainer.id = 'second-grid-container';
    secondGridContainer.className = 'grid-container'; // Same class as original
    secondGridContainer.style.display = 'none';
    secondGridContainer.style.marginTop = '20px';
    
    // Create a grid element with the same structure as your main grid
    const gridElement = document.createElement('div');
    gridElement.className = 'grid';
    
    // Apply the same width and max-width
    if (originalWidth) gridElement.style.width = originalWidth;
    if (originalMaxWidth) gridElement.style.maxWidth = originalMaxWidth;
    
    secondGridContainer.appendChild(gridElement);
    
    // Add header row (column headers)
    const headerTopLeft = document.createElement('div');
    headerTopLeft.className = 'grid-header';
    gridElement.appendChild(headerTopLeft);
    
    for (let i = 0; i < 3; i++) {
        const colHeader = document.createElement('div');
        colHeader.className = 'grid-header';
        gridElement.appendChild(colHeader);
    }
    
    // Empty cell for top right
    const headerTopRight = document.createElement('div');
    headerTopRight.className = 'grid-header';
    gridElement.appendChild(headerTopRight);
    
    // Create the 3x3 grid with row headers
    for (let row = 0; row < 3; row++) {
        // Row header
        const rowHeader = document.createElement('div');
        rowHeader.className = 'grid-header';
        gridElement.appendChild(rowHeader);
        
        // Three cells for this row
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridElement.appendChild(gridItem);
        }
        
        // Empty cell for row end
        const rowEnd = document.createElement('div');
        rowEnd.className = 'grid-header';
        gridElement.appendChild(rowEnd);
    }
    
    // Find the container to append to - try to find the closest parent of the original grid
    const mainGridContainer = document.querySelector('.grid-container');
    if (mainGridContainer && mainGridContainer.parentElement) {
        // Append to the parent of the original grid container
        mainGridContainer.parentElement.appendChild(secondGridTitle);
        mainGridContainer.parentElement.appendChild(secondGridContainer);
        console.log('Second grid added as sibling to first grid container');
    } else {
        // Fallback - append to body
        document.body.appendChild(secondGridTitle);
        document.body.appendChild(secondGridContainer);
        console.log('Second grid added to body (container not found)');
    }
}


function updateSecondGridContent() {
    // Array of possible solutions for each grid item
    const solutions = puzzleData.solutions

    // Get the second grid container
    const secondGridContainer = document.getElementById('second-grid-container');
    
    if (secondGridContainer) {
        // Get the grid element inside the container
        const gridElement = secondGridContainer.querySelector('.grid');
        
        // Get all the grid items (the cells in the grid, not the headers)
        const gridItems = gridElement.querySelectorAll('.grid-item');
        
        // Loop through the grid items and assign a random solution for each grid item
        gridItems.forEach((item, index) => {
            // Get the possible solutions for the current grid item
            const possibleSolutions = solutions[index];
            
            // Select a random solution from the current array of solutions
            const randomIndex = Math.floor(Math.random() * possibleSolutions.length);
            
            // Assign the randomly selected solution to the grid item
            const randomSolution = possibleSolutions[randomIndex].toLowerCase().replace(/\s+/g, '');
            gridItems[index].style.backgroundImage = `url('images/Champions/${randomSolution}Square.png')`;

        });
    } else {
        console.error('Second grid container not found');
    }
}


function revealSecondGrid() {
    console.log('Revealing second grid');
    
    // Get references to the second grid elements
    const secondGridTitle = document.getElementById('second-grid-title');
    const secondGridContainer = document.getElementById('second-grid-container');
    
    if (secondGridTitle && secondGridContainer) {
        // Show the title and container
        secondGridTitle.style.display = 'block';
        secondGridContainer.style.display = 'block';
        
        // Add a fade-in effect
        secondGridTitle.style.opacity = 0;
        secondGridContainer.style.opacity = 0;
        
        // Animate the opacity
        let opacity = 0;
        const fadeInterval = setInterval(() => {
            opacity += 0.1;
            secondGridTitle.style.opacity = opacity;
            secondGridContainer.style.opacity = opacity;
            
            if (opacity >= 1) {
                clearInterval(fadeInterval);
                console.log('Fade-in animation complete');
            }
        }, 50);
        
        console.log('Second grid revealed');
    } else {
        console.error('Could not find second grid elements');
    }
}