import moment from 'moment'
import Response from '../ResponseManager/Response'
import { bot } from '../utils/Bot'
import { logger } from '../utils/Logger'

const CMD_PREFIX = '\\$'

const helpPhrase = RegExp(`${CMD_PREFIX}help`)
export const help = new Response(
  '$help',
  helpPhrase,
  msg => {
    const helpText = commands.reduce(
      (acc, cmd) => (acc += `\`${cmd.name}\` - ${cmd.desc}\n\n`),
      ''
    )
    return `**I swear I used to be able to do more stuff** :sob: \n${helpText}`
  },
  'How did I get here again?'
)

const pingPhrase = RegExp(`${CMD_PREFIX}ping`)
export const ping = new Response(
  '$ping',
  pingPhrase,
  msg => 'pong! :ping_pong:',
  'I might be slow these days but I can still slap balls with you'
)

const agePhrase = RegExp(`${CMD_PREFIX}age`)
export const age = new Response(
  '$age',
  agePhrase,
  msg => `I'm **${bot.id}** years _young_`,
  "I'll candidly tell you my age :blush:"
)

const uptimePhrase = RegExp(`${CMD_PREFIX}uptime`)
export const uptime = new Response(
  '$uptime',
  uptimePhrase,
  msg => {
    const duration = moment
      .duration(moment().diff(moment(bot.birthDate)))
      .asDays()
      .toFixed(2)
    return `I've been up for ${duration} days! I should take a nap.`
  },
  "I tell you how long I've been awake :timer:"
)

const unknownPhrase = RegExp(`${CMD_PREFIX}.*`)
export const unknown = new Response(
  '$unknown',
  unknownPhrase,
  msg => "What!? My ear's aren't as good as they used to be!",
  'You tried to do something new and different and it scared me :tired_face:'
)

export const commands = [help, ping, age, uptime, unknown]
