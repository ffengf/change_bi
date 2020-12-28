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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.api_login = void 0;
var user_1 = require("@/store/user");
var base_1 = require("./http/base");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.signin = function (data) {
        return this.post(data, '/user/login');
    };
    Login.prototype.signup = function (data) {
        return this.post(data);
    };
    Login.prototype.find_account = function (data) {
        return this.get(data, '/user/find_account/');
    };
    Login.prototype.send_sms = function (data) {
        return this.post(data, '/user/send_sms');
    };
    Login.prototype.check_username = function (data) {
        return this.post(data, '/user/check_username/');
    };
    Login.prototype.check_phone = function (data) {
        return this.post(data, '/user/check_phone/');
    };
    Login.prototype.check_sms = function (data) {
        return this.post(data, '/user/check_sms/');
    };
    Login.prototype.check_account = function (data) {
        return this.post(data, '/user/check_account/');
    };
    Login.prototype.edit_user = function (_a) {
        var id = _a.id, data = __rest(_a, ["id"]);
        return this.server.patch("/user/" + id + "/", data, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Authorization": "token=" + data.token
            }
        });
    };
    Login.prototype.edit_cover = function (avatar) {
        var _a;
        return this.patch({ avatar: avatar }, "/user/" + ((_a = user_1.UserModule.info) === null || _a === void 0 ? void 0 : _a.id) + "/");
    };
    return Login;
}(base_1.Http));
exports.api_login = new Login('/user/');
