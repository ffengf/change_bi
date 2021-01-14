
import { book_data } from '.'
import { club_list } from '.'
import { Http } from "./http/base"

interface search {
	club_list:club_list[]
	book_list:book_data[]
}

class Other extends Http {
	get_active = (keyword: string): Promise<search> => {
		return keyword === '' ?
			Promise.resolve({
				club_list: [],
				book_list: [],
			})
			:
			this.get({ keyword })
	}
}


export const api_other = new Other('/search')
