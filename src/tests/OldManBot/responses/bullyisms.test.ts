import {
  bullyTemplate,
  millenialRage
} from '../../../OldManBot/responses/bullyisms'
import Response from '../../../DiscordBot/Managers/ResponseManager/Response'

describe('bullyisms', () => {
  beforeEach(() => {
    const mockIsRandomlyTriggered = jest.fn()
    Response.prototype.isRandomlyTriggered = mockIsRandomlyTriggered
    mockIsRandomlyTriggered.mockReturnValue(true)
  })
  test('responds to bully template', () => {
    expect(
      bullyTemplate.isTriggered(
        'its been fun hanging out with my friends and john'
      )
    ).toBeTruthy()

    expect(
      bullyTemplate.isTriggered(
        'its been fun hanging out with friends and john'
      )
    ).toBeTruthy()

    expect(
      bullyTemplate.isTriggered(
        'its been fun hanging out with friends and john and other people'
      )
    ).toBeTruthy()

    expect(
      bullyTemplate.isTriggered(
        'Its been FUN hanging out with Friends and john and other People'
      )
    ).toBeTruthy()

    expect(
      bullyTemplate.isTriggered('this sentence shouldnt trigger')
    ).toBeFalsy()
  })

  test('millenial rage', () => {
    expect(millenialRage.isTriggered('back in my #day')).toBeTruthy()

    expect(
      millenialRage.isTriggered('<cfoutput>#cfcatch#</cfoutput>')
    ).toBeTruthy()

    expect(millenialRage.isTriggered('hashtag blessed')).toBeFalsy()
  })
})
