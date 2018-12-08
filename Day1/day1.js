const fs = require("fs");
let changes = fs.readFileSync("input.txt").toString();
changes = changes.split("\n");

const changesAsIntegers = changes
  .map(x => x.substring(0, 1) === "+" ? parseInt(x.substring(1)) : parseInt(x))
  .slice(0, changes.length - 1);

let firstDuplicateFound = false;
let frequencySet = new Set([0]);

console.time("dumdum");
let current = 0;
while (!firstDuplicateFound) {
  for (let i = 0; i < changesAsIntegers.length; i++) {
    current += changesAsIntegers[i];
    if (frequencySet.has(current)) {
      console.log(current);
      firstDuplicateFound = true;
      break;
    } else {
      frequencySet.add(current);
    }
  }
}
console.timeEnd("dumdum");
