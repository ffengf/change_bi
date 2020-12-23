"use strict";
exports.__esModule = true;
exports.app = void 0;
require("babel-polyfill");
require("vue-tsx-support/enable-check");
var vue_1 = require("vue");
var element_ui_1 = require("element-ui");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var i18n_1 = require("@/i18n");
var loading_1 = require("@/mixin/loading");
var store_1 = require("./store");
require("@/assets/style/reset.less");
require("@/assets/style/element_phone.less");
require("@/assets/style/reset_ele.less");
require("element-ui/lib/theme-chalk/display.css");
require("@/assets/style/element-variables.scss");
var user_1 = require("@/store/user");
IMP.init('imp07867187');
vue_1["default"].config.productionTip = true;
vue_1["default"].use(element_ui_1["default"]);
vue_1["default"].mixin(loading_1.Loading);
user_1.UserModule.get_info();
exports.app = new vue_1["default"]({
    router: router_1["default"],
    i18n: i18n_1["default"],
    store: store_1["default"],
    render: function (h) { return h(App_vue_1["default"]); }
}).$mount('#app');
