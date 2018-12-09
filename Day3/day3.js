const fs = require("fs");
let claims = fs.readFileSync("input.txt").toString();

// id   x   y    size
// #1 @ 555,891: 18x12
let pattern = /(#\d*) @ (\d*),(\d*): (\d*)x(\d*)/;

claims = claims
  .split("\n")
  .slice(0, claims.length - 1)
  .map(claim => {
    let split = claim.split(pattern);
    let id = split[1];
    let x = parseInt(split[2]);
    let y = parseInt(split[3]);
    let distanceX = parseInt(split[4]);
    let distanceY = parseInt(split[5]);
    return {
      id: id,
      startX: x,
      endX: x + distanceX,
      startY: y,
      endY: y + distanceY
    };
  });

let listOfClaims = {};
claims.forEach(claim => {
  for (let y = claim.startY; y < claim.endY; y++) {
    for (let x = claim.startX; x < claim.endX; x++) {
      let coords = y + "," + x;
      if (listOfClaims[coords]) {
        listOfClaims[coords].push(claim.id);
      } else {
        listOfClaims[coords] = [claim.id];
      }
    }
  }
});

let overLappedCoords = new Set();
let overLappingIds = new Set();

for (let coords of Object.keys(listOfClaims)) {
  if (listOfClaims[coords].length > 1) {
    overLappedCoords.add(coords);
    for (let ids of listOfClaims[coords]) {
      overLappingIds.add(ids);
    }
  }
}
console.log(overLappedCoords.size);

for (let claim of claims) {
  if (!overLappingIds.has(claim.id)) {
    console.log(claim.id);
  }
}
