import Response from '../../ResponseManager/Response'
import { Client } from '../../ResponseManager'

describe('ResponseManager', () => {
  beforeEach(() => {
    const testResponse = new Response('tester', RegExp('!test'), () => 'tested')
    Client.registerResponse(testResponse)
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
