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
    while (!weatherResponse) {
      try {
        weatherResponse = await darkSkyClient.getWeatherByPosition(latitude, longitude)
      } catch (e) {
        console.log('Error getting DarkSky from DarkSky, retrying...')
      }
    }
    await redisClient.setWeatherByPosition(latitude, longitude, weatherResponse)
    return weatherResponse
  } catch (error) {
    throw new Error(error.message)
  }
}
