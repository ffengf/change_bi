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
exports.api_active = void 0;
var base_1 = require("./http/base");
var Active = /** @class */ (function (_super) {
    __extends(Active, _super);
    function Active() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get_list = function (data) {
            return _this.get(__assign(__assign({}, data), { page_size: 9 }));
        };
        return _this;
    }
    Active.prototype.get_info = function (id) {
        return this.get({}, "/book/activity/" + id + "/");
    };
    Active.prototype.join = function (id, apply_reason) {
        return this.post({ status: 1, apply_reason: apply_reason }, "/book/activity/" + id + "/apply/");
    };
    return Active;
}(base_1.Http));
exports.api_active = new Active('/book/activity/');
