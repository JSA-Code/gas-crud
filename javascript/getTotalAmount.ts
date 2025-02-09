/** @OnlyCurrentDoc */

/**
 * Prompt user yes/no to return either total amount without paid versus with paid.
 * @return {void}
 */
function getTotalAmount(): void {
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
    "Select YES to get total amount from all users.\n\nSelect NO to get total amount from all users who actually paid.",
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.CLOSE) return;

  const filteredCondition =
    response === ui.Button.YES
      ? (e) => e[6] === true
      : (e) => e[5] === true && e[6] === true;
  const filteredAmounts = data.filter(filteredCondition).map((e) => e[1]);

  if (filteredAmounts.length === 0) {
    ui.alert(
      "No data found with conditions: e[6] === true or e[5] && e[6] === true"
    );
    return;
  }

  const sum = filteredAmounts.reduce((a, b) => a + b);

  ui.alert(
    `Your total amount: $${sum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  );
}
