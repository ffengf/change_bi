
import { Vue, Component } from "vue-property-decorator"

declare module 'vue/types/vue' {
	interface Vue {
		loading:boolean
	}
}

@Component
export class Loading extends Vue {
	loading = false
}
