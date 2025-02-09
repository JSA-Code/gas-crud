/** @OnlyCurrentDoc */

const map2 = new Map(); // Global variable to store row data

function buildMap() {
  // Assuming the ID is in the first column
  const filteredName = feesNameRange.flat().filter((e) => e.trim() !== "");
  filteredName.forEach((e, i) => map2.set(e, i));
}

function searchRowFees(name) {
  if (map2.size === 0) {
    // Build the row data map if not already built
    buildMap();
  }

  return map2.get(name) ?? null;
}
