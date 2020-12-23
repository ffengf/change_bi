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
exports.api_club = void 0;
var base_1 = require("./http/base");
var Club = /** @class */ (function (_super) {
    __extends(Club, _super);
    function Club() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get_creation_list = function (data) {
            return _this.get_list(__assign(__assign({}, data), { type: 0 }));
        };
        _this.get_apply_list = function (data) {
            return _this.get_list(__assign(__assign({}, data), { type: 1 }));
        };
        return _this;
    }
    Club.prototype.get_list = function (data) {
        return this.get(__assign({ page_size: 10 }, data));
    };
    Club.prototype.get_info = function (id) {
        return this.get({}, "" + this.uri + id + "/");
    };
    Club.prototype.join = function (id) {
        return this.post({ status: 1 }, "/club/" + id + "/apply/");
    };
    Club.prototype.pay_join = function (data) {
        return this.post(data, '/order/');
    };
    Club.prototype.pay_check = function (club_id, coupon_id) {
        return this.post({ coupon_id: coupon_id }, "/club/" + club_id + "/check/");
    };
    return Club;
}(base_1.Http));
exports.api_club = new Club('/club/');
