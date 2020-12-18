import { composedSchema, DETAILED_EMPIRE_SCHEMA } from 'src/api/schemas'
import Vue from 'vue'
import { STORAGE_PREFIX } from 'src/api/auth'
import { transformResources } from 'src/api/ResourceModel'
import { roundDown, deviceFormattedNumber } from '../services/math'

export const CURRENT_EMPIRE_ID_STORAGE_TOKEN = STORAGE_PREFIX + 'CurrentEmpireId'

export function Empire (
  empLeader,
  empMorale,
  empNetworth,
  empPopulation,
  empPlanetsCount,
  empRaceId,
  empRaceName,
  empAvatarUrl,
  empFamilyId,
  empId,
  empName,
  galaxyName,
  galaxyDescription,
  galaxyImage,
  galaxyTurn,
  resources,
) {
  Object.assign({}, composedSchema[DETAILED_EMPIRE_SCHEMA])

  this.leader = empLeader
  this.morale = `${roundDown(empMorale)}%`
  this.networth = deviceFormattedNumber(empNetworth)
  this.population = deviceFormattedNumber(empPopulation)
  this.planets_count = deviceFormattedNumber(empPlanetsCount)
  this.race_id = empRaceId
  this.race_name = empRaceName

  this.avatar_url = empAvatarUrl
  this.family_id = empFamilyId
  this.id = empId
  this.name = empName

  this.galaxy = {}
  this.galaxy.name = galaxyName
  this.galaxy.description = galaxyDescription
  this.galaxy.map_image_path = galaxyImage
  this.galaxy.turn = galaxyTurn

  this.resources = transformResources(resources)
}

function transformCurrentEmpireToModel(dataItem) {
  return new Empire(
    dataItem.leader,
    dataItem.morale,
    dataItem.networth,
    dataItem.population,
    dataItem.planets_count,
    dataItem.race.id,
    dataItem.race.name,
    dataItem.avatar_url,
    dataItem.family.id,
    dataItem.id,
    dataItem.name,
    dataItem.galaxy.name,
    dataItem.galaxy.description,
    dataItem.galaxy.map_image_path,
    dataItem.galaxy.turn,
    dataItem.resources,
  )
}

export async function getCurrentEmpire(empireId) {
  const empireResponse = await Vue.prototype.$axios.get(`/empire/${empireId}`)
  return transformCurrentEmpireToModel(empireResponse?.data?.data)
}
