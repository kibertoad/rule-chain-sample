const { assert } = require('chai')
const validationUtils = require('../../src/utils/validation.utils')

describe('validation.utils', () => {
  describe('mustBeEnum', () => {
    it('does not throw on valid enum', () => {
      assert.doesNotThrow(() => {
        validationUtils.mustBeEnum('B', { A: 'A', B: 'B' })
      })
    })

    it('throws an error on null', () => {
      assert.throws(() => {
        validationUtils.mustBeEnum(null, { A: 'A', B: 'B' })
      }, /Unknown enum value null/)
    })

    it('throws an error on not enum', () => {
      assert.throws(() => {
        validationUtils.mustBeEnum('C', { A: 'A', B: 'B' })
      }, /Unknown enum value C/)
    })
  })

  describe('mustBeNotNil', () => {
    it('does not throw on an object', () => {
      assert.doesNotThrow(() => {
        validationUtils.mustBeNotNil({})
      })
    })

    it('does not throw on a zero', () => {
      assert.doesNotThrow(() => {
        validationUtils.mustBeNotNil(0)
      })
    })

    it('does not throw on a false value', () => {
      assert.doesNotThrow(() => {
        validationUtils.mustBeNotNil(false)
      })
    })

    it('throws an error on null', () => {
      assert.throws(() => {
        validationUtils.mustBeNotNil(null)
      }, /Validated entity is null or undefined/)
    })

    it('throws an error on undefined', () => {
      assert.throws(() => {
        validationUtils.mustBeNotNil(null)
      }, /Validated entity is null or undefined/)
    })
  })
})
