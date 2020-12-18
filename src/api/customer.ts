
import { req_list,res_list } from '@/types/global'
import { Http } from "./http/base"


export interface notice {
	id: number
	title: string
	content: string
	create_time: string
}

export interface faq {
	id: number
	tag: string
	question: string
	answer: string
	create_time: string
}



export interface qa {
	id: number
	title: string
	question: string
	answer: string
	status: 0 | 1
	create_time: string
	update_time: string
}

export interface post_qa {
	title: string
	question: string
}

class Customer extends Http {
	 get_notice(data: req_list) {
		return this.get<res_list<notice>>({ page_size: 10, ...data }, '/notice')
	}

	get_faq(data: req_list) {
		return this.get<res_list<faq>>({ page_size: 10, ...data }, '/faq')
	}

	get_qa(data: req_list) {
		return this.get<res_list<qa>>({ page_size: 10, ...data }, '/qa')
	}

	post_qa(data: post_qa) {
		return this.post(data, '/qa/')
	}
}


export const api_customer = new Customer('')
