"use strict";
exports.__esModule = true;
exports.editor_length = exports.numFormat = void 0;
function numFormat(num) {
    return num.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            return $1 + ",";
        });
    });
}
exports.numFormat = numFormat;
function editor_length(html_str) {
    var reg = /<.+?>/g;
    return html_str.replace(reg, '').length;
}
exports.editor_length = editor_length;
