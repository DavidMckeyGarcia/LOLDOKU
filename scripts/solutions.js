// Function to initialize the second grid
function initializeSecondGrid() {
    console.log('Initializing second grid');
    
    // Get the dimensions and styling from the original grid
    const originalGrid = document.querySelector('.grid-container .grid');
    const originalGridStyle = window.getComputedStyle(originalGrid);
    
    // Get the second grid
    const secondGrid = document.querySelector('#second-grid-container .grid');
    
    // Apply the same dimensions as the original grid
    if (originalGridStyle.width) secondGrid.style.width = originalGridStyle.width;
    if (originalGridStyle.maxWidth) secondGrid.style.maxWidth = originalGridStyle.maxWidth;
    
    console.log('Second grid initialized');

    // Select all grid items in the second grid
    const gridItems = document.querySelectorAll('#second-grid-container .grid-item');
  
    gridItems.forEach((item) => {
        // Retrieve the solution index from the data attribute
        const solutionIndex = item.getAttribute('data-solution-index');
        
        // Create the click handler function
        const clickHandler = function() {
            openSolutionsModal(solutionIndex); // Pass the solution index to the modal
            console.log(`2nd Grid item with index ${solutionIndex} clicked`);
        };
        
        // Add the click event listener
        item.addEventListener('click', clickHandler);
    });
}

// Function to update the second grid content with solutions
function updateSecondGridContent() {
    console.log('Updating second grid content');
    
    // Array of possible solutions for each grid item
    const solutions = puzzleData.solutions;

    // Get all grid items in the second grid
    const gridItems = document.querySelectorAll('#second-grid-container .grid-item');
    
    if (gridItems.length > 0) {
        // Loop through grid items and assign a random solution for each
        gridItems.forEach((item, index) => {
            // Get the possible solutions for the current grid item
            const possibleSolutions = solutions[index];
            
            // Select a random solution from the possible solutions
            const randomIndex = Math.floor(Math.random() * possibleSolutions.length);
            
            // Format the solution string and set as background image
            const randomSolution = possibleSolutions[randomIndex].toLowerCase().replace(/\s+/g, '');
            item.style.backgroundImage = `url('images/Champions/${randomSolution}Square.png')`;
        });
        
        console.log('Second grid content updated successfully');
    } else {
        console.error('No grid items found in the second grid');
    }
}

// Function to reveal the second grid with animation
function revealSecondGrid() {
    console.log('Revealing second grid');
    
    // Get the second grid elements
    const secondGridTitle = document.getElementById('second-grid-title');
    const secondGridContainer = document.getElementById('second-grid-container');
    const solutionsContainer = document.getElementById('solutions-container');
    const statsBox = document.getElementById('stats-box');
    
    if (secondGridTitle && secondGridContainer) {
        // Make sure the content is updated before showing
        updateSecondGridContent();
        
        // Show the elements (but still with opacity 0)
        secondGridTitle.style.display = 'block';
        secondGridContainer.style.display = 'block';

        secondGridTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add a small delay to ensure display change is applied
        setTimeout(() => {
            // Add the visible class to trigger the CSS transition
            secondGridTitle.classList.add('visible');
            statsBox.classList.add('visible');
            secondGridContainer.classList.add('visible');
            solutionsContainer.classList.add('visible');
            console.log('Second grid revealed');
        }, 10);
    } else {
        console.error('Could not find second grid elements');
    }
}

// Replace createSecondGrid function with initialization
function createSecondGrid() {
    // This function now just initializes the pre-existing grid
    initializeSecondGrid();
}


// Generic modal closing function
function closeModalG(modalId) {
    const modal = document.getElementById(modalId);
    
    if (!modal) {
        console.error(`Modal with id ${modalId} not found`);
        return;
    }

    // Add closing class to trigger animation
    modal.classList.add('closing');

    // Remove display and closing class after animation completes
    setTimeout(() => {
        modal.classList.remove('closing');
        modal.style.display = 'none';
    }, 150); // Match this to your CSS animation duration
}


function openSolutionsModal(index) {
    const modal = document.getElementById('solutions-modal');
    
    // Show the modal
    modal.style.display = 'flex';
    
    // Populate modal with solutions
    updateSolutionsModal(index);
    updateSolutionsModalh2(index);

    // Create a function to handle closing
    const handleClose = (event) => {
        // Check if the click target is the modal itself (background area)
        if (event.target === modal) {
            closeModalG('solutions-modal');
            
            // Remove the event listener after closing to prevent multiple listeners
            modal.removeEventListener('click', handleClose);
        }
    };

    // Add click event listener to the modal
    modal.addEventListener('click', handleClose);
}


function updateSolutionsModal(index) {
    const solutionsList = document.getElementById('solutions-dropdown');
    const solutions = puzzleData.solutions[index];  // Assuming puzzleData contains a solutions array
    
    // Clear previous solutions (in case the modal was opened previously)
    solutionsList.innerHTML = '';

    // Ensure that solutions exist for the given index
    if (solutions && solutions.length > 0) {
        solutions.forEach(solution => {
            const li = document.createElement('li');
            
            // Create an image element for the champion
            const img = document.createElement('img');
            const championName = solution.toLowerCase().replace(/\s+/g, '');
            img.src = `images/Champions/${championName}Square.png`;
            img.alt = solution;
            img.style.width = '30px';  // Restore previous image size
            img.style.height = '30px';
            img.style.marginRight = '10px';

            // Create an anchor element for the wiki link
            const link = document.createElement('a');
            // Capitalize each word and replace spaces with underscores
            const urlChampionName = solution.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('_');
            link.href = `https://wiki.leagueoflegends.com/en-us/${urlChampionName}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.style.display = 'flex';
            link.style.alignItems = 'center';
            link.style.width = '100%';
            link.style.textDecoration = 'none';  // Remove blue underline

            // Create a span for the solution name
            const textSpan = document.createElement('span');
            textSpan.textContent = solution;
            textSpan.classList.add('solution-name');
            textSpan.style.textDecoration = 'none';  // Ensure no underline

            // Create a span for the pick percentage
            const percentSpan = document.createElement('span');
            percentSpan.textContent = `${champPickPercentage[solution] || 0}%`;
            percentSpan.classList.add('pick-percentage');
            percentSpan.style.marginLeft = 'auto';
            percentSpan.style.color = '#C89B3C';
            percentSpan.style.textDecoration = 'none';  // Ensure no underline

            // Append image, text, and percentage to the link
            link.appendChild(img);
            link.appendChild(textSpan);
            link.appendChild(percentSpan);

            // Append the link to the list item
            li.appendChild(link);

            solutionsList.appendChild(li);
        });
        
    } else {
        const noSolutionItem = document.createElement('li');
        noSolutionItem.textContent = "No solutions available";
        solutionsList.appendChild(noSolutionItem);
    }
}


function updateSolutionsModalh2(index) {
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
      const modalHeader = document.getElementById('solutions-modal-cats');
      
      // Update the h2 text content with row and col values
      modalHeader.textContent = `${rowValue} / ${colValue}`;
    } else {
      console.error('Index is out of bounds!', { index, rowIndex, colIndex });
    }
}
  



// CALCULATES THE PERCENTAGE OF PICKS//
const champPickPercentage = {
    "Aatrox": 15.5,
    "Yasuo": 22.3,
    "Lux": 10.2,
    // Add more champions and their pick percentages
};




