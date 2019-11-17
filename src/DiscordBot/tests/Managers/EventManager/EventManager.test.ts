import { BotEvent, EventManager } from '../../../Managers/EventManager'

const em = new EventManager()

describe('EventManager', () => {
  beforeEach(() => {
    const testEvent = new BotEvent({
      name: 'testEvent',
      callback: () => {}
    })

    em.registerEvents([testEvent])
  })

  afterEach(() => {
    em.unregisterEvents()
  })

  test('registers events', () => {
    const events = em.getEvents()
    expect(events.length).toBe(1)
  })

  test('unregisters events', () => {
    em.unregisterEvents()
    const events = em.getEvents()
    expect(events.length).toBe(0)
  })
})
