"use strict";
exports.__esModule = true;
exports.Http = void 0;
var axios_1 = require("axios");
var main_1 = require("@/main");
var user_1 = require("@/store/user");
var server = axios_1["default"].create({
    baseURL: 'http://13.125.137.129:8000',
    timeout: 10000,
    headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Accept-Language": 'kr;q=0.9'
    }
});
server.interceptors.request.use(function (config) {
    if (user_1.UserModule.token !== null && user_1.UserModule.token !== '') {
        config.headers.Authorization = "token=" + user_1.UserModule.token;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
server.interceptors.response.use(function (_a) {
    var data = _a.data, status = _a.status;
    if (data.code === 50001) {
        return data;
    }
    if (data.code === 4004) {
        main_1.app.$alert('잘못된 접근입니다. 홈페이지로 이동하겠습니다.', {
            confirmButtonText: '확인',
            callback: function () {
                main_1.app.$router.replace('/');
            }
        });
        return;
    }
    if (data.code) {
        main_1.app.$message.error(data.msg);
        return Promise.reject(data);
    }
    return data;
}, function (err) {
    var _a, _b, _c;
    if (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
        main_1.app.$message.error("\uAD8C\uD55C\uC774 \uBD80\uC5EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return Promise.reject(err);
    }
    if (((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.status) === 403) {
        var title = '';
        if (((_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data) === 4001) {
            title = '토큰 유효기간이 지났습니다.';
        }
        else {
            title = '로그인후 다시 시도해 주세요.';
        }
        main_1.app.$alert(title, {
            confirmButtonText: '로그인 하기',
            callback: function () {
                main_1.app.$router.push({
                    path: '/login',
                    query: {
                        last: main_1.app.$route.path
                    }
                });
            }
        });
        return Promise.reject(err);
    }
    main_1.app.$message.error("\uC11C\uBE44\uC2A4 \uC751\uB2F5 \uC624\uB958");
    return Promise.reject(err);
});
var Http = /** @class */ (function () {
    function Http(uri) {
        this.server = server;
        this.uri = uri;
    }
    Http.prototype.post = function (data, uri) {
        if (uri === void 0) { uri = this.uri; }
        return this.server.post(uri, data);
    };
    Http.prototype.get = function (params, uri) {
        if (uri === void 0) { uri = this.uri; }
        return this.server.get(uri, { params: params });
    };
    Http.prototype.patch = function (data, uri) {
        if (uri === void 0) { uri = this.uri; }
        return this.server.patch(uri, data);
    };
    Http.prototype["delete"] = function (id, uri) {
        if (uri === void 0) { uri = this.uri; }
        return this.server["delete"]("" + uri + id + "/");
    };
    return Http;
}());
exports.Http = Http;
