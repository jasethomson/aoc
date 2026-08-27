# aoc

A simple Node.js project written in Typescript, to work on coding challenges from Advent of Code. 

The app is really just two scripts:
setup script:
This script will scrape the AOC puzzle text and input. It will then add a file for each of these, and a solution file which reads and logs out the first 150 chars of input. And finally it will add or updates the index.ts file to call the puzzle solution file specified with the script

dev script:
This script will run/watch the index.ts file, which calls the solution file for the puzzle you're working on. 

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
   OR
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

In order for the app to request your puzzle input, you will need to add the AOC cookie from your browser network tab after logging into aoc. 

---

## Usage 

```bash
# First setup the puzzle you would like to solve for, passing in year and day in this format: year=xxxxday=xx 
npm run setup year=2015day=1
# run the application
npm run dev year=2015day=1
```