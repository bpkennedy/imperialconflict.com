import { Screen } from 'quasar'

export const stringToDecimal = string => {
  return parseFloat(string)
}

export const wholeNumberFromDecimal = decimal => {
  return Math.floor(decimal * 100)
}

export const isBonusAmountGreen = amount => {
  return wholeNumberFromDecimal(stringToDecimal(amount)) > 50
}

export const deviceFormattedNumber = value => {
  if (Screen.lt.sm) {
    return formatNumberForDisplay(value)
  }
  return internationalFormat(value)
}

export const formatNumberForDisplay = number => {
  if (number >= 1000000) {
    return internationalFormat(number / 1000000) + 'M'
  }
  if (number >= 1000) {
    return internationalFormat(number / 1000) + 'k'
  }
  return internationalFormat(number)
}

export const internationalFormat = number => {
  return new Intl.NumberFormat().format(Math.round(number * 10) / 10)
}
