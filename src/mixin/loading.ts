
import { Vue, Component } from "vue-property-decorator"

declare module 'vue/types/vue' {
	interface Vue {
		_loading:boolean
	}
}

@Component
export class Loading extends Vue {
	private time_loading = 0

	get _loading():boolean{
		return this.time_loading === 0 ? false : true
	}

	set _loading(key:boolean){
		if(key){
			this.time_loading ++
		}else{
			if(this.time_loading === 0){
				return
			}else{
				this.time_loading --
			}
		}
	}
}
