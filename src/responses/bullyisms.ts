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

export const bullyisms = [bullyTemplate]
