
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
	prev:null|number
	next:null|number
}


class Active extends Http {
	get_list = (data: req_list) => {
		return this.get<res_list<active>>(data)
	}

	get_info(id: number) {
		return this.get<active>({}, `/book/activity/${id}/`)
	}

	join(id:number){
		return this.post<{
			code?:number
		}>({ status:1 },`/book/activity/${id}/apply/`)
	}

	cancel(id:number){
		return this.post({ status:0 },`/book/activity/${id}/apply/`)
	}
}


export const api_active = new Active('/book/activity/')
