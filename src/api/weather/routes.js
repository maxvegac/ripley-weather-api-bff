const express = require('express')

const router = express.Router()
const controller = require('./controller')

router.route('/:latitude/:longitude').get(async (req, res) => {
  try {
    const weather = await controller.getWeatherByPosition(req.params.latitude, req.params.longitude)
    if (!weather) {
      res.status(500).send('Weather')
      return
    }
    res.status(200).send(weather)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
