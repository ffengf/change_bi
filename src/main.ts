import 'babel-polyfill'

import Vue from 'vue';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import router from './router';
import i18n from '@/i18n'
import { Device } from "@/mixin/size"
import store from './store';
import "@/assets/style/reset.css"
import "@/assets/style/element_phone.less"
import "@/assets/style/reset_ele.less"
import 'element-ui/lib/theme-chalk/display.css';
import { OtherModule } from './store/other';



Vue.config.productionTip = false;

Vue.use(Element)

Vue.mixin(Device)
OtherModule.check()

export const app = new Vue({
	router,
	i18n,
	store,
	render: (h) => h(App),
}).$mount('#app');
