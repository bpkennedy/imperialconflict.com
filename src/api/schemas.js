export const PLANET_SCHEMA = 'PLANET_SCHEMA'
export const SYSTEM_SCHEMA = 'SYSTEM_SCHEMA'
export const EMPIRE_SCHEMA = 'EMPIRE_SCHEMA'
const GALAXY_SCHEMA = 'GALAXY_SCHEMA'
export const PLANET_BONUS_SCHEMA = 'PLANET_BONUS_SCHEMA'
export const ACTIVE_EMPIRE_SCHEMA = 'ACTIVE_EMPIRE_SCHEMA'

export const baseSchema = {
  [PLANET_BONUS_SCHEMA]: {
    name: '',
    amount: '',
    icon: '',
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
  [EMPIRE_SCHEMA]: {
    avatar_url: '',
    family_id: 0,
    id: 0,
    name: '',
  },
}

export const composedSchema = {
  [PLANET_SCHEMA]: {
    label: '',
    number: '',
    image: '',
    bonuses: [baseSchema[PLANET_BONUS_SCHEMA]],
  },
  [ACTIVE_EMPIRE_SCHEMA]: {
    ...baseSchema[EMPIRE_SCHEMA],
    galaxy: {
      ...baseSchema[GALAXY_SCHEMA],
    },
  },
}
