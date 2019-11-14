import { Response } from '../../../../DiscordBot/Managers/ResponseManager'
import { CMD_PREFIX, stats } from '../../../responses/commands'
import { serverText } from '../../../../utils/textStyler'

const helpPhrase = RegExp(`${CMD_PREFIX}help`)
export const help = new Response({
  name: '$help',
  trigger: helpPhrase,
  onTrigger: msg => {
    const helpText = commands.reduce(
      (acc, cmd) => (acc += `\`${cmd.name}\` - ${cmd.desc}\n\n`),
      ''
    )
    return `${helpText}`
  },
  desc: 'How did I get here again?'
})

const respectPhrase = RegExp(`${CMD_PREFIX}F`, 'gi')
export const payRespects = new Response({
  name: '$F',
  trigger: respectPhrase,
  onTrigger: msg =>
    serverText(
      'OldMan lies in the hospital bed, slowly regaining his strength'
    ),
  probability: 'always',
  desc: 'pay respects'
})

export const commands = [payRespects, stats, help]
