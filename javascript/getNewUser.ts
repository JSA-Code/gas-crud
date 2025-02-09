// opt annotation, limit access to current spreadsheet (vs all the user's ss) or else assumes all spreadsheets perms, best prac to add
/** @OnlyCurrentDoc */

/**
 * Creates a new user form, extracts information,
 * and adds it to bottom of back sheet.
 * @return {void}
 */
function getNewUser(): void {
  const html = HtmlService.createHtmlOutputFromFile("clientForm")
    .setWidth(600)
    .setHeight(500);

  // TODO Exception: Specified permissions are not sufficient to call Ui.showModalDialog. Required permissions: https://www.googleapis.com/auth/script.container.ui
  SpreadsheetApp.getUi().showModalDialog(html, "Enter Client Information");
}

/**
 * Processes data sent from new user form and updates the back sheet.
 * @param {string[]} data Name, Amount, Type, ApptDate, Year, and Paid.
 * @return {void}
 */
function processClientForm(...data): void {
  const backSheetName = "RECORDS";
  const spreadSheetApp = SpreadsheetApp;
  const backSheet = spreadSheetApp
    .getActiveSpreadsheet()
    .getSheetByName(backSheetName);
  const ui = spreadSheetApp.getUi();

  if (!backSheet) {
    ui.alert(`Could not find ${backSheetName} sheet`);
    return;
  }

  // TODO should grab range from user props
  const index = backSheet.getRange("B:B").getLastRow();
  const isDuplicate = typeof getRowByName(data[0], backSheetName) === "number";

  if (isDuplicate) {
    ui.alert(`User ${data[0]} already exists in the back sheet!`);
    return;
  }

  data.forEach((e, i) => backSheet.getRange(index + 1, i + 2).setValue(e));
  backSheet.getRange(index + 1, 8).setValue(true);
}
