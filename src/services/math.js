export const stringToDecimal = string => {
  return parseFloat(string)
}

export const wholeNumberFromDecimal = decimal => {
  return Math.floor(decimal * 100)
}

export const isBonusAmountGreen = amount => {
  return wholeNumberFromDecimal(stringToDecimal(amount)) > 50
}
