import { OtherModule } from '@/store/other'
import { Vue, Component } from "vue-property-decorator"

declare module 'vue/types/vue' {
	interface Vue {
		isPhone: Boolean
		isPc: Boolean
	}
}

@Component
export class Device extends Vue {
	get isPhone(){
		return OtherModule.isPhone
	}
	get isPc(){
		return OtherModule.isPc
	}
}
