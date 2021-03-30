
import { res_list } from '@/types/global'
import { is } from 'ramda'
import { Http } from "./http/base"

interface data {
	page: number
	page_size: number
	is_recommend?: 0 | 1
	is_switch_on?: 0 | 1
	day_of_week?: number
}

interface chapters {
	number: number
	title: string
	id:number
}

export interface book_data {
	id: number
	title: string
	cover?: string
	status: 0 | 1
	author_name: string
	chapters: chapters[]
}

export type date_info = { title:number|string,data:book_data[] }[]

export interface book_info extends book_data {
	book_desc:string
	detail:string
	author_desc:string
	author_img:string
	link:string|null
	is_like:0|1
	like_num:number
	first_chapter:number
	is_subscribe:0|1
	cover:string
}

export interface chapter_list {
	id:number
	number:number
	title:string
	create_time:string
	show_time:string
}

export interface chapter_info extends chapter_list {
	content:string
	is_free?:0|1
	is_like:0|1
	like_num:number
}

class Serial extends Http {
	protected async get_list(data: data) {
		const { results } = await this.get<{
			results: book_data[]
		}>(data)
		return results
	}

	async date_list() {
		const results = await this.get<date_info>()
		const day_string = ['월요연재','화요연재','수요연재','목요연재','금요연재']
		return results.map(x => ({ ...x,title:is(Number,x.title) ? day_string[x.title] : '스위치 ON' }))
	}

	get_today(){
		return this.get<book_data[]>({ is_today:1 })
	}

	async get_info(id:number){
		return this.get<book_info>({},`${this.uri}${id}/`)
	}

	get_chapter(data:{ book_id:number,page:number }){
		return this.get<res_list<chapter_list>>({ page_size:10,...data },'/book/chapter/')
	}

	async get_id_name(id:number){
		return this.get<{
			book_title:string
			ids:number[]
			author_name:string
		}>({},`/book/${id}/ids/`)
	}

	async get_chapter_info(id:number){
		return this.get<chapter_info>({},`/book/chapter/${id}/`)
	}

	post_like(id:number,action:0|1){
		return this.post({ action },`/book/${id}/like/`)
	}

	subscribe(id:number,action:0|1){
		return this.post({ action },`/book/${id}/subscribe/`)
	}

	chapter_list(id:number,action:0|1){
		return this.post({ action },`/book/chapter/${id}/like/`)
	}
}


export const api_serial = new Serial('/book/')
