/* Copyright © 2021 Richard Rodger, MIT License. */

function gateway_express_auth(this: any, options: any) {
  const seneca: any = this
  const root: any = seneca.root

  seneca.act('sys:gateway,add:hook,hook:custom', {
    action: async (custom: any, _json: any, ctx: any) => {
      const token = ctx.req.cookies[options.cookie.name]
      let res = await root.post('sys:user,auth:user', { token })
      if (res.ok) {
        // TODO: need a plugin, seneca-principal, to make this uniform
        custom.principal = { user: res.user }
      }
    }
  })

  seneca.act('sys:gateway,add:hook,hook:action', {
    action: async function(this: any, _msg: any, ctx: any) {
      let seneca: any = this
      let user = seneca?.fixedmeta?.custom?.principal?.user
      if (null == user) {
        ctx.res.sendStatus(401)
        return { done$: true }
      }
    }
  })


  return {
    name: 'gateway-express-auth'
  }
}


// Default options.
gateway_express_auth.defaults = {

  cookie: {
    name: 'seneca-auth'
  }
}


export default gateway_express_auth

if ('undefined' !== typeof (module)) {
  module.exports = gateway_express_auth
}
