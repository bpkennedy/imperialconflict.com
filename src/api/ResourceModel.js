import { baseSchema, RESOURCE_SCHEMA } from 'src/api/schemas'
import { stringToDecimal, wholeNumberFromDecimal, deviceFormattedNumber } from 'src/services/math'

const GOLD_RESOURCE_KEY = 'gold'
const FOOD_RESOURCE_KEY = 'food'
const IRON_RESOURCE_KEY = 'iron'
const OCTARINE_RESOURCE_KEY = 'octarine'
const ENDURIUM_RESOURCE_KEY = 'endurium'

export const RESOURCE_ICONS = {
  [GOLD_RESOURCE_KEY]: {
    icon: 'https://imperialconflict.com/images/Status/resource1.png',
    colorClass: 'resource-gold',
  },
  [FOOD_RESOURCE_KEY]: {
    icon: 'https://imperialconflict.com/images/Status/resource4.png',
    colorClass: 'resource-food',
  },
  [IRON_RESOURCE_KEY]: {
    icon: 'https://imperialconflict.com/images/Status/resource2.png',
    colorClass: 'resource-iron',
  },
  [OCTARINE_RESOURCE_KEY]: {
    icon: 'https://imperialconflict.com/images/Status/resource3.png',
    colorClass: 'resource-octarine',
  },
  [ENDURIUM_RESOURCE_KEY]: {
    icon: 'https://imperialconflict.com/images/Status/resource5.png',
    colorClass: 'resource-endurium',
  },
}

export function Resource (name, amount, icon, colorClass) {
  Object.assign(this, baseSchema[RESOURCE_SCHEMA])
  this.name = name
  this.amount = amount
  this.icon = icon
  this.colorClass = colorClass
}

export function transformResources(resources, options = {}) {
  const resourcesArray = []
  for (const [key, value] of Object.entries(resources)) {
    const valueDisplay = options.toPercentage ? wholeNumberFromDecimal(stringToDecimal(value)) : deviceFormattedNumber(value)
    const newResource = new Resource(
      key,
      valueDisplay,
      RESOURCE_ICONS[key]['icon'],
      RESOURCE_ICONS[key]['colorClass'])
    resourcesArray.push(newResource)
  }
  return resourcesArray
}
