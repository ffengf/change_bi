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
exports.api_serial = void 0;
var base_1 = require("./http/base");
var Serial = /** @class */ (function (_super) {
    __extends(Serial, _super);
    function Serial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Serial.prototype.get_list = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(data)];
                    case 1:
                        results = (_a.sent()).results;
                        return [2 /*return*/, results];
                }
            });
        });
    };
    Serial.prototype.date_list = function () {
        return __awaiter(this, void 0, Promise, function () {
            var base, _a, top, today, o1, o2, o3, o4, o5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = {
                            page: 1,
                            page_size: 3
                        };
                        return [4 /*yield*/, Promise.all([
                                this.get_list(__assign(__assign({}, base), { is_switch_on: 1 })),
                                this.get_list(__assign(__assign({}, base), { day_of_week: new Date().getDay() - 1 })),
                                new Date().getDay() !== 1 ? this.get_list(__assign(__assign({}, base), { day_of_week: 0 })) : [],
                                new Date().getDay() !== 2 ? this.get_list(__assign(__assign({}, base), { day_of_week: 1 })) : [],
                                new Date().getDay() !== 3 ? this.get_list(__assign(__assign({}, base), { day_of_week: 2 })) : [],
                                new Date().getDay() !== 4 ? this.get_list(__assign(__assign({}, base), { day_of_week: 3 })) : [],
                                new Date().getDay() !== 5 ? this.get_list(__assign(__assign({}, base), { day_of_week: 4 })) : [],
                            ])];
                    case 1:
                        _a = _b.sent(), top = _a[0], today = _a[1], o1 = _a[2], o2 = _a[3], o3 = _a[4], o4 = _a[5], o5 = _a[6];
                        return [2 /*return*/, {
                                top: top, today: today, o1: o1, o2: o2, o3: o3, o4: o4, o5: o5
                            }];
                }
            });
        });
    };
    Serial.prototype.get_today = function () {
        return this.get_list({
            page: 1,
            page_size: 3,
            day_of_week: new Date().getDay() - 1
        });
    };
    Serial.prototype.get_info = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get({}, "" + this.uri + id + "/")];
            });
        });
    };
    Serial.prototype.get_chapter = function (data) {
        return this.get(__assign({ page_size: 10 }, data), '/book/chapter/');
    };
    Serial.prototype.get_id_name = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get({}, "/book/" + id + "/ids/")];
            });
        });
    };
    Serial.prototype.get_chapter_info = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get({}, "/book/chapter/" + id + "/")];
            });
        });
    };
    return Serial;
}(base_1.Http));
exports.api_serial = new Serial('/book/');
