"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.api_customer = void 0;
var base_1 = require("./http/base");
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get_notice = function (data) {
            return _this.get(__assign({ page_size: 10 }, data), '/notice/');
        };
        return _this;
    }
    Customer.prototype.get_notice_info = function (id) {
        return this.get({}, "/notice/" + id + "/");
    };
    Customer.prototype.get_faq = function (data) {
        return this.get(__assign({ page_size: 10 }, data), '/faq/');
    };
    Customer.prototype.get_qa = function (data) {
        return this.get(__assign({ page_size: 10 }, data), '/qa/');
    };
    Customer.prototype.get_home = function () {
        return this.get({ is_home: 1 }, '/notice/');
    };
    Customer.prototype.post_qa = function (data) {
        return this.post(data, '/qa/');
    };
    return Customer;
}(base_1.Http));
exports.api_customer = new Customer('');
