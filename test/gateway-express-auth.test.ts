
import GatewayExpressAuth from '../src/gateway-express-auth'

const Seneca = require('seneca')

const { Maintain } = require('@seneca/maintain')

describe('gateway-express-auth', () => {

  test('happy', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('gateway')
      .use('gateway-express')
      .use(GatewayExpressAuth)
    await seneca.ready()
  })

})

Maintain()
