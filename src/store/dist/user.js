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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserModule = void 0;
var api_1 = require("@/api");
var vuex_module_decorators_1 = require("vuex-module-decorators");
var storage_1 = require("@/util/storage");
var index_1 = require("./index");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TOKEN = storage_1["default"].getLocal('token');
        _this.INFO = null;
        return _this;
    }
    User.prototype.LOGIN = function (_a) {
        var token = _a.token;
        this.TOKEN = token;
    };
    User.prototype.LOGOUT = function () {
        this.TOKEN = null;
        this.INFO = null;
    };
    User.prototype.login = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api_1.api_login.signin(info)];
                    case 1:
                        data = _a.sent();
                        storage_1["default"].setLocal('token', data.token);
                        this.LOGIN(data);
                        this.get_info();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.logout = function () {
        storage_1["default"].removeLocal('token');
        this.LOGOUT();
    };
    User.prototype.get_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, username, phone, real_name, avatar, address, address_code, address_detail;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.TOKEN === null) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, api_1.api_user.get_user_info()];
                    case 1:
                        _a = _b.sent(), id = _a.id, username = _a.username, phone = _a.phone, real_name = _a.real_name, avatar = _a.avatar, address = _a.address, address_code = _a.address_code, address_detail = _a.address_detail;
                        this.SET_INFO({ id: id, username: username, phone: phone, real_name: real_name, avatar: avatar, address: address, address_code: address_code, address_detail: address_detail });
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.set_info = function (info) {
        var id = info.id, username = info.username, phone = info.phone, real_name = info.real_name, avatar = info.avatar, address = info.address, address_code = info.address_code, address_detail = info.address_detail;
        this.SET_INFO({ id: id, username: username, phone: phone, real_name: real_name, avatar: avatar, address: address, address_code: address_code, address_detail: address_detail });
    };
    User.prototype.SET_INFO = function (_a) {
        var id = _a.id, username = _a.username, phone = _a.phone, real_name = _a.real_name, avatar = _a.avatar, address = _a.address, address_code = _a.address_code, address_detail = _a.address_detail;
        this.INFO = { id: id, username: username, phone: phone, real_name: real_name, avatar: avatar, address: address, address_code: address_code, address_detail: address_detail };
    };
    Object.defineProperty(User.prototype, "token", {
        get: function () {
            return this.TOKEN;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "info", {
        get: function () {
            return this.INFO;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        vuex_module_decorators_1.Mutation
    ], User.prototype, "LOGIN");
    __decorate([
        vuex_module_decorators_1.Mutation
    ], User.prototype, "LOGOUT");
    __decorate([
        vuex_module_decorators_1.Action
    ], User.prototype, "login");
    __decorate([
        vuex_module_decorators_1.Action
    ], User.prototype, "logout");
    __decorate([
        vuex_module_decorators_1.Action
    ], User.prototype, "get_info");
    __decorate([
        vuex_module_decorators_1.Action
    ], User.prototype, "set_info");
    __decorate([
        vuex_module_decorators_1.Mutation
    ], User.prototype, "SET_INFO");
    User = __decorate([
        vuex_module_decorators_1.Module({ name: 'user', dynamic: true, namespaced: true, stateFactory: true, store: index_1["default"] })
    ], User);
    return User;
}(vuex_module_decorators_1.VuexModule));
exports["default"] = User;
exports.UserModule = vuex_module_decorators_1.getModule(User);
