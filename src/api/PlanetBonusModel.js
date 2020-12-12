import { baseSchema, PLANET_BONUS_SCHEMA } from 'src/api/schemas'
import { stringToDecimal, wholeNumberFromDecimal } from 'src/services/math'

export function PlanetBonus (name, amount, icon) {
  Object.assign(this, baseSchema[PLANET_BONUS_SCHEMA])
  this.name = name
  this.amount = amount
  this.icon = icon
}

export function transformPlanetBonuses (bonuses) {
  const bonusesArray = []
  for (const [key, value] of Object.entries(bonuses)) {
    const newBonus = new PlanetBonus(
      key,
      wholeNumberFromDecimal(stringToDecimal(value)),
      'https://imperialconflict.com/images/Status/resource4.gif')
    bonusesArray.push(newBonus)
  }
  return bonusesArray
}
