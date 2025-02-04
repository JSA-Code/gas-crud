function getUpdate() {
  const activeCell = sheet.getActiveCell();
  const columnNumber = activeCell.getColumn();
  const rowNumber = activeCell.getRow();

  if (columnNumber !== 2 || rowNumber <= 2) {
    return ui.alert("Please select the name first!");
  }

  const currentActiveName = activeCell.getValue();
  const dbRowIndex = searchRow(currentActiveName);
  // * last two args are # of rows and cols but are endpoints iow where to stop (eg. getRange(1,1,2,4) means start at first row, start at first col, end at 2nd row, end at 4th col)
  const data = db.getRange(dbRowIndex + 2, 1, 1, 7).getValues()[0];
  const html = HtmlService.createHtmlOutputFromFile("updateForm")
    .setWidth(600)
    .setHeight(500);
  html.append(`<script>populateForm(${JSON.stringify(data)})</script>`);
  // // TODO Exception: Specified permissions are not sufficient to call Ui.showModalDialog. Required permissions: https://www.googleapis.com/auth/script.container.ui
  SpreadsheetApp.getUi().showModalDialog(html, "Update Client Information");
}

function processUpdateForm(...data) {
  const name = sheet.getActiveCell().getValue();
  const index = searchRow(name);
  // * we do index + 2 bc Google Sheets skips row 0 and our headers takes row 1
  // * we do i + 2 same as above but w/ cols
  data.forEach((e, i) => db.getRange(index + 2, i + 2).setValue(e));
}
