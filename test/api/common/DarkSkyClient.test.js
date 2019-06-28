const DarkSkyClient = require('../../../src/api/common/DarkSkyClient')
const weatherResponse = require('./weather.json')
const sinon = require('sinon')

describe('controller: slot windows', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })


})
