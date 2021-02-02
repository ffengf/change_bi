"use strict";
exports.__esModule = true;
exports.toTop = void 0;
exports.toTop = function () {
    var _a;
    var div = (_a = document.getElementById('scrollbar')) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('el-scrollbar__wrap')[0];
    div && (div.scrollTop = 0);
};
