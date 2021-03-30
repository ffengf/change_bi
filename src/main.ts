import 'babel-polyfill'
import "vue-tsx-support/enable-check";
import Vue from 'vue';
import Element, { Message } from 'element-ui'
import VueSocialSharing from 'vue-social-sharing'

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
import { UserModule } from '@/store/user';


IMP.init('imp07867187')
Kakao.init('046f7d987276c7458c5069ef55118b20')

Vue.config.productionTip = true;

Vue.use(Element)
Vue.mixin(Loading)
Vue.use(VueSocialSharing)

UserModule.get_info()

Vue.prototype.$message = function (msg) {
	return Message({
		message: msg,
		duration: 1000
	})

}
Vue.prototype.$message.success = function (msg) {
	return Message.success({
		message: msg,
		duration: 1000
	})
}
Vue.prototype.$message.error = function (msg) {
	return Message.warning({
		message: msg,
		duration: 1000
	})
}


export const app = new Vue({
	router,
	i18n,
	store,
	render: h => h(App),
}).$mount('#app');
