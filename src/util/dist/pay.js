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
exports.pay = function (amount, pay_method, other) {
    if (other === void 0) { other = {}; }
    return new Promise(function (resolve, reject) {
        try {
            IMP.request_pay(__assign(__assign({ pg: 'inicis', name: '주문명:결제테스트', buyer_email: 'iamport@siot.do', buyer_name: '구매자이름', buyer_tel: '01052301547', buyer_addr: '서울특별시 강남구 삼성동', buyer_postcode: '123-456', merchant_uid: "switch_" + new Date().getTime() }, other), { amount: amount,
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
