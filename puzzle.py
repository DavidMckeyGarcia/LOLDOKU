import random
import json
import os
#import matplotlib.pyplot as plt
#import numpy as np

with open(r'champs.json', 'r') as file:
    champion_data = json.load(file)

def get_champions_by_constraints(constraints, champion_data):
    champions = []
    
    # Iterate over all champions in the data
    for champion, data in champion_data.items():
        match = True
        
        # Check each constraint (role, region, etc.)
        for key, values in constraints.items():
            if key in data:
                # Check if the champion satisfies the constraint
                if isinstance(values, list):
                    # For lists (e.g., roles or region), check if there's any match
                    if not any(value in data[key] for value in values):
                        match = False
                        break
                else:
                    # For single values, check for an exact match
                    if data[key] != values:
                        match = False
                        break
            else:
                # If the key is not in the champion's data, it's an invalid constraint
                match = False
                break

        # If all constraints are satisfied, add the champion to the result list
        if match:
            champions.append(champion)
    
    return champions

#Categories
cat0 = {
    "role": [["Adc"], ["Support"] ,["Mid"], ["Jungle"], ["Top"]],
    
    }


cat1 = {
    "region": [["Bandle City"], ["Bilgewater"], ["Demacia"], ["Ionia"], ["Ixtal"], 
               ["Noxus"], ["Piltover"], ["Shadow Isles"], ["Shurima"], ["Targon"], 
               ["Freljord"], ["The Void"], ["Zaun"]],

    "crowd control": [["slow"], ["stun"], ["root"], ["silence"], ["fear"], ["knock-up"]]

}


cat2 = {
    "kit": [["dash"], ["true damage"], ["shield"],  ["ult execute"], ["global ult"], ["invis"], ["blink"], ["life steal"], ["evolves"] ],

    "skinlines": [["pool party"], ["worlds skin"], ["arcade"], ["prestige"], ["coven"], 
                  ["elderwood"], ["PROJECT"], ["cosmic"], ["dark star"], ["hextech"],
                  ["Fright Night"], ["empyrean"], ["Space Groove"] ],

    "release date": [["OG40"], ["Season 7+"], ["before s7"]],
                                                                                                    
}

cat2_weights = {
    "kit": 0.5,  # Higher weight, more likely to be chosen
    "skinlines": 0.25,  # Lower weight, less likely to be chosen
    "release date": 0.25,  # Medium weight
}


cat3 = {

    "misc": [["manaless"], ["inf scaling"], ["arcane"], ["ult reset"],  ["riot records"], ["100% AP Ratio"], ["tether"], ["shred"]], #["Immunity"]

    "race": [ ["celestial"], ["yordle"], ["ascended"], ["vastayan"], ["darkin"]],

    "esports": [["never played"], ["0 games"], ["100+ games"], ["30+ wins"], ["pentakill"]]
}


#creates a random puzzle
def puzzle_generator():
    #randomly sample from categories to form rows and columns of puzzle
    c0 = random.sample(list(cat0.keys()), 1)
    c0_vals = {constraint: random.choice(cat0[constraint]) for constraint in c0}

    c1 = random.sample(list(cat1.keys()), 2)
    c1_vals = {constraint: random.choice(cat1[constraint]) for constraint in c1}
    c1_1 = {k: v for k, v in list(c1_vals.items())[:1]}  
    c1_2 = {k: v for k, v in list(c1_vals.items())[1:]}  

    c2 = random.sample(list(cat2.keys()), 2)
    c2_vals = {constraint: random.choice(cat2[constraint]) for constraint in c2}
    c2_1 = {k: v for k, v in list(c2_vals.items())[:1]}  
    c2_2 = {k: v for k, v in list(c2_vals.items())[1:]} 

    c3 = random.sample(list(cat3.keys()), 1)
    c3_vals = {constraint: random.choice(cat3[constraint]) for constraint in c3}

    x1 =  {**c0_vals, **c1_1}

    x2 = {**c0_vals, **c1_2}

    x3 = {**c0_vals, **c3_vals}

    x4 =  {**c2_1, **c1_1}

    x5 = {**c2_1, **c1_2}

    x6 = {**c2_1, **c3_vals}

    x7 =  {**c2_2, **c1_1}

    x8 = {**c2_2, **c1_2}

    x9 = {**c2_2, **c3_vals}
    
    grid_questions = [x1,x2,x3,x4,x5,x6,x7,x8,x9]
    return grid_questions


#finds solutions to given puzzle
def puzzle_solutions(puzzle):
    sol = [None]*len(puzzle)
    for i in range (len(puzzle)):
        sol[i] = get_champions_by_constraints(puzzle[i], champion_data)
    return sol


