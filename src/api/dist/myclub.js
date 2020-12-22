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
exports.api_myclub = void 0;
var base_1 = require("./http/base");
var Myclub = /** @class */ (function (_super) {
    __extends(Myclub, _super);
    function Myclub() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.notice_list = function (data) {
            return _this.get(__assign({ page_size: 5 }, data), '/club/notice/');
        };
        _this.task_list = function (data) {
            return _this.get(__assign({ page_size: 5 }, data), '/club/task/');
        };
        _this.task_attend_list = function (data) {
            return _this.get(data, "/club/attend/");
        };
        return _this;
    }
    Myclub.prototype.notice_info = function (id) {
        return this.get({}, "/club/notice/" + id + "/");
    };
    Myclub.prototype.task_info = function (id) {
        return this.get({}, "/club/task/" + id + "/");
    };
    Myclub.prototype.add_attend = function (_a) {
        var id = _a.id, data = __rest(_a, ["id"]);
        return this.post(data, "/club/attend/");
    };
    Myclub.prototype.edit_attend = function (_a) {
        var id = _a.id, data = __rest(_a, ["id"]);
        var req = {
            attach: data.attach,
            content: data.content,
            title: data.title,
            file_name: data.file_name
        };
        return this.patch(req, "/club/attend/" + id + "/");
    };
    Myclub.prototype.attend_info = function (id) {
        return this.get({}, "/club/attend/" + id + "/");
    };
    Myclub.prototype.comment_info = function (id) {
        return this.get({}, "/club/attend/" + id + "/");
    };
    Myclub.prototype.send_comment = function (data) {
        return this.post(data, '/club/comment/');
    };
    Myclub.prototype.remove_comment = function (id) {
        return this["delete"](id, '/club/comment/');
    };
    Myclub.prototype.edit_comment = function (_a) {
        var id = _a.id, content = _a.content;
        return this.patch({ content: content }, "/club/comment/" + id + "/");
    };
    return Myclub;
}(base_1.Http));
exports.api_myclub = new Myclub('/user/');
