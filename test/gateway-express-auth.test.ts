
import GatewayExpressAuth from '../src/gateway-express-auth'
import { Maintain } from '@seneca/maintain'

const Seneca = require('seneca')


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

  test('maintain', Maintain)
  
})
