const DarkSkyClient = require('../common/DarkSkyClient')
const RedisClient = require('../common/RedisClient')

const redisClient = new RedisClient()
const darkSkyClient = new DarkSkyClient()

exports.getWeatherByPosition = async (latitude, longitude) => {
  try {
    const cachedWeatherResponse = await redisClient.getWeatherByPosition(latitude, longitude)
    if (cachedWeatherResponse) {
      return cachedWeatherResponse
    }
    let weatherResponse = null
    tries = 1
    while (!weatherResponse) {
      try {
        weatherResponse = await darkSkyClient.getWeatherByPosition(latitude, longitude)
      } catch (e) {
        console.log('Error getting DarkSky from DarkSky, retrying...')
      }
      tries += 1
      if (tries === 5) {
        throw new Error('DarkSky API retries exhausted (5 times)')
      }
    }
    await redisClient.setWeatherByPosition(latitude, longitude, weatherResponse)
    return weatherResponse
  } catch (error) {
    throw new Error(error.message)
  }
}
