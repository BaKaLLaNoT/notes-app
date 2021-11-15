const { average } = require('../utils/for_testing')

describe('average', () => {
  test.skip('of one value is the value itself', () => {
    const result = average([1])
    expect(result).toBe(1)
  })

  test.skip('of one value is the value itself', () => {
    const result = average([1, 2, 3, 4, 5, 6])
    expect(result).toBe(3.5)
  })
})
