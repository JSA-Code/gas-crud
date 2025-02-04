const map = new Map(); // Global variable to store row data

function buildMap() {
  // Assuming the ID is in the first column
  const filteredName = dbNameRange.flat().filter((e) => e.trim() !== "");
  filteredName.forEach((e, i) => map.set(e, i));

  // for (const row in dbNameRange) {
  //   for (const col in dbNameRange[row]) {
  //     Logger.log(dbNameRange[row][col]);
  //   }
  // }

  // for (const row in filteredName) {
  //     Logger.log(filteredName[row]);
  // }
}

// function logMap() {
//   map.forEach((value, key) => {
//     Logger.log(`Key: ${key}, Value: ${value}`);
//   });
// }

function searchRow(name) {
  if (map.size === 0) {
    // Build the row data map if not already built
    buildMap();
  }

  // logMap();

  return map.get(name) ?? null;
}
