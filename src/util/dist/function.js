"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.throttle = exports.debounce = void 0;
exports.debounce = function (fn, wait) {
    var timeout = null;
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (timeout !== null) {
            clearInterval(timeout);
        }
        timeout = setTimeout(fn.bind.apply(fn, __spreadArrays([null], arg)), wait);
    };
};
exports.throttle = function (func, wait) {
    var lastTime = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        var coolingDown = now - lastTime < wait;
        if (coolingDown) {
            return;
        }
        lastTime = Date.now();
        func.apply(null, args);
    };
};
