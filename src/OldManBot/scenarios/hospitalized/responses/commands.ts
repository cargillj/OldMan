import { Response } from '../../../../DiscordBot'
import { CMD_PREFIX, stats } from '../../../responses/commands'
import { serverText } from '../../../utils/textStyler'

const helpPhrase = RegExp(`${CMD_PREFIX}help`)
export const help = new Response({
  name: '$help',
  trigger: helpPhrase,
  onTrigger: [
    () => {
      const helpText = commands.reduce(
        (acc, cmd) => (acc += `\`${cmd.name}\` - ${cmd.desc}\n\n`),
        ''
      )
      return `${helpText}`
    }
  ],
  desc: 'How did I get here again?'
})

const respectPhrase = RegExp(`${CMD_PREFIX}F`, 'gi')
const quietResponses = [
  () =>
    `${serverText(
      'OldMan says something too quietly to hear. You put your ear next to his mouth. He says one word:'
    )}\n\n **nut**`,
  () =>
    `${serverText(
      'OldMan says something quietly to hear. You put your ear next to his mouth.'
    )}\n\n **You should have used $feed more**`,
  () =>
    `${serverText(
      'OldMan says something quietly. You put your ear next to his mouth. He gives you a wet willy and says:'
    )}\n\n **get rekt nerd**`
]

export const payRespects = new Response({
  name: '$F',
  trigger: respectPhrase,
  onTrigger: [
    () =>
      serverText(
        'OldMan lies in the hospital bed, slowly regaining his strength'
      ),
    () => serverText('OldMan passes gas. It smells.'),
    ...quietResponses
  ],
  probability: 'always',
  desc: 'pay respects'
})

const unknownPhrase = RegExp(`${CMD_PREFIX}*`, 'gi')
export const unresponsive = new Response({
  name: '$unknown',
  trigger: unknownPhrase,
  onTrigger: [
    () =>
      serverText('OldMan will be unresponsive until he regains consciousness.')
  ],
  desc: 'you used an unknown command'
})

export const commands: Response[] = [payRespects, stats, help, unresponsive]
