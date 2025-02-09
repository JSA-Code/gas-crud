/** @OnlyCurrentDoc */

/**
 * Sets checkbox to false and hides from view. Does NOT delete user, used for records.
 * @return {void}
 */
function deleteUser(): void {
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

  const frontSheet = spreadSheetApp.getActiveSheet();
  const activeCell = frontSheet.getActiveCell();

  if (activeCell.getColumn() !== 2) {
    ui.alert("Please select the name first!");
    return;
  }

  const name = activeCell.getValue();
  const index = getRowByName(name, backSheetName);

  if (index === null) {
    ui.alert(`Could not find client in back sheet: ${name}`);
    return;
  }

  const id = frontSheet.getRange(activeCell.getRow(), 1).getValue();
  const response = ui.alert(
    "Delete",
    `Do you want to delete ${name} ID# ${id}?`,
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.NO || response === ui.Button.CLOSE) return;

  backSheet.getRange(index, 8).setValue(false);
}
