
import { Http } from "./http/base"
import { req_list, res_list } from '@/types/global';


export interface club_list {
	id: number
	title: string
	subtitle: string
	cover: string
	status: 0 | 1 | 2 | 3
	is_collect: 0 | 1
}

export interface club_info extends club_list{
	price:number
}

class Club extends Http {
	private get_list(data: req_list) {
		return this.get<res_list<club_list>>({ page_size: 10, ...data })
	}

	get_creation_list(data: req_list) {
		return this.get_list({ ...data, type: 0 })
	}

	get_apply_list(data: req_list) {
		return this.get_list({ ...data, type: 1 })
	}

	get_info(id:number){
		return this.get<club_info>(`${this.uri}/${id}/`)
	}


}


export const api_club = new Club('/club/')
