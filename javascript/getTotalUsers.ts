/** @OnlyCurrentDoc */
/**
 * Get total users from the front sheet to either get all users or get all users who actually paid.
 * @return {void}
 */
function getTotalUsers(): void {
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

  const data = backSheet.getRange("B2:H").getValues();

  if (data.length === 0) {
    ui.alert("No data found in the specified range.");
    return;
  }

  const response = ui.alert(
    "Calculate Total Users",
    "Select YES to get all users.\n\nSelect NO to get all users who actually paid.",
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.CLOSE) return;

  const filteredCondition =
    response === ui.Button.YES
      ? (e) => e[6] === true
      : (e) => e[5] === true && e[6] === true;
  const filteredAmounts = data.filter(filteredCondition);

  if (filteredAmounts.length === 0) {
    ui.alert(
      "No data found with conditions: e[6] === true or e[5] && e[6] === true"
    );
    return;
  }

  ui.alert(
    `Number of clients: ${filteredAmounts.length.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`
  );
}
