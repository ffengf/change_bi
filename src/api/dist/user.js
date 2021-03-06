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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.api_user = void 0;
var user_1 = require("@/store/user");
var base_1 = require("./http/base");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get_active = function (data) {
            return _this.get(__assign(__assign({}, data), { page_size: 5 }), '/user/activity/');
        };
        _this.get_coupon = function (data) {
            return _this.get(__assign(__assign({}, data), { page_size: 5 }), '/user/coupon/');
        };
        _this.get_club = function (data) {
            return _this.get(__assign(__assign({}, data), { page_size: 5 }), '/user/club/');
        };
        _this.get_pay = function (data) {
            return _this.get(__assign(__assign({}, data), { page_size: 5 }), '/order/');
        };
        _this.get_collect = function (data) {
            return _this.get(data, '/user/collect/');
        };
        return _this;
    }
    User.prototype.del_coupon = function (id) {
        return this["delete"](id, '/user/coupon/');
    };
    User.prototype.del_club = function (id) {
        return this.server["delete"]("/user/club/" + id + "/");
    };
    User.prototype.un_join_club = function (id) {
        return this.post({}, "/user/club/" + id + "/cancel/");
    };
    User.prototype.un_join_active = function (id) {
        return this.post({}, "/user/activity/" + id + "/cancel/");
    };
    User.prototype.del_active = function (id) {
        return this["delete"](id, '/user/activity/');
    };
    User.prototype.exchange_coupon = function (redeem_code) {
        return this.post({ redeem_code: redeem_code }, '/user/coupon/');
    };
    User.prototype.get_pay_coupon = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get({
                            type: type,
                            status: 0
                        }, '/user/coupon/')];
                    case 1:
                        results = (_a.sent()).results;
                        return [2 /*return*/, results];
                }
            });
        });
    };
    User.prototype.get_user_info = function () {
        return this.get({}, '/user/info/');
    };
    User.prototype.edit_pass = function (data) {
        return this.patch(data, '/user/password/');
    };
    User.prototype.edit_user = function (data) {
        var _a;
        return this.patch(data, "/user/" + ((_a = user_1.UserModule.info) === null || _a === void 0 ? void 0 : _a.id) + "/");
    };
    User.prototype.unregister = function () {
        return this.post({}, "/user/unregister");
    };
    return User;
}(base_1.Http));
exports.api_user = new User('/user/');
