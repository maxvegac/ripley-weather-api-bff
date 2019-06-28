const asyncRedis = require('async-redis')
const config = require('../../configuration')

class RedisClient {
  constructor() {
    this.instance = asyncRedis.createClient(config.get('REDIS_PORT'), config.get('REDIS_HOST'))
    this.instance.on('error', (err) => {
      throw new Error(err.message)
    })
  }

  async getWeatherByPosition(latitude, longitude) {
    return JSON.parse(await this.instance.get(`${latitude},${longitude}`))
  }

  async setWeatherByPosition(latitude, longitude, data) {
    return this.instance.set(`${latitude},${longitude}`, JSON.stringify(data), 'EX', config.get('WEATHER_EXPIRATION_SECONDS'))
  }
}

module.exports = RedisClient
