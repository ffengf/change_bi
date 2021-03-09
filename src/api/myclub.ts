


import { Http } from "./http/base"
import { req_list, res_list } from '@/types/global'
import { clean } from "@/util/object"

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

export interface user_link {
	id: number
	username: string
	avatar: string
	real_name: string
}

export interface task_attend_list {
	id: number
	user: user_link
	title: string
	create_time: string
}


export interface attend_base {
	id: number | null
	task_id: number
	title: string
	content: string
	attach: string
	file_name: string
}

export interface comment_small {
	id: number
	content: string
	create_time: string
	delete: 0 | 1
}

export interface comment_info extends attend_base {
	comment_list: comment_small[]
	user: user_link
}



export interface discuss_list {
	id: number
	create_time: string
	content: string
	delete: 0 | 1
	from_user: user_link
	reply_list: discuss_list[]
}

export interface add_discuss {
	club_id:number
	to_user_id?:number
	parent_id?:number
	content:string
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

	task_attend_list = (data: req_list) => {
		return this.get<res_list<task_attend_list>>(data, `/club/attend/`)
	}

	add_attend({ id, ...data }: attend_base) {
		return this.post<task_attend_list>(clean(data), `/club/attend/`)
	}

	edit_attend({ id, ...data }: attend_base) {
		const req = {
			attach: data.attach,
			content: data.content,
			title: data.title,
			file_name: data.file_name,
		}
		return this.patch(clean(req), `/club/attend/${id}/`)
	}

	remove_attend(id:number){
		return this.delete(id,`/club/attend/`)
	}

	attend_info(id: number) {
		return this.get<attend_base>({}, `/club/attend/${id}/`)
	}

	comment_info(id: number) {
		return this.get<comment_info>({}, `/club/attend/${id}/`)
	}

	send_comment(data: {
		attendance_id: number
		content: string
	}) {
		return this.post<comment_small>(data, '/club/comment/')
	}

	remove_comment(id: number) {
		return this.delete(id, '/club/comment/')
	}

	edit_comment({ id, content }: {
		id: number
		content: string
	}) {
		return this.patch({ content }, `/club/comment/${id}/`)
	}

	get_discuss_list = (data: req_list) => {
		return this.get<res_list<discuss_list>>({ ...data,page_size:5 }, '/club/discuss/')
	}

	add_discuss(data:add_discuss){
		return this.post<discuss_list>(data,'/club/discuss/')
	}

	edit_discuss(data:{
		content:string
		id:number
	}){
		return this.patch({ content:data.content },`/club/discuss/${data.id}/`)
	}

	remove_discuss(id:number){
		return this.server.delete(`/club/discuss/${id}/`)
	}

}


export const api_myclub = new Myclub('/user/')
