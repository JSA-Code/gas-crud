function getTotal() {
  const sum = feesAmountRange
    .flat()
    .filter((val) => val !== "")
    .reduce((a, b) => a + b);

  return ui.alert(
    `Your total: $${sum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  );
}
