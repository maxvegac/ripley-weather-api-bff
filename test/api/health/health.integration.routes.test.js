const server = require('../../../src/app/index')
const request = require('supertest')

describe('routes: index (health)', () => {
  test('should respond as expected', async() => {
    const response = await request(server.callback()).get('/health')
    expect(response.status).toEqual(200)
    expect(response.body.status).toEqual('UP')
  })
})
