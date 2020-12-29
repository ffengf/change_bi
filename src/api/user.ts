
import { req_list, res_list } from '@/types/global'
import { Http } from "./http/base"


// USER_ACTIVITY_STATUS
// (0, "申请中"),
// (1, "已通过"),
// (2, "已取消")
export interface user_active {
	id: number
	title: string
	type: 1 | 2
	start_time: string
	end_time: string
	status: 0 | 1 | 2
	refuse_reason: string
}
// COUPON_STATUS = (
// 	(0, "未使用"),
// 	(1, "已使用"),
// 	(2, "已过期"),
// )
// type : 0:创作者与批评俱乐部  1:Book Club
export interface user_coupon {
	id: number
	status: 0 | 1 | 2
	use_time: null | string
	create_time: string
	coupon: {
		id: number
		title: string
		redeem_code: string
		amount: number
		type: 0 | 1
		start_time: string
		end_time: string
	}
}

export interface user_club {
	id: number
	status: 0 | 1 | 2 | 3 | 4
	refuse_reason: string | null
	club:{
		id:number
		title: string
		start_time: string
		end_time: string
		status: 0 | 1 | 2 | 3 | 4 | 5
	}
}


export interface user_info {
	id:number
	username:string
	phone:string
	real_name:string
	avatar:string
}


export interface user_pay {
	id:number
	create_time:string
	pay_amount:string
	pay_method:string
	club:{
		id:number
		title:string
		option:string
	}
}

export interface user_collect {
	id:number
	club: {
		id: number,
		type: 0 | 1
		title: string
		subtitle: string
		status: 0 | 1 | 2 | 3 | 4 | 5,
		start_time: string
		end_time: string
	}
}

class User extends Http {
	get_active = (data: req_list) => {
		return this.get<res_list<user_active>>({ ...data,page_size:5 }, '/user/activity/')
	}

	get_coupon = (data: req_list) => {
		return this.get<res_list<user_coupon>>({ ...data,page_size:5 }, '/user/coupon/')
	}

	get_club = (data: req_list) => {
		return this.get<res_list<user_club>>({ ...data,page_size:5 }, '/user/club/')
	}

	get_pay = (data: req_list) => {
		return this.get<res_list<user_pay>>({ ...data,page_size:5 }, '/order/')
	}

	get_collect = (data: req_list) => {
		return this.get<res_list<user_collect>>(data, '/user/collect/')
	}

	del_coupon(id: number) {
		return this.delete(id, '/user/coupon/')
	}

	del_club(id:number){
		return this.server.delete(`/user/club/${id}/`)
	}

	un_join_club(id:number){
		return this.post<user_club>({},`/user/club/${id}/cancel/`)
	}

	exchange_coupon(redeem_code: string) {
		return this.post({ redeem_code }, '/user/coupon/')
	}

	async get_pay_coupon(type:0 | 1){
		const { results } = await this.get<res_list<user_coupon>>({
			type,
			status:0
		}, '/user/coupon/')
		return results
	}

	get_user_info(){
		return this.get<user_info>({},'/user/info/')
	}

}


export const api_user = new User('/user/')
