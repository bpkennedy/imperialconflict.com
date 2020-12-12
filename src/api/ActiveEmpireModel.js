import { ACTIVE_EMPIRE_SCHEMA, composedSchema } from 'src/api/schemas'

export function ActiveEmpire(
  empImage,
  empFamId,
  empId,
  empName,
  galName,
  galDesc,
  galImage,
  galTurn,
) {
  Object.assign(this, composedSchema[ACTIVE_EMPIRE_SCHEMA])

  this.avatar_url = empImage
  this.family_id = empFamId
  this.id = empId
  this.name = empName
  this.galaxy.name = galName
  this.galaxy.description = galDesc
  this.galaxy.map_image_path = galImage
  this.galaxy.turn = galTurn
}

export function transformUserActiveEmpiresToModels(apiEmpires) {
  return apiEmpires.map(e => new ActiveEmpire(
    e.avatar_url,
    e.family.id,
    e.id,
    e.name,
    e.galaxy.name,
    e.galaxy.description,
    e.galaxy.map_image_path,
    e.galaxy.turn,
  ))
}

export function getActiveEmpires(state) {
  return transformUserActiveEmpiresToModels(state.user?.empires?.active || [])
}
