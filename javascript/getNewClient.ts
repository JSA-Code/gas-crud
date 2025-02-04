function getNewClient() {
  const html = HtmlService.createHtmlOutputFromFile("clientForm")
    .setWidth(600)
    .setHeight(500);

  // const rowData = sheet.getRange(`A${row}:F${row}`).getValues()[0];
  // ui.alert(JSON.stringify(data));

  // TODO Exception: Specified permissions are not sufficient to call Ui.showModalDialog. Required permissions: https://www.googleapis.com/auth/script.container.ui
  SpreadsheetApp.getUi().showModalDialog(html, "Enter Client Information");
}

// TODO change hard-coded last column "8" which is boolean for view in fees log
function processClientForm(...data) {
  const filteredName = dbNameRange.flat().filter((e) => e.trim() !== "");
  const dbLastRow = filteredName.length + 2;
  data.forEach((e, i) => db.getRange(dbLastRow, i + 2).setValue(e));
  db.getRange(dbLastRow, 8).setValue(true);
}