#Returns True if all sublists are non-empty, otherwise False
def puzzle_checker(sols):
    return all(sols)  

#assign a difficulty to a given puzzle
def puzzle_difficulty(puzzle_solutions):
    num_sol = [None]*len(puzzle_solutions)
    for i in range(len(puzzle_solutions)):
        num_sol[i] = len(puzzle_solutions[i])
    
    num_sol.sort()

    ones = num_sol.count(1)
    threes = sum(1 for x in num_sol if x < 3)
    eights = sum(1 for x in num_sol if x < 8)
    tens = sum(1 for x in num_sol if x <10)
    twenties = sum(1 for x in num_sol if x <20)
    counts = [ones, threes, eights, tens, twenties]
    total = sum(counts)

    # Assign a category based on the range of the number
    if total < 16:
        diff = 'iron'
    elif total < 21:
        diff = 'bronze'
    elif total < 23:
        diff = 'silver'
    elif total < 25:
        diff = 'gold'
    elif total < 27:
        diff = 'platinum'
    elif total < 30:
        diff = 'emerald'
    elif total <33:
        diff = 'diamond'
    else:
        diff = 'challenger'

    return diff

#Creates a random solvable puzzle
def create_puzzle():
    puzzle = puzzle_generator()
    sols = puzzle_solutions(puzzle)
    while puzzle_checker(sols) == False:
        puzzle = puzzle_generator()
        sols = puzzle_solutions(puzzle)
    return puzzle


def create_dif(difficulty = 'challenger'):
    puzzle = create_puzzle()
    if puzzle_difficulty(puzzle) != difficulty:
        create_dif()
    return puzzle


diffs = []

def create_multiple_puzzle_json_files(num_puzzles=5, output_folder="puzzle_data"):
    """
    Generate multiple puzzle JSON files in a specified folder.
    
    Args:
    num_puzzles (int): Number of puzzle JSON files to create (default is 5)
    output_folder (str): Name of the folder to store puzzle JSON files (default is "puzzle_data")
    """
    # Get the current working directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Create full path for the output folder
    output_path = os.path.join(script_dir, output_folder)
    
    # Create the output folder if it doesn't exist
    os.makedirs(output_path, exist_ok=True)
    
    # Generate and save multiple puzzles
    for i in range(num_puzzles):
        # Generate a new random solvable puzzle
        #puzzle = create_puzzle()
        puzzle = create_puzzle_with_unique_solution()
        
        grid_solutions = puzzle_solutions(puzzle)
        diffs.append(puzzle_difficulty(grid_solutions))
        
        # Extract row and column headers
        r1,c1 = puzzle[0].values()
        r2,c2 = puzzle[4].values()
        r3,c3 = puzzle[8].values()
        
        # ROW and COL headers
        rows, cols = [r1[0], r2[0], r3[0]], [c1[0], c2[0], c3[0]]
        
        # Calculate difficulty
        difficulty = puzzle_difficulty(grid_solutions)
        
        # Create a dictionary to store puzzle data
        game_data = {
            'difficulty': difficulty,
            'rows': rows,
            'cols': cols,
            'solutions': grid_solutions
        }
        
        # Create filename for each puzzle
        filename = f"puzzle_{i+1}.json"
        file_path = os.path.join(output_path, filename)
        
        # Write the puzzle data to a JSON file
        with open(file_path, 'w') as json_file:
            json.dump(game_data, json_file, indent=4)
        
        print(f"Created JSON file: {filename}")
    
    print(f"Successfully created {num_puzzles} puzzle JSON files in '{output_folder}' folder!")



#PUZZLES WITH 9 UNIQUE SOLUTIONS
def has_unique_solution(solutions):
    """Check if there exists at least one way to choose 9 unique champions
    that satisfy the constraints of all 9 squares."""
    
    def backtrack(index, used_champions):
        # If we've successfully assigned champions to all squares
        if index == len(solutions):
            return True
            
        # Try each champion that satisfies the current square
        for champion in solutions[index]:
            if champion not in used_champions:
                # Use this champion
                used_champions.add(champion)
                # Recursively try to fill the rest of the squares
                if backtrack(index + 1, used_champions):
                    return True
                # Backtrack
                used_champions.remove(champion)
                
        # If no valid assignment was found
        return False
    
    # Start backtracking from the first square with an empty set of used champions
    return backtrack(0, set())

