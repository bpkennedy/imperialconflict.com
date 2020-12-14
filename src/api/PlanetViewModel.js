import { baseSchema, composedSchema, BASIC_EMPIRE_SCHEMA, PLANET_SCHEMA, SYSTEM_SCHEMA } from 'src/api/schemas'
import { transformPlanetBonuses } from 'src/api/PlanetBonusModel'
import Vue from 'vue'

export function PlanetView (
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
  this.system = Object.assign({}, baseSchema[SYSTEM_SCHEMA])
  this.empire = Object.assign({}, baseSchema[BASIC_EMPIRE_SCHEMA])
  this.planet = Object.assign({}, composedSchema[PLANET_SCHEMA])

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

function transformPlanetDetailToModels(dataItem) {
  return new PlanetView(
    dataItem.coordinates.label,
    dataItem.coordinates.number,
    'https://4.bp.blogspot.com/-QfDLT2JXSWA/Vkdgm5fiQbI/AAAAAAAABA4/PbFe3xP-T2Y/s1600/Alpine800.png', // TODO temporary planet image hard-coded - dataItem.image_path
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

function getGalaxySystemCoordinates(system) {
  return `(${system.galaxy_id},${system.x},${system.y})`
}

export async function getPlanetView(planetId) {
  const planetResponse = await Vue.prototype.$axios.get(`/planets/${planetId}`)
  return transformPlanetDetailToModels(planetResponse?.data?.data)
}
