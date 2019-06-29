const sinon = require('sinon')
const MockAdapter = require('axios-mock-adapter')
const axios = require('axios')
const DarkSkyClient = require('../../../src/api/common/DarkSkyClient')

describe('client: DarkSky', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  test('should throw error when response is bad', async () => {
    const mock = new MockAdapter(axios)
    mock.onGet().reply(500, 'Bad Request')
    try {
      await new DarkSkyClient().getWeatherByPosition(-43.54846570598196, -69.14173468749999)
    } catch (error) {
      expect(error.message).toBe('Bad Request')
    }
  })
})
