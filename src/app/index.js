const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const weatherRoutes = require('../api/weather/routes')
const healthRoutes = require('../api/health/controller')

const app = express()

app.use(cors())
app.use(logger('combined'))
app.use('/weather', weatherRoutes)
app.use('/', healthRoutes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})


module.exports = app
