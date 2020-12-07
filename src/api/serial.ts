
import { res_list } from '@/types/global'
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

export interface date_info {
	o1:book_data[]
	o2:book_data[]
	o3:book_data[]
	o4:book_data[]
	o5:book_data[]
	today:book_data[]
	top:book_data[]
}

export interface book_info extends book_data {
	book_desc:string
	detail:string
	author_desc:string
	author_img:string
}

export interface chapter_list {
	id:number
	number:number
	title:string
	create_time:string
}

class Serial extends Http {
	protected async get_list(data: data) {
		const { results } = await this.get<{
			results: book_data[]
		}>(data)
		return results
	}

	async date_list() :Promise<date_info> {
		const base = {
			page: 1,
			page_size: 3
		}
		const [top, today, o1, o2, o3, o4, o5] = await Promise.all([
			this.get_list({
				...base,
				is_switch_on: 1
			}),
			this.get_list({
				...base,
				day_of_week: new Date().getDate(),
				is_recommend: 1
			}),
			this.get_list({
				...base,
				day_of_week: 1,
			}),
			this.get_list({
				...base,
				day_of_week: 2,
			}),
			this.get_list({
				...base,
				day_of_week: 3,
			}),
			this.get_list({
				...base,
				day_of_week: 4,
			}),
			this.get_list({
				...base,
				day_of_week: 5,
			}),
		])
		return {
			top, today, o1, o2, o3, o4, o5
		}
	}

	async get_info(id:number){
		return this.get<book_info>({},`${this.uri}${id}/`)
	}

	get_chapter(data:{ id:number,page:number }){
		return this.get<res_list<chapter_list>>({ page_size:10,...data },'/book/chapter/')
	}
}


export const api_serial = new Serial('/book/')
