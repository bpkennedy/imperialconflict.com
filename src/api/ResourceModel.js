import { baseSchema, RESOURCE_SCHEMA } from 'src/api/schemas'
import { stringToDecimal, wholeNumberFromDecimal } from 'src/services/math'

const GOLD_RESOURCE_KEY = 'gold'
const FOOD_RESOURCE_KEY = 'food'
const IRON_RESOURCE_KEY = 'iron'
const OCTARINE_RESOURCE_KEY = 'octarine'
const ENDURIUM_RESOURCE_KEY = 'endurium'

export const RESOURCE_ICONS = {
  [GOLD_RESOURCE_KEY]: 'https://imperialconflict.com/images/Status/resource1.png',
  [FOOD_RESOURCE_KEY]: 'https://imperialconflict.com/images/Status/resource4.png',
  [IRON_RESOURCE_KEY]: 'https://imperialconflict.com/images/Status/resource2.png',
  [OCTARINE_RESOURCE_KEY]: 'https://imperialconflict.com/images/Status/resource3.png',
  [ENDURIUM_RESOURCE_KEY]: 'https://imperialconflict.com/images/Status/resource5.png',
}

export function Resource (name, amount, icon) {
  Object.assign(this, baseSchema[RESOURCE_SCHEMA])
  this.name = name
  this.amount = amount
  this.icon = icon
}

export function transformResources(resources, options = {}) {
  const resourcesArray = []
  for (const [key, value] of Object.entries(resources)) {
    const valueDisplay = options.toPercentage ? wholeNumberFromDecimal(stringToDecimal(value)) : value
    const newResource = new Resource(
      key,
      valueDisplay,
      RESOURCE_ICONS[key])
    resourcesArray.push(newResource)
  }
  return resourcesArray
}
