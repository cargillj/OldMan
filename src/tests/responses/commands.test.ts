import { help, ping, age, uptime, unknown } from '../../responses/commands'

describe('commands', () => {
  test('$ping command', () => {
    expect(help.isTriggered('$help')).toBeTruthy()
  })

  test('$ping command', () => {
    expect(ping.isTriggered('$ping')).toBeTruthy()
  })

  test('$age command', () => {
    expect(age.isTriggered('$age')).toBeTruthy()
  })

  test('$uptime command', () => {
    expect(uptime.isTriggered('$uptime')).toBeTruthy()
  })

  test('unknown command', () => {
    expect(unknown.isTriggered('$asdf')).toBeTruthy()
  })
})
