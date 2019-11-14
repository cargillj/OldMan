import { boomer } from '../../../OldManBot/responses/offensives'
import Response from '../../../DiscordBot/Managers/ResponseManager/Response'

describe('offensives', () => {
  beforeEach(() => {
    const mockIsRandomlyTriggered = jest.fn()
    Response.prototype.isRandomlyTriggered = mockIsRandomlyTriggered
    mockIsRandomlyTriggered.mockReturnValue(true)
  })
  test('ok boomer', () => {
    expect(boomer.isTriggered('ok boomer')).toBeTruthy()
  })
})
