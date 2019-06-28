const axios = require('axios')
const config = require('../../configuration')

class DarkSkyClient {
  constructor() {
    this.instance = axios.create({
      baseURL: `${config.get('DARKSKY_HOST')}${config.get('DARKSKY_PATH')}/${config.get('DARKSKY_API_KEY')}/`,
    })
  }

  getWeatherByPosition(latitude, longitude) {
    const errorProbability = Math.floor(Math.random() * (100))
    return new Promise((resolve, reject) => {
      if (errorProbability <= 10) {
          reject('Error simulation')
      }
      this.instance.request({
        method: 'get',
        url: `${latitude},${longitude}?lang=es&units=si`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else if (error.request) {
          reject(error.request)
        } else {
          reject(error.message)
        }
      })
    })
  }
}

module.exports = DarkSkyClient
