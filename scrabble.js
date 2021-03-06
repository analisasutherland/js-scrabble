//A, E, I, O, U, L, N, R, S, T	1
// D, G	2
// B, C, M, P	3
// F, H, V, W, Y	4
// K	5
// J, X	8
// Q, Z	10
const Scrabble = {
  scoreBoard: {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
  },

  score(word) {
    let totalScore = 0;

    // throws if word contains invalid characters
    // .search will return -1 if there is a match
    // throws if word is empty
    //throws if word is longer then 7 characters
    if (word.search(/[^a-zA-Z]+/) !== -1 || word.length === 0 || word.length > 7)  {
      throw 'Invalid word.';
    }

    // split our word into an array of Uppercase characters
    let upcase_word = word.toUpperCase()
    let wordArray = upcase_word.split("");

    // if the word <= 7 in length proceed
    while (wordArray.length <= 7) {

      // look at each letter in the array and scoreboard and then reassign value at index to value from scoreBoard wordArray[i] = scoreBoard[wordArray[i]]
      for (let i = 0; i < wordArray.length; i++) {
        wordArray[i] = Scrabble.scoreBoard[wordArray[i]]
        //gets a sum of this array now that values have been assigned
        totalScore = wordArray.reduce((x, y) => x + y);
      }

      // Adds 50 points if you play a 7 letter word, else just returns your normal score
      if (wordArray.length === 7) {
        return totalScore + 50;
      } else {
        return totalScore;
      }
    }
  },

  highestScoreFrom(arrayOfWords) {
    // throw if no words are passed
    if (arrayOfWords.length === 0 || Array.isArray(arrayOfWords) !== true) {
      throw "No played words.";
    }

    const tieBreak = function tieBreak(best_word, challenger_word) {
      console.log(`Best Word: ${best_word}`);
      console.log(`Challenger Word: ${challenger_word}`);
      if (best_word.length === 7) {
        return best_word;
      } else if (challenger_word.length === 7) {
        return challenger_word;
      } else if (challenger_word.length < best_word.length) {
        return challenger_word;
      } else {
        return best_word
      }
    };

    let bestWord = arrayOfWords[0];
    let bestScore = this.score(bestWord);

    arrayOfWords.forEach((word) => {
      if (this.score(word) > bestScore) {
        bestWord = word;
        bestScore = this.score(word);
      } else if (this.score(word) === bestScore) {
        bestWord = tieBreak(bestWord, word);
      }
    })
    return bestWord
  }
};

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    if (arguments.length === 0) {
      throw 'Must provide a name.';
    }
    this.plays = [];
    this.score = 0;
  }

  play(word) {
    let word_score = 0;
    if (this.hasWon()) {
      return false;
    }

    if (word.search(/[^a-zA-Z]+/) !== -1 || word.length > 7) {
      throw 'You must enter a real word that is 7 characters or under.';
    }

    if (this.plays.includes(word)) {
      throw "This word was used already.";
    } else {
      this.plays.push(word);
      word_score = Scrabble.score(word);
      this.score += word_score
    }
    return word_score;
  }

  totalScore() {
    return this.score;
  }

  hasWon() {
    return this.score >= 100;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    // ran out of time to implement and test this.
  }
};


module.exports = Scrabble;
