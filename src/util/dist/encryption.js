"use strict";
exports.__esModule = true;
exports.Encryption = void 0;
var Encryption = /** @class */ (function () {
    function Encryption() {
    }
    Encryption.base_enc = function (str) {
        return btoa(str.toString());
    };
    Encryption.base_dec = function (str) {
        return atob(str);
    };
    return Encryption;
}());
exports.Encryption = Encryption;
