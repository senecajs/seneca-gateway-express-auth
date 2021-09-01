
const Seneca = require('seneca')
const Express = require('express')
const CookieParser = require('cookie-parser')

async function run() {

let seneca = Seneca({legacy:false})
    .test()
    .use('promisify')
    .use('entity')
    .use('user')
    .use('gateway')
    .use('gateway-express')
    .use('..')
    .message('foo:1', async function(m,meta) {
      return {x:m.x,p:meta.custom.principal}
    })

  let userRes = await seneca.post('sys:user,register:user', {
    email: 'alice@example.com'
  })

  let loginRes = await seneca.post('sys:user,login:user', {
    auto:true,
    email: 'alice@example.com'
  })

  console.log(userRes, loginRes)
  
  await seneca.ready()
  
  let app = Express()

  app
    .use(CookieParser())
    .use(Express.json())
    .use(seneca.export('gateway-express/handler'))
    .listen(8080)

  console.log(seneca.id)
}

run()

