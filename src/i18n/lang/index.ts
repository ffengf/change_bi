//@ts-nocheck

import { zh } from "./zh.js"
import { ko } from "./ko.js"
import { dev } from "./dev.js"
import koLocale from 'element-ui/lib/locale/lang/ko'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

export default {
	zh:{
		...zh,
		...zhLocale
	},
	ko:{
		...ko,
		...koLocale
	},
	dev:{
		...dev,
		...zhLocale
	}
}
