/* Copyright © 2021 Richard Rodger, MIT License. */

function gateway_express_auth(this: any, options: any) {
  const seneca: any = this
  const seneca_auth: any = get_auth_instance(seneca, options)


  seneca.act('sys:gateway,add:hook,hook:custom', {
    action: async (custom: any, _json: any, ctx: any) => {
      const token = ctx.req.cookies[options.cookie.name]
        
      const res = await seneca_auth.root.post('sys:user,auth:user', { token })

      if (res.ok) {
        // TODO: need a plugin, seneca-principal, to make this uniform
        custom.principal = { user: res.user }
      }
    }
  })

  seneca.act('sys:gateway,add:hook,hook:action', {
    action: async function(this: any, _msg: any, ctx: any) {
      const seneca: any = this
      const user = seneca?.fixedmeta?.custom?.principal?.user

      if (null == user) {
        ctx.res.sendStatus(401)
        return { done$: true }
      }

      return null
    }
  })


  return {
    name: 'gateway-express-auth'
  }
}


function get_auth_instance(seneca: any, options: any) {
  if (!seneca?.isSeneca) {
    throw new Error('The seneca arg must be a Seneca instance')
  }

  const make_seneca_auth = options?.seneca_auth

  if (null != make_seneca_auth &&
    'function' !== typeof make_seneca_auth)
  {
    throw new Error('The `seneca_auth` option must be a function')
  }


  const seneca_auth: any = 'function' === typeof make_seneca_auth
    ? make_seneca_auth()
    : seneca

  if (!seneca_auth?.isSeneca) {
    throw new Error(
      'The `seneca_auth` function must return a Seneca instance'
    )
  }

  return seneca_auth
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
