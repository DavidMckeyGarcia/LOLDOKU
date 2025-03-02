import numpy as np
import random
import json
import os
import matplotlib.pyplot as plt


with open(r'C:\Users\s2749919\Scripts\JavaTest\champs.json', 'r') as file:
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
    "kit": [["dash"], ["true damage"], ["shield"],  ["execute"], ["global"], ["stealth"], ["blink"], ["life steal"] ],

    "skinlines": [["pool party"], ["worlds"], ["arcade"], ["prestige"], ["coven"], 
                  ["elderwood"], ["PROJECT"], ["cosmic"], ["dark star"], ["hextech"],
                  ["Fright Night"], ["empyrean"], ["Space Groove"] ]
                                                                                                    
}


cat3 = {

    "misc": [["manaless"], ["infinite"], ["arcane"], ["ult reset"],  ["riot records"], ["Immunity"], ["100% AP Ratio"], ["tether"], ["shred"]],

    "race": [ ["celestial"], ["yordle"], ["ascended"], ["vastayan"], ["darkin"]],
    
    "release date": [["OG40"], ["Season 7+"], ["Season 2-6"]],

    #esports related e.g played in worlds final
    "esports": ["not played"]
    #champs with >200 worlds pick/bans =13
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
    num_sol = [None]*len(puzzle)
    for i in range(len(puzzle_solutions)):
        num_sol[i] = len(puzzle_solutions[i])
    
    num_sol.sort()

    ones = num_sol.count(1)
    threes = sum(1 for x in num_sol if x < 3)
    eights = sum(1 for x in num_sol if x < 8)
    tens = sum(1 for x in num_sol if x <10)
    twenties = sum(1 for x in num_sol if x <30)
    counts = [ones, threes, eights, tens, twenties]
    total = sum(counts)

    # Assign a category based on the range of the number
    if total < 16:
        diff = 'iron'
    elif total < 19:
        diff = 'bronze'
    elif total < 22:
        diff = 'silver'
    elif total < 25:
        diff = 'gold'
    elif total < 28:
        diff = 'platinum'
    elif total <32:
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


'''
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

