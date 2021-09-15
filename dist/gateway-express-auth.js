"use strict";
/* Copyright © 2021 Richard Rodger, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
function gateway_express_auth(options) {
    const seneca = this;
    const seneca_auth = get_auth_instance(seneca, options);
    seneca.act('sys:gateway,add:hook,hook:custom', {
        action: async (custom, _json, ctx) => {
            const token = ctx.req.cookies[options.cookie.name];
            const res = await seneca_auth.root.post('sys:user,auth:user', { token });
            if (res.ok) {
                // TODO: need a plugin, seneca-principal, to make this uniform
                custom.principal = { user: res.user };
            }
        }
    });
    seneca.act('sys:gateway,add:hook,hook:action', {
        action: async function (_msg, ctx) {
            var _a, _b, _c;
            const seneca = this;
            const user = (_c = (_b = (_a = seneca === null || seneca === void 0 ? void 0 : seneca.fixedmeta) === null || _a === void 0 ? void 0 : _a.custom) === null || _b === void 0 ? void 0 : _b.principal) === null || _c === void 0 ? void 0 : _c.user;
            if (null == user) {
                ctx.res.sendStatus(401);
                return { done$: true };
            }
            return null;
        }
    });
    return {
        name: 'gateway-express-auth'
    };
}
function get_auth_instance(seneca, options) {
    if (!(seneca === null || seneca === void 0 ? void 0 : seneca.isSeneca)) {
        throw new Error('The seneca arg must be a Seneca instance');
    }
    const make_seneca_auth = options === null || options === void 0 ? void 0 : options.seneca_auth;
    if (null != make_seneca_auth &&
        'function' !== typeof make_seneca_auth) {
        throw new Error('The `seneca_auth` option must be a function');
    }
    console.dir('LEL'); // dbg
    console.dir('function' === typeof make_seneca_auth); // dbg
    const seneca_auth = 'function' === typeof make_seneca_auth
        ? make_seneca_auth()
        : seneca;
    if (!(seneca_auth === null || seneca_auth === void 0 ? void 0 : seneca_auth.isSeneca)) {
        throw new Error('The `seneca_auth` function must return a Seneca instance');
    }
    return seneca_auth;
}
// Default options.
gateway_express_auth.defaults = {
    cookie: {
        name: 'seneca-auth'
    }
};
exports.default = gateway_express_auth;
if ('undefined' !== typeof (module)) {
    module.exports = gateway_express_auth;
}
//# sourceMappingURL=gateway-express-auth.js.map