def create_puzzle_with_unique_solution():
    """Creates a puzzle that can be solved with 9 unique champions."""
    max_attempts = 1000  # Limit to prevent infinite loops
    attempts = 0
    
    while attempts < max_attempts:
        attempts += 1
        puzzle = create_puzzle()
        sols = puzzle_solutions(puzzle)
        
        # Check if all squares have at least one champion
        if all(sols):
            # Check if there's a way to fill all squares with unique champions
            if has_unique_solution(sols):
                return puzzle #, sols, puzzle_difficulty(sols)
    
    
    # If we couldn't find a valid puzzle after max attempts
    raise Exception(f"Could not generate a valid puzzle after {max_attempts} attempts")


create_multiple_puzzle_json_files(num_puzzles=365)
print(diffs.count('iron'))
print(diffs.count('bronze'))
print(diffs.count('silver'))
print(diffs.count('gold'))
print(diffs.count('platinum'))
print(diffs.count('emerald'))
print(diffs.count('diamond'))
print(diffs.count('challenger'))



'''
#GENERATES A RANDOM SOLVABLE PUZZLE
puzzle = create_puzzle()
grid_solutions = puzzle_solutions(puzzle)
grid_categories = [sum(dic.values(), []) for dic in puzzle]
#rows and column headers
r1,c1 = puzzle[0].values()
r2,c2 = puzzle[4].values()
r3,c3 = puzzle[8].values()
#ROW and COL headers
rows, cols = [r1[0], r2[0], r3[0]], [c1[0], c2[0], c3[0]]
difficulty = puzzle_difficulty(grid_solutions)


def create_json_file(difficulty, rows, cols, solutions, output_file="puzzle_data.json"):
    # Get the current working directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Join the script directory with the output file name to create the full file path
    output_path = os.path.join(script_dir, output_file)
    
    # Create a dictionary to store both lists
    game_data = {
        'difficulty': difficulty,
        'rows': rows,
        'cols': cols,
        'solutions': solutions
    }

    # Write the dictionary to a JSON file in the same directory as the script
    with open(output_path, 'w') as json_file:
        json.dump(game_data, json_file, indent=4)

    print(f"JSON file '{output_path}' has been created successfully!")


create_json_file(difficulty, rows, cols, grid_solutions)



def sol_data(iter):
    totals = [None]*iter
    for i in range(iter):
        xsol = puzzle_solutions(create_puzzle())
        totals[i] = difficulty(xsol)
    return totals


rank_data = sol_data(365)

rank_order = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'challenger']

# Create a dictionary to map ranks to their order
rank_order_dict = {rank: index for index, rank in enumerate(rank_order)}

# Sort the data based on the rank order
sorted_data = sorted(rank_data, key=lambda x: rank_order_dict.get(x, len(rank_order)))



plt.hist(sorted_data, bins=7, edgecolor='black') 
plt.title('Distribution of rank')
plt.xlabel('Difficulty')
plt.ylabel('Frequency')
plt.show()
'''





























'''
#GENERATES A RANDOM SOLVABLE PUZZLE
puzzle = create_puzzle()
grid_solutions = puzzle_solutions(puzzle)
grid_categories = [sum(dic.values(), []) for dic in puzzle]
#rows and column headers
r1,c1 = puzzle[0].values()
r2,c2 = puzzle[4].values()
r3,c3 = puzzle[8].values()
#ROW and COL headers
rows, cols = [r1[0], r2[0], r3[0]], [c1[0], c2[0], c3[0]]
difficulty = puzzle_difficulty(grid_solutions)


def create_json_file(difficulty, rows, cols, solutions, output_file="puzzle_data.json"):
    # Get the current working directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Join the script directory with the output file name to create the full file path
    output_path = os.path.join(script_dir, output_file)
    
    # Create a dictionary to store both lists
    game_data = {
        'difficulty': difficulty,
        'rows': rows,
        'cols': cols,
        'solutions': solutions
    }

    # Write the dictionary to a JSON file in the same directory as the script
    with open(output_path, 'w') as json_file:
        json.dump(game_data, json_file, indent=4)

    print(f"JSON file '{output_path}' has been created successfully!")


create_json_file(difficulty, rows, cols, grid_solutions)



def sol_data(iter):
    totals = [None]*iter
    for i in range(iter):
        xsol = puzzle_solutions(create_puzzle())
        totals[i] = difficulty(xsol)
    return totals


rank_data = sol_data(365)

rank_order = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'challenger']

# Create a dictionary to map ranks to their order
rank_order_dict = {rank: index for index, rank in enumerate(rank_order)}

# Sort the data based on the rank order
sorted_data = sorted(rank_data, key=lambda x: rank_order_dict.get(x, len(rank_order)))



plt.hist(sorted_data, bins=7, edgecolor='black') 
plt.title('Distribution of rank')
plt.xlabel('Difficulty')
plt.ylabel('Frequency')
plt.show()
'''