import { composedSchema, JOINABLE_GALAXY_SCHEMA } from 'src/api/schemas'

export function JoinableGalaxy (
  galaxyName,
  galaxyDescription,
  galaxyImage,
  galaxyTurn,
  empJoined,
  empTotal,
  famCount,
) {
  Object.assign({}, composedSchema[JOINABLE_GALAXY_SCHEMA])

  this.id = galaxyRoundId(galaxyName, galaxyTurn)
  this.name = galaxyName
  this.description = galaxyDescription
  this.map_image_path = galaxyImage
  this.turn = parseInt(galaxyTurn, 10)
  this.empires_count_joined = parseInt(empJoined, 10)
  this.empires_count_total = parseInt(empTotal, 10)
  this.families_count = parseInt(famCount, 10)
}

function transformJoinableGalaxyToModel(joinableGalaxies) {
  return joinableGalaxies.map(jg => new JoinableGalaxy(
    jg.name,
    jg.description,
    jg.map_image_path,
    jg.turn,
    jg.counts.empires.joined,
    jg.counts.empires.total,
    jg.counts.families[0],
  ))
}

export function getJoinableGalaxies(state) {
  return transformJoinableGalaxyToModel(state.user?.joinable_galaxies || [])
}

function galaxyRoundId(galaxyName, turn) {
  const trimmedName = galaxyName.toLowerCase().replace(/\s/g, '')
  return trimmedName + turn
}
