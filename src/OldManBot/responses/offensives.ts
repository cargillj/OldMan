import { Response } from '../../DiscordBot'

const boomerPhrase = RegExp('ok,? boomer', 'gi')
export const boomer = new Response({
  name: 'okBoomer',
  trigger: boomerPhrase,
  onTrigger: () =>
    '_Ok millenial_, you can go and cry in your safe space now :baby:',
  probability: 'sometimes'
})

export const offensives = [boomer]
