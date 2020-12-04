
import { Http } from "./http/base"



class Service extends Http {
	get_content(){
		return this.get({},'/service')
	}
	async get_use(){
		const use = await this.get<any[]>()
		return use[0]
	}
	async get_privacy(){
		const privacy = await this.get<any[]>()
		return privacy[1]
	}

}


export const api_service = new Service('/service_term')
