import {
	VuexModule,
	Mutation,
	Action,
	getModule,
	Module
} from "vuex-module-decorators";
import store from "./index"




@Module({ name: 'other', dynamic: true, namespaced: true, stateFactory: true, store })
export default class Other extends VuexModule {
	language: string = ''

	equipment: string = ''


	@Mutation
	private set_equipment(type: string) {
		this.equipment = type
	}

	@Action
	public check() {
		// let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
		// this.set_equipment(flag === null ? 'pc' : 'phone')
		this.set_equipment(window.innerWidth > 768 ? 'pc' : 'phone')
		window.addEventListener('resize',_=>{
			this.set_equipment(window.innerWidth > 768 ? 'pc' : 'phone')
		})
	}

	public get isPhone(){
		return this.equipment === 'phone'
	}

	public get isPc(){
		return this.equipment === 'pc'
	}
}


export const OtherModule = getModule(Other);
