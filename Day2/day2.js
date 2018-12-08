const fs = require("fs");
let IDs = fs.readFileSync("input.txt").toString();
IDs = IDs.split("\n");

// part 1
let twoTimes = 0;
let threeTimes = 0;

// go through the input list
for (let i = 0; i < IDs.length; i++) {
  let currentString = IDs[i];
  let charMap = new Map();

  // go thtrough a single string
  for (let j = 0; j < currentString.length; j++) {
    let char = currentString.charAt(j);
    if (charMap.has(char)) {
      let count = charMap.get(char);
      count += 1;
      charMap.set(char, count);
    } else {
      charMap.set(char, 1);
    }
  }

  // check the count per character
  let tempTwoTimes = 0;
  let tempThreeTimes = 0;

  for (let [key, count] of charMap.entries()) {
    if (count == 2) {
      tempTwoTimes++;
    } else if (count == 3) {
      tempThreeTimes++;
    }
  }

  // one string can only count for one for each
  if (tempTwoTimes > 0) {
    twoTimes++;
  }
  if (tempThreeTimes > 0) {
    threeTimes++;
  }
}

console.log(twoTimes, threeTimes);
console.log(twoTimes * threeTimes);

// part 2
function compareAllStringsTogether() {
  IDs.forEach(x => onlyOneCharDifference(x));
}

function onlyOneCharDifference(string1) {
  let differenceCount = 0;

  for (let index = 0; index < IDs.length; index++) {
    const string2 = IDs[index];
    let differencePosition = 0;
    if (string2 === string1) return false;

    for (let i = 0; i < string1.length; i++) {
      if (string1.charAt(i) !== string2.charAt(i)) {
        differenceCount++;
        differencePosition = i;
      }
      if (differenceCount > 1) {
        differenceCount == 0;
        break;
      }
    }

    if (differenceCount == 1) {
      console.log(string1, string2);
      console.log(
        string1
          .slice(0, differencePosition)
          .concat(string1.slice(differencePosition + 1))
      );
      return;
    }

    differenceCount = 0;
  }
}

compareAllStringsTogether();
