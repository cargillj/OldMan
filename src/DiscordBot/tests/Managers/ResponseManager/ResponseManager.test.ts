import { Response, ResponseManager } from '../../../Managers/ResponseManager'

jest.mock('discord.io')
import Discord from 'discord.io'
const mockDiscordClient = new Discord.Client({ token: 'asdf' })
const Client = new ResponseManager(mockDiscordClient)

describe('ResponseManager', () => {
  beforeEach(() => {
    const testResponse = new Response({
      name: 'tester',
      trigger: RegExp('!test'),
      onTrigger: () => 'tested'
    })

    Client.registerResponses([testResponse])
  })

  afterEach(() => {
    Client.clearResponses()
  })

  test('registers response', () => {
    const responses = Client.getResponseList()
    expect(responses.length).toBe(1)
    expect(responses).toEqual(['tester'])
  })

  test('unregisters response', () => {
    Client.unregisterResponse('tester')
    const responses = Client.getResponseList()
    expect(responses.length).toBe(0)
  })
})
