
import { Http } from "./http/base"
import { req_list, res_list } from '@/types/global';


export interface club_list {
	id: number
	title: string
	subtitle: string
	cover: string
	status: 0 | 1 | 2 | 3 | 4 | 5
	is_collect: 0 | 1
	start_time: string
	end_time: string
}

export interface club_info extends club_list {
	price: number
	refund_desc: string
	option: string
	option_desc: string
	type:0 | 1
	other_title:string
	other_content:string
}

class Club extends Http {
	private get_list(data: req_list) {
		return this.get<res_list<club_list>>({ page_size: 10, ...data })
	}

	get_creation_list = (data: req_list) => {
		return this.get_list({ ...data, type: 0 })
	}

	get_apply_list = (data: req_list) => {
		return this.get_list({ ...data, type: 1 })
	}

	get_info(id: number) {
		return this.get<club_info>({}, `${this.uri}${id}/`)
	}

	join(id:number){
		return this.post<{
			code?:number
		}>({ status:1 },`/club/${id}/apply/`)
	}

	pay_join(data:{
		club_id:number
		merchant_uid:string
		coupon_id?:number
	}){
		return this.post(data,'/order/')
	}

}


export const api_club = new Club('/club/')
