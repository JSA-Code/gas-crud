function searchName() {
  const html = HtmlService.createHtmlOutputFromFile("searchForm")
    .setWidth(600)
    .setHeight(500);

  // const rowData = sheet.getRange(`A${row}:F${row}`).getValues()[0];
  // ui.alert(JSON.stringify(data));

  // TODO Exception: Specified permissions are not sufficient to call Ui.showModalDialog. Required permissions: https://www.googleapis.com/auth/script.container.ui
  SpreadsheetApp.getUi().showModalDialog(html, "Enter Client's Name");
}

function processNameForm(name) {
  const index = searchRowFees(name);
  const nameRange = sheet.getRange(index + 3, 2);
  sheet.setActiveRange(nameRange);
}
