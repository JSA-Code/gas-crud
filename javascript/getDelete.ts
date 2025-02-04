function getDelete() {
  // row and column numbers are sheet's actual number, not array index
  const activeCell = sheet.getActiveCell();
  const name = activeCell.getValue();
  const rowNumber = activeCell.getRow();
  const columnNumber = activeCell.getColumn();
  const idFront = sheet.getRange(rowNumber, 1).getValue();
  const index = searchRow(name);

  if (columnNumber !== 2) {
    return ui.alert("Please select the name first!");
  }

  if (index === null) {
    return ui.alert(`Could not find client with ID: ${idFront}`);
  }

  const response = getResponse(activeCell, idFront);
  if (response === ui.Button.NO || response === ui.Button.CLOSE) {
    return;
  }

  db.getRange(index + 2, 8).setValue(false);
}

function getResponse(active, id) {
  const name = active.getValue();
  return ui.alert(
    "Delete",
    `Do you want to delete ${name} ID# ${id}?`,
    ui.ButtonSet.YES_NO
  );
}
