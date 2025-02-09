/** @OnlyCurrentDoc */

/**
 * Gets average amount from front sheet by either all the users or based on actual payment.
 * @return {void}
 */
function getAverageAmount(): void {
  // TODO get backSheetName from current selected or user's saved props
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

  const data = backSheet?.getRange("B2:H").getValues();

  if (data.length === 0) {
    ui.alert("No data found in the specified range.");
    return;
  }

  const response = ui.alert(
    "Calculate Average",
    "Select YES to get average amount for all users.\n\nSelect NO to get average amount for users who actually paid.",
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
  const count = filteredAmounts.length;
  const avg = sum / count;

  if (isNaN(avg)) {
    ui.alert("Numbers are only allowed!\n A letter or word was entered.");
    return;
  }

  ui.alert(
    `Your average amount: $${avg.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  );
}
