import { Stat } from '../../DiscordBot/Managers/StatManager'

const HEALTH_MAX = 100

const maxHealthListener = (stat: Stat) => {
  if (stat.value > 100) stat.value = 100
}

const health = new Stat({
  name: 'health',
  icon: '❤️',
  listeners: [maxHealthListener],
  startVal: HEALTH_MAX
})

export default health
