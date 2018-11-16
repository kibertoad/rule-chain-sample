const { assert } = require('chai')
const arrayUtils = require('../../src/utils/array.utils')

describe('array.utils', () => {
  describe('ensureArray', () => {
    it('wraps non-array into array', () => {
      const result = arrayUtils.ensureArray({ field: 'dummy' })

      assert.deepEqual(result, [{ field: 'dummy' }])
    })

    it('wraps null into array', () => {
      const result = arrayUtils.ensureArray(null)

      assert.deepEqual(result, [null])
    })

    it('leaves array as-is', () => {
      const originalArray = [{ field: 'dummy' }]

      const result = arrayUtils.ensureArray(originalArray)

      assert.equal(result, originalArray)
    })
  })
})
