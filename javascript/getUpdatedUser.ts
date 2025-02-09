/** @OnlyCurrentDoc */

/**
 * Extracts selected user's name, searches through back sheet,
 * and shows an update form.
 * @return {void}
 */
function getUpdatedUser(): void {
  const backSheetName = "RECORDS";
  const spreadSheetApp = SpreadsheetApp;
  const activeCell = spreadSheetApp.getActiveSheet().getActiveCell();
  const ui = spreadSheetApp.getUi();

  if (activeCell.getColumn() !== 2 || activeCell.getRow() <= 2) {
    ui.alert("Please select the name first!");
    return;
  }

  const name = activeCell.getValue();
  const index = getRowByName(name, backSheetName);

  if (index === null) {
    ui.alert(`Could not find client in back sheet: ${name}`);
    return;
  }

  const backSheet = spreadSheetApp
    .getActiveSpreadsheet()
    .getSheetByName(backSheetName);

  if (!backSheet) {
    ui.alert(`Could not find ${backSheetName} sheet`);
    return;
  }

  // * last two args are # of rows and cols but are endpoints iow where to stop (eg. getRange(1,1,2,4) means start at first row, start at first col, end at 2nd row, end at 4th col)
  // TODO can I use getDataRange()?
  const data = backSheet.getRange(index, 1, 1, 7).getValues()[0];

  if (data.length === 0) {
    ui.alert("No data found in the specified range.");
    return;
  }

  const html = HtmlService.createHtmlOutputFromFile("updateForm")
    .setWidth(600)
    .setHeight(500);

  html.append(`<script>populateForm(${JSON.stringify(data)})</script>`);
  // // TODO Exception: Specified permissions are not sufficient to call Ui.showModalDialog. Required permissions: https://www.googleapis.com/auth/script.container.ui
  ui.showModalDialog(html, "Update Client Information");
}

/**
 * Processes data sent from update form and updates the back sheet.
 * @param {string[]} data Name, Amount, Type, ApptDate, Year, and Paid.
 * @return {void}
 */
function processUpdateForm(...data): void {
  const backSheetName = "RECORDS";
  const spreadSheetApp = SpreadsheetApp;
  // * cannot grab name from data param bc it may have changed
  const name = spreadSheetApp.getActiveSheet().getActiveCell().getValue();
  const index = getRowByName(name, backSheetName);
  const ui = spreadSheetApp.getUi();

  if (index === null) {
    ui.alert(`Could not find client in back sheet: ${name}`);
    return;
  }

  const backSheet = spreadSheetApp
    .getActiveSpreadsheet()
    .getSheetByName(backSheetName);

  if (!backSheet) {
    ui.alert(`Could not find ${backSheetName} sheet`);
    return;
  }

  // * we do i + 2 bc data param starts at name col 0 index and GS counts from 1 not 0
  data.forEach((e, i) => backSheet.getRange(index, i + 2).setValue(e));
}
