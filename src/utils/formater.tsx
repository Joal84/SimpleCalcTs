const INTEGER_FORMATER = new Intl.NumberFormat("pt-PT", {
  maximumFractionDigits: 0,
});

export const formatOperand = (operand: string | number) => {
  if (operand == null) return;
  if (typeof operand === "string") {
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATER.format(BigInt(integer));
    return `${INTEGER_FORMATER.format(BigInt(integer))}.${decimal}`;
  }
};
