import { boomer } from '../../responses/offensives'

describe('offensives', () => {
  test('ok boomer', () => {
    expect(boomer.isTriggered('ok boomer')).toBeTruthy()
  })
})
