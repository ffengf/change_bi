
import { Http } from "./http/base"


interface content {
	content: string
}


class Service extends Http {
	get_content() {
		return this.get<any>({}, '/service')
	}
	async get_use() {
		const use = await this.get<content[]>()
		return use[0]
	}
	async get_privacy() {
		const privacy = await this.get<content[]>()
		return privacy[1]
	}

	async get_all() {
		const other = await this.get<any[]>()
		const get_content = await this.get_content()
		return {
			content: get_content.content,
			use: other[0].content,
			privacy: other[1].content,
		}
	}

}


export const api_service = new Service('/service_term')
