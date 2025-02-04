// TODO values should be grabbed in later func calls or here but cached and remove cache after each update/creation
const spreadSheetApp = SpreadsheetApp;
const sheet = spreadSheetApp.getActiveSheet();
const ui = spreadSheetApp.getUi();
const db =
  spreadSheetApp.getActiveSpreadsheet().getSheetByName("RECORDS") ||
  ui.alert("RECORDS sheet does not exist!");
const feesNameRange = sheet.getRange("B3:B").getValues();
const feesAmountRange = sheet.getRange("C3:C").getValues();
const dbNameRange = db ? db.getRange("B2:B").getValues() : null;
