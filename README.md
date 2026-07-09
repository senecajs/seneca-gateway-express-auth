![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin

# @seneca/gateway-express-auth

[![npm version](https://img.shields.io/npm/v/@seneca/gateway-express-auth.svg)](https://npmjs.com/package/@seneca/gateway-express-auth)
[![build](https://github.com/senecajs/seneca-gateway-express-auth/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-gateway-express-auth/actions/workflows/build.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-gateway-express-auth/badge.svg)](https://snyk.io/test/github/senecajs/seneca-gateway-express-auth)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

## Install

```sh
npm install @seneca/gateway-express-auth
```

## Quick Example

```js
const Seneca = require('seneca')
const GatewayExpressAuth = require('@seneca/gateway-express-auth')

Seneca().use(GatewayExpressAuth)
```

## More Examples

See [test/](test/) for more usage examples.

## Motivation

Authentication middleware for [seneca-gateway-express](https://github.com/senecajs/seneca-gateway-express).

## Support

If you're using this module and need help, you can:

- Post a [github issue](https://github.com/senecajs/seneca-gateway-express-auth/issues)
- Tweet to [@senecajs](http://twitter.com/senecajs)
- Ask on the [Gitter](https://gitter.im/senecajs/seneca)

## API

See [source](https://github.com/senecajs/seneca-gateway-express-auth) for API details.

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please get in touch.

### Running tests

```sh
npm run test
```

## Background

Works with [seneca-gateway](https://github.com/senecajs/seneca-gateway) and [seneca-gateway-express](https://github.com/senecajs/seneca-gateway-express).
