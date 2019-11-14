import {
  help,
  ping,
  age,
  uptime,
  pic,
  unknown
} from '../../../OldManBot/responses/commands'

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

  test('$pic command', () => {
    expect(pic.isTriggered('$pic')).toBeTruthy()
  })

  test('unknown command', () => {
    expect(unknown.isTriggered('$asdf')).toBeTruthy()
  })

  test("$ not at the beginning of message shouldn't trigger", () => {
    expect(unknown.isTriggered('this $ is in the middle')).toBeFalsy()
  })
})
