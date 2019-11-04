import Response from '../ResponseManager/Response'

const BULLY_TEMPLATE = RegExp('(with|my) friends and (.+)')
const BULLY_TEMPLATE_RESPONSE = msg => {
  const weakling = msg.match(BULLY_TEMPLATE)[2]
  return `Haha, yeah, fuck ${weakling}, that BITCH!`
}

export const bullyTemplate = new Response(
  'bullyTemplate',
  BULLY_TEMPLATE,
  BULLY_TEMPLATE_RESPONSE
)

const MILLENIAL_RAGE = RegExp('(?:^|\\B)#(?![0-9_]+\\b)([a-zA-Z0-9_]{1,30})(\\b|\\r)') // https://stackoverflow.com/a/42551826
const MILLENIAL_RAGE_RESPONSE = msg => {
  return "These youngins and their instasnaps and their snapbooks. Back in my day we talked to people face to face. 😡"
}

export const millenialRage = new Response(
  'millenialRage',
  MILLENIAL_RAGE,
  MILLENIAL_RAGE_RESPONSE
)

export const bullyisms = [bullyTemplate, millenialRage]
