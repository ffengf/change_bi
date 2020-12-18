


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
}


export const api_myclub = new Myclub('/user/')
