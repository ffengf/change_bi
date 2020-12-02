
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './lang'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: 'ko',
	messages
})

locale.i18n((key:string, value:string) => i18n.t(key, value))

export default i18n
