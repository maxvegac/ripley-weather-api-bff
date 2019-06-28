const server = require('./../src/app')

const mockListen = jest.fn()
server.listen = mockListen

describe('Index', () => {
  afterEach(() => {
    mockListen.mockReset()
  })

  test('should start server in default port', async() => {
    require('./../src/index')
    expect(mockListen.mock.calls.length).toBe(1)
    expect(mockListen.mock.calls[0][0]).toBe(process.env.PORT || 3000)
  })
})
