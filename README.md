# aoc

A simple Node.js project written in Typescript, to work on coding challenges from Advent of Code. 

The app is really just three scripts:

### setup script:
This script will scrape the AOC puzzle text and input. It will then add a file for each of these, and a solution file which read the input, and logs out the first 150 chars. And lastly, it will add or update the index.ts file to call the puzzle solution function specified with the script.

After solving part 1 of a puzzle, rerun the setup script to update the puzzle instructions with part 2 instructions.  

### dev script:
This script will run/watch the index.ts file, which calls the solution function for the puzzle you're working on. 

### submit script:
This script will submit an answer for a puzzle based on the inputs provided, year, day, level, and answer in this format: year{xxxx}day={xx} level={x}ans={xxx}. It will print back these details that the answer was submitted for and the answer response from Advent of Code.

## Getting Started

Clone, install dependencies, and setup the environment:

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasethomson/aoc.git
   cd aoc
   ```

2. **Install dependencies**
   ```bash
   npm install 
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

* In order for the app to request your puzzle input, you will need to add the aoc cookie for your session, you can access this in your browser network tab. Just to note, you must be logged into your account before getting the cookie. 

---

## Usage 

```bash
# First setup the puzzle you would like to solve for, passing in year and day in this format: year=xxxxday=xx 
npm run setup year=2015day=1
# Run the application
npm run dev year=2015day=1
# Submit an anwer for a puzzle, format year{xxxx}day={xx} level={x}ans={xxx}
npm run dev year=2015day=1 level=1ans=1645 
# After solving part 1, rerun the setup script to update the puzzle instructions with part 2, no need to change the script input. 
npm run setup year=2015day=1
```

Anytime you want to change the puzzle you're working on, just run the setup script with the new puzzle date, and then the dev script with the new puzzle date.
