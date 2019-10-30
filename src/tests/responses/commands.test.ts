import { ping, unknown } from '../../responses/commands'

describe('commands', () => {
  test('$ping triggers ping command', () => {
    expect(ping.isTriggered('$ping')).toBeTruthy()
  })

  test('unknown command', () => {
    expect(unknown.isTriggered('$asdf')).toBeTruthy()
  })
})
