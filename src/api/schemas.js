// base schemas
export const SYSTEM_SCHEMA = 'SYSTEM_SCHEMA'
export const RESOURCE_SCHEMA = 'RESOURCE_SCHEMA'
export const BASIC_EMPIRE_SCHEMA = 'ACTIVE_EMPIRES_SCHEMA'
const GALAXY_SCHEMA = 'GALAXY_SCHEMA'
export const PLANET_BONUS_SCHEMA = 'PLANET_BONUS_SCHEMA'

// for composed schemas
export const PLANET_SCHEMA = 'PLANET_SCHEMA'
export const ACTIVE_EMPIRE_SCHEMA = 'ACTIVE_EMPIRE_SCHEMA'
export const DETAILED_EMPIRE_SCHEMA = 'DETAILED_EMPIRE_SCHEMA'


export const baseSchema = {
  [PLANET_BONUS_SCHEMA]: {
    name: '',
    amount: '',
    icon: '',
  },
  [RESOURCE_SCHEMA]: {
    name: '',
    amount: 0,
  },
  [GALAXY_SCHEMA]: {
    description: '',
    map_image_path: '',
    name: '',
    turn: 0,
  },
  [SYSTEM_SCHEMA]: {
    name: '',
    galaxy_id: 0,
    x: 0,
    y: 0,
  },
  [BASIC_EMPIRE_SCHEMA]: {
    avatar_url: '',
    family_id: 0,
    id: 0,
    name: '',
  },
}

export const composedSchema = {
  [PLANET_SCHEMA]: {
    bonuses: [ baseSchema[PLANET_BONUS_SCHEMA] ],
    label: '',
    number: '',
    image: '',
  },
  [ACTIVE_EMPIRE_SCHEMA]: {
    ...baseSchema[BASIC_EMPIRE_SCHEMA],
    galaxy: { ...baseSchema[GALAXY_SCHEMA] },
  },
  [DETAILED_EMPIRE_SCHEMA]: {
    ...baseSchema[BASIC_EMPIRE_SCHEMA],
    galaxy: { ...baseSchema[GALAXY_SCHEMA] },
    resources: [ baseSchema[RESOURCE_SCHEMA] ],
    leader: '',
    morale: '',
    networth: 0,
    population: 0,
    planets_count: 0,
    race_id: 1,
    race_name: '',
  },
}
