import { Stat, StatManager } from '../../../../DiscordBot/Managers/StatManager'

const sm = new StatManager()

describe('StatManager', () => {
  beforeEach(() => {
    const testStat = new Stat({
      name: 'testStat',
      listeners: [],
      startVal: 100
    })

    sm.registerStats([testStat])
  })

  afterEach(() => {
    sm.unregisterStat('testStat')
  })

  test('registers stat', () => {
    const stats = sm.getStats()
    expect(stats.length).toBe(1)
  })

  test('unregisters stat', () => {
    sm.unregisterStat('testStat')
    const stats = sm.getStats()
    expect(stats.length).toBe(0)
  })
})
