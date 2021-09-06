"use strict";
/* Copyright © 2021 Richard Rodger, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
function gateway_express_auth(options) {
    const seneca = this;
    const root = seneca.root;
    seneca.act('sys:gateway,add:hook,hook:custom', {
        action: async (custom, _json, ctx) => {
            const token = ctx.req.cookies[options.cookie.name];
            let res = await root.post('sys:user,auth:user', { token });
            if (res.ok) {
                // TODO: need a plugin, seneca-principal, to make this uniform
                custom.principal = { user: res.user };
            }
        }
    });
    seneca.act('sys:gateway,add:hook,hook:action', {
        action: async function (_msg, ctx) {
            var _a, _b, _c;
            let seneca = this;
            let user = (_c = (_b = (_a = seneca === null || seneca === void 0 ? void 0 : seneca.fixedmeta) === null || _a === void 0 ? void 0 : _a.custom) === null || _b === void 0 ? void 0 : _b.principal) === null || _c === void 0 ? void 0 : _c.user;
            if (null == user) {
                ctx.res.sendStatus(401);
                return { done$: true };
            }
        }
    });
    return {
        name: 'gateway-express-auth'
    };
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