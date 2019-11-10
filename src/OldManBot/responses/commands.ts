import moment from 'moment'
import axios from 'axios'
import Response from '../../DiscordBot/Managers/ResponseManager/Response'
import DiscordBot from '../../DiscordBot'
import * as auth from '../../auth.json'

const CMD_PREFIX = '^\\$'

const helpPhrase = RegExp(`${CMD_PREFIX}help`)
export const help = new Response({
  name: '$help',
  trigger: helpPhrase,
  onTrigger: msg => {
    const helpText = commands.reduce(
      (acc, cmd) => (acc += `\`${cmd.name}\` - ${cmd.desc}\n\n`),
      ''
    )
    return `**I swear I used to be able to do more stuff** :sob: \n${helpText}`
  },
  desc: 'How did I get here again?'
})

const pingPhrase = RegExp(`${CMD_PREFIX}ping`)
export const ping = new Response({
  name: '$ping',
  trigger: pingPhrase,
  onTrigger: msg => 'pong! :ping_pong:',
  desc: 'I might be slow these days but I can still slap balls with you'
})

const agePhrase = RegExp(`${CMD_PREFIX}age`)
export const age = new Response({
  name: '$age',
  trigger: agePhrase,
  onTrigger: msg => `I'm **${DiscordBot.id}** years _young_`,
  desc: "I'll candidly tell you my age :blush:"
})

const uptimePhrase = RegExp(`${CMD_PREFIX}uptime`)
export const uptime = new Response({
  name: '$uptime',
  trigger: uptimePhrase,
  onTrigger: msg => {
    const duration = moment
      .duration(moment().diff(moment(DiscordBot.birthDate)))
      .asDays()
      .toFixed(2)
    return `I've been up for ${duration} days! I should take a nap.`
  },
  desc: "I tell you how long I've been awake :timer:"
})

const picPhrase = RegExp(`${CMD_PREFIX}pic`)
export const pic = new Response({
  name: '$pic',
  trigger: picPhrase,
  onTrigger: async msg => {
    const url =
      'https://oldman.cognitiveservices.azure.com/bing/v7.0/images/search?q=old+person'
    const search = await axios.get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': auth.bingToken
      }
    })

    if (search.status === 200 && search.data.value.length) {
      const resultArray = search.data.value
      return resultArray[
        Math.floor(Math.random() * Math.floor(resultArray.length - 1))
      ].contentUrl
    } else {
      return "I can't find any pictures. What was I looking for again?"
    }
  },
  desc: "Here's a photograph of my old ragtag posse!"
})

const unknownPhrase = RegExp(`${CMD_PREFIX}.*`)
export const unknown = new Response({
  name: '$unknown',
  trigger: unknownPhrase,
  onTrigger: msg => "What!? My ear's aren't as good as they used to be!",
  desc:
    'You tried to do something new and different and it scared me :tired_face:'
})

export const commands = [help, ping, age, uptime, pic, unknown]
