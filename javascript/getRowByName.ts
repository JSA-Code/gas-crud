/** @OnlyCurrentDoc */

/**
 * Retrieves the row number of the first occurrence of the name
 * in the sheet.
 *
 * @param {string} name The name to search.
 * @param {string} sheetName The sheet to search in.
 * @return {number | null} Row number if found, otherwise null.
 */
function getRowByName(name: string, sheetName: string): number | null {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    return null;
  }

  // TODO performs partial matches, req EXACT matches
  const textFinder = sheet.createTextFinder(name).matchEntireCell(true);
  const matches = textFinder.findAll();
  const lastColumnIndex = sheet.getLastColumn();

  for (const e of matches) {
    const index = e.getRow();
    const view = sheet.getRange(index, lastColumnIndex).getValue();

    if (view === true) {
      return index;
    }
  }

  return null;
}
