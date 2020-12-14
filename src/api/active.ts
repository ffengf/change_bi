
import { req_list, res_list } from '@/types/global'
import { Http } from "./http/base"

export interface active {
	id: number
	title: string
	content: string
	cover: string
	status: 1 | 2
	apply_num: number
	total_num: number
	start_time: string
	end_time: string
	create_time: string
	apply_start: string
	apply_end: string
}


class Active extends Http {
	get_list = (data: req_list) => {
		return this.get<res_list<active>>(data)
	}

	get_info(id: number) {
		return this.get<active>({}, `/book/activity/${id}/`)
	}

	async get_ids(type:number|string){
		const { results } = await this.get_list({
			page:1,
			page_size:30,
			type
		})
		return results.map(x => x.id).sort((a,b) => a - b)
	}

	join(id:number){
		return this.server.post(`/book/activity/${id}/apply/`,{ status:1 })
	}

	cancel(id:number){
		return this.server.post(`/book/activity/${id}/apply/`,{ status:0 })
	}
}


export const api_active = new Active('/book/activity/')
