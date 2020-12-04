
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

interface results {
	id: number
	title: string
	cover: string
	status: 0 | 1
	author_name: string
	chapters: chapters[]
}

export interface date_info {
	o1:results[]
	o2:results[]
	o3:results[]
	o4:results[]
	o5:results[]
	today:results[]
	top:results[]
}

class Serial extends Http {
	protected async get_list(data: data) {
		const { results } = await this.get<{
			results: results[]
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
}


export const api_serial = new Serial('/book/')
