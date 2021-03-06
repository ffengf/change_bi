
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
	external_link:string
	apply_type:0|1
}


class Active extends Http {
	get_list = (data: req_list) => {
		return this.get<res_list<active>>({ ...data,page_size:9 })
	}

	get_info(id: number) {
		return this.get<active>({}, `/book/activity/${id}/`)
	}

	join(id:number,apply_reason:string){
		return this.post<{
			code?:number
		}>({ status:1,apply_reason },`/book/activity/${id}/apply/`)
	}
}


export const api_active = new Active('/book/activity/')
