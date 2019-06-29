const mockServer = require('mockttp').getLocal()
const weatherResponse = require('./weather.json')

mockServer
  .get(/\/forecast\/[\s\S]*\/[\s\S]/)
  .thenReply(200, JSON.stringify(weatherResponse))

function start(port) {
  return mockServer.start(port)
}

function stop() {
  return mockServer.stop()
}

module.exports = {
  start,
  stop,
}
