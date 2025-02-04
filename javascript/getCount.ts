function getCount() {
  const feesIdRange = sheet.getRange("A3:A").getValues();
  const feesId = feesIdRange.flat().filter((e) => e !== "");
  const count = feesId.length;

  if (isNaN(count)) {
    return ui.alert(
      "Numbers are only allowed!\n A letter or word was entered."
    );
  }

  return ui.alert(
    `Number of clients: ${count.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`
  );
}
