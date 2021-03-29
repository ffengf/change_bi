
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
	type: 0 | 1
}

export interface club_info extends club_list {
	price: number
	refund_desc: string
	option: string
	option_desc: string
	other_title: string
	other_content: string
	apply_end:string
	apply_start:string
}

class Club extends Http {
	get_list = (data: req_list) => {
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

	join(id: number,group_leader?:string) {
		const data = group_leader === undefined ? { status:1 } : { status:1,group_leader }
		return this.post<{
			code?: number
		}>(data, `/club/${id}/apply/`)
	}

	pay_join(data: {
		club_id: number
		merchant_uid: string
		coupon_id?: number
		group_leader?:string
	}) {
		return this.post(data, '/order/')
	}

	use_coupon_free(data:{
		club_id: number
		coupon_id: number
	}){
		return this.post(data, '/order/')
	}

	pay_check(club_id: number, coupon_id: number | undefined) {
		return this.post({ coupon_id },`/club/${club_id}/check/`)
	}

	collect(club_id:number,status:0|1){
		return this.post({ status },`/club/${club_id}/collect/`)
	}

}


export const api_club = new Club('/club/')
