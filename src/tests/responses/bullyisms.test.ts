import { bullyTemplate } from '../../responses/bullyisms'

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
})
