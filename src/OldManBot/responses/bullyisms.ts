import { Response } from '../../DiscordBot'

const BULLY_TEMPLATE = RegExp('(with|my) friends and (.+)')

const bullyAgreement = msg => {
  const weakling = msg.match(BULLY_TEMPLATE)[2]
  return `Haha, yeah, fuck ${weakling}, that BITCH!`
}

const dabOnEm = msg => {
  const dabee = msg.match(BULLY_TEMPLATE)[2]
  return `:fire: Get dabbed on, ${dabee} :fire:`
}

const weebShame = msg => {
  const weeb = msg.match(BULLY_TEMPLATE)[2]
  return `Go cry in your waifu pillow, ${weeb}, you filthy weeb`
}

export const bullyTemplate = new Response({
  name: 'bullyTemplate',
  trigger: BULLY_TEMPLATE,
  onTrigger: [bullyAgreement, dabOnEm, weebShame]
})

const MILLENIAL_RAGE = RegExp(
  '(?:^|\\B)#(?![0-9_]+\\b)([a-zA-Z0-9_]{1,30})(\\b|\\r)'
) // https://stackoverflow.com/a/42551826
export const millenialRage = new Response({
  name: 'millenialRage',
  trigger: MILLENIAL_RAGE,
  onTrigger: [
    () =>
      'These youngins and their instasnaps and their snapbooks. Back in my day we talked to people face to face. 😡'
  ],
  probability: 'sometimes'
})

export const bullyisms = [bullyTemplate, millenialRage]
