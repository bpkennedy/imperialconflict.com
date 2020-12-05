import { stringToDecimal, wholeNumberFromDecimal } from './math'

export const PLANET_MODEL = 'PLANET_MODEL'
export const SYSTEM_MODEL = 'SYSTEM_MODEL'
export const EMPIRE_MODEL = 'EMPIRE_MODEL'

const baseSchema = {
  [PLANET_MODEL]: {
    label: '',
    number: '',
    image: '',
    bonuses: [{
      name: '',
      amount: '',
      icon: '',
    }],
  },
  [SYSTEM_MODEL]: {
    name: '',
    galaxy_id: 1,
    x: 1,
    y: 2,
  },
  [EMPIRE_MODEL]: {
    id: 123,
    name: '',
    family_id: 234,
  },
}

export function PlanetView(
  plLabel,
  plNumber,
  plImage,
  plBonuses,
  sysName,
  sysGalaxyId,
  sysX,
  sysY,
  sysDisplayCoordinates,
  empId,
  empName,
  empFamilyId,
) {
  this.planet = Object.assign({}, baseSchema[PLANET_MODEL])
  this.system = Object.assign({}, baseSchema[SYSTEM_MODEL])
  this.empire = Object.assign({}, baseSchema[EMPIRE_MODEL])

  this.planet.label = plLabel
  this.planet.number = parseInt(plNumber, 10)
  this.planet.image = plImage
  this.planet.bonuses = transformPlanetBonuses(plBonuses)
  this.system.name = sysName
  this.system.galaxy_id = parseInt(sysGalaxyId, 10)
  this.system.x = parseInt(sysX, 10)
  this.system.y = parseInt(sysY, 10)
  this.system.displayCoordinates = getGalaxySystemCoordinates(sysDisplayCoordinates)
  this.empire.id = parseInt(empId, 10)
  this.empire.name = empName
  this.empire.family_id = parseInt(empFamilyId, 10)
}

function getGalaxySystemCoordinates (system) {
  return `(${system.galaxy_id},${system.x},${system.y})`
}

function transformPlanetBonuses(bonuses) {
  const bonusesArray = []
  for (const [key, value] of Object.entries(bonuses)) {
    bonusesArray.push({
      name: key,
      amount: wholeNumberFromDecimal(stringToDecimal(value)),
      icon: 'https://imperialconflict.com/images/Status/resource4.gif',
    })
  }
  return bonusesArray
}

export const transformPlanetDetailToModels = response => {
  const dataItem = response?.data?.data

  return new PlanetView(
    dataItem.coordinates.label,
    dataItem.coordinates.number,
    'https://4.bp.blogspot.com/-QfDLT2JXSWA/Vkdgm5fiQbI/AAAAAAAABA4/PbFe3xP-T2Y/s1600/Alpine800.png', // dataItem.image_path,
    dataItem.bonuses,
    dataItem.system.name,
    dataItem.system.coordinates.galaxy_id,
    dataItem.system.coordinates.x,
    dataItem.system.coordinates.y,
    dataItem.system.coordinates,
    dataItem.empire.id,
    dataItem.empire.name,
    dataItem.empire.family.id)
}
