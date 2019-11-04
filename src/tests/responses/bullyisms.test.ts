import { bullyTemplate, millenialRage } from '../../responses/bullyisms'

describe('bullyisms', () => {
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
      bullyTemplate.isTriggered('this sentence shouldnt trigger')
    ).toBeFalsy()
  })

  test('millenial rage', () => {
    expect(
      millenialRage.isTriggered(
        'back in my #day'
      )
    ).toBeTruthy()

    expect(
      millenialRage.isTriggered(
        '<cfoutput>#cfcatch#</cfoutput>'
      )
    ).toBeTruthy()

    expect(
      millenialRage.isTriggered(
        'hashtag blessed'
      )
    ).toBeFalsy()
  })
})
