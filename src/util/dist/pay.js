"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.pay = void 0;
var user_1 = require("@/store/user");
exports.pay = function (amount, pay_method, other) {
    if (other === void 0) { other = {}; }
    var pg = {
        phone: 'danal',
        trans: 'danal_tpay',
        card: 'danal_tpay',
        naverpay: 'naverpay'
    }[pay_method];
    return new Promise(function (resolve, reject) {
        var _a, _b, _c, _d, _e;
        try {
            IMP.request_pay(__assign(__assign({ name: '', buyer_email: (_a = user_1.UserModule.info) === null || _a === void 0 ? void 0 : _a.username, buyer_name: (_b = user_1.UserModule.info) === null || _b === void 0 ? void 0 : _b.real_name, buyer_tel: (_c = user_1.UserModule.info) === null || _c === void 0 ? void 0 : _c.phone, buyer_addr: (_d = user_1.UserModule.info) === null || _d === void 0 ? void 0 : _d.address_detail, buyer_postcode: (_e = user_1.UserModule.info) === null || _e === void 0 ? void 0 : _e.address_code, pg: pg, merchant_uid: "switch_" + new Date().getTime() }, other), { amount: amount,
                pay_method: pay_method }), function (res) {
                if (res.success) {
                    resolve(res);
                }
                else {
                    reject(res);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
