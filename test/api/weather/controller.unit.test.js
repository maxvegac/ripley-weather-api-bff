const sinon = require('sinon')
const controller = require('../../../src/api/weather/controller')
const DarkSkyClient = require('../../../src/api/common/DarkSkyClient')
const RedisClient = require('../../../src/api/common/RedisClient')
const weatherAPIResponse = require('./weatherAPI.json')
const weatherRedisResponse = require('./weatherRedis.json')

describe('controller: weather', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  test('should answer from cache', async () => {
    sandbox.stub(RedisClient.prototype, 'getWeatherByPosition').returns(weatherRedisResponse)
    try {
      const response = await controller.getWeatherByPosition(0, 0)
      expect(response).toEqual(weatherRedisResponse)
    } catch (error) {
      expect(error.message).toBe('Bad Request')
    }
  })
  test('should answer from API', async () => {
    sandbox.stub(RedisClient.prototype, 'getWeatherByPosition').returns(null)
    sandbox.stub(DarkSkyClient.prototype, 'getWeatherByPosition').returns(weatherAPIResponse)
    try {
      const response = await controller.getWeatherByPosition(0, 0)
      expect(response).toEqual(weatherAPIResponse)
    } catch (error) {
      expect(error.message).toBe('Bad Request')
    }
  })
  test('should answer from cache even if both works', async () => {
    sandbox.stub(RedisClient.prototype, 'getWeatherByPosition').returns(weatherRedisResponse)
    sandbox.stub(DarkSkyClient.prototype, 'getWeatherByPosition').returns(weatherAPIResponse)
    try {
      const response = await controller.getWeatherByPosition(0, 0)
      expect(response).toEqual(weatherRedisResponse)
    } catch (error) {
      expect(error.message).toBe('Bad Request')
    }
  })
})
