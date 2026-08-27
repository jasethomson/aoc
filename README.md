# aoc

A simple Node.js project written in Typescript, to work on coding challenges from Advent of Code. 

The app is really just two scripts:

### setup script:
This script will scrape the AOC puzzle text and input. It will then add a file for each of these, and a solution file which read the input, and logs out the first 150 chars. And lastly, it will add or update the index.ts file to call the puzzle solution function specified with the script.

### dev script:
This script will run/watch the index.ts file, which calls the solution function for the puzzle you're working on. 

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
# run the application
npm run dev year=2015day=1
```

Anytime you want to change the puzzle you're working on, just run the setup script with the new puzzle date, and then the dev script with the new puzzle date.
