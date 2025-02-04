function getAverage() {
  const feesAmount = feesAmountRange
    .flat()
    .filter((value) => value.toString().trim() !== "");
  const sum = feesAmount.reduce((a, b) => a + b);
  const count = feesAmount.length;
  const avg = sum / count;

  if (isNaN(avg)) {
    return ui.alert(
      "Numbers are only allowed!\n A letter or word was entered."
    );
  }

  return ui.alert(
    `Your average: $${avg.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  );
}
