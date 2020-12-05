import 'babel-polyfill'
import "vue-tsx-support/enable-check";
import Vue from 'vue';
import Element from 'element-ui'

import App from './App.vue';
import router from './router';
import i18n from '@/i18n'
import { Loading } from "@/mixin/loading"
import store from './store';
import "@/assets/style/reset.less"
import "@/assets/style/element_phone.less"
import "@/assets/style/reset_ele.less"
import 'element-ui/lib/theme-chalk/display.css';
import '@/assets/style/element-variables.scss'
import { OtherModule } from './store/other';

// document.oncontextmenu = function(){ return false; };
// // 禁止文字选择
// document.onselectstart = function(){ return false; };
// // 禁止复制
// document.oncopy = function(){ return false; };
// // 禁止剪切
// document.oncut = function(){ return false; };
// // 禁止粘贴
// document.onpaste = function(){ return false; };
Vue.config.productionTip = true;

Vue.use(Element)
Vue.mixin(Loading)

export const app = new Vue({
	router,
	i18n,
	store,
	render: h => h(App),
}).$mount('#app');
