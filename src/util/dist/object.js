"use strict";
exports.__esModule = true;
exports.clean = void 0;
var ramda_1 = require("ramda");
exports.clean = function (data) {
    return ramda_1.filter(function (x) { return x !== ""; }, data);
};
