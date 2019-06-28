(async() => {
    const server = require('../src/index')
    const darkSkyMock = require('../test/mock/DarkSky')
    darkSkyMock.start(8880).then(async() => {
        console.log('DarkSky Mock started on 8880')
        await server
    }).catch(error => {
        console.log(error.message)
    })
})()
