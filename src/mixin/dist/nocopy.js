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
exports.__esModule = true;
exports.Nocopy = void 0;
var vue_property_decorator_1 = require("vue-property-decorator");
var Nocopy = /** @class */ (function (_super) {
    __extends(Nocopy, _super);
    function Nocopy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nocopy.prototype.mounted = function () {
        document.oncontextmenu = function (event) {
            event.returnValue = false;
        };
        document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 123) {
                e.returnValue = false;
                return false;
            }
        };
        document.onselectstart = function (event) {
            event.returnValue = false;
        };
    };
    Nocopy.prototype.destroyed = function () {
        document.oncontextmenu = function (event) {
            event.returnValue = true;
        };
        document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 123) {
                e.returnValue = true;
                return true;
            }
        };
        document.onselectstart = function (event) {
            event.returnValue = true;
        };
    };
    Nocopy = __decorate([
        vue_property_decorator_1.Component
    ], Nocopy);
    return Nocopy;
}(vue_property_decorator_1.Vue));
exports.Nocopy = Nocopy;
