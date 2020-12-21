


import { Http } from "./http/base"
import { req_list, res_list } from '@/types/global'


export interface base_info {
	prev: number | null
	next: number | null
}

export interface notice_list {
	id: number
	title: string
	content: string
	create_time: string
}

export interface task_list {
	id: number
	title: string
	content: string
	create_time: string
	attendance_id: number | null
}
export type club_notice = base_info & notice_list
export type club_task = base_info & task_list


export interface task_attend_list{
	id:number
	user:{
		id:number
		username:string
		avatar:string
		real_name:string
	}
	title:string
	create_time:string
}


export interface attend_base{
	id:number|null
	task_id:number
	title:string
	content:string
	attach:string
	file_name:string
}

class Myclub extends Http {
	notice_list = (data: req_list) => {
		return this.get<res_list<notice_list>>({ page_size: 5, ...data }, '/club/notice/')
	}

	notice_info(id: number) {
		return this.get<club_notice>({}, `/club/notice/${id}/`)
	}

	task_list = (data: req_list) => {
		return this.get<res_list<task_list>>({ page_size: 5, ...data }, '/club/task/')
	}

	task_info(id: number) {
		return this.get<club_task>({}, `/club/task/${id}/`)
	}

	task_attend_list = (data:req_list) => {
		return this.get<res_list<task_attend_list>>(data,`/club/attend/`)
	}

	add_attend({ id,...data }:attend_base){
		return this.post(data,`/club/attend/`)
	}

	edit_attend({ id,...data }:attend_base){
		return this.patch(data,`/club/attend/${id}/`)
	}

	attend_info(id:number){
		return this.get<attend_base>({},`/club/attend/${id}/`)
	}

}


export const api_myclub = new Myclub('/user/')
