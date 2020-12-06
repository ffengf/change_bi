
import { Http } from "./http/base"

export interface banner {
	id:number
	title:string
	image:string
	link:string
}

export interface evaluation_row {
	content:string;
	is_bold:0|1
}

export type evaluation = {
	id:number
	row1: evaluation_row
	row2: evaluation_row
	row3: evaluation_row
	service_name:string
	user_name:string
}[]

class Home extends Http {
	get_banner(){
		return this.get<banner[]>({},'/banner')
	}

	async get_evaluation(){
		const data = await this.get<evaluation>({}, '/evaluation')
		return data.map(({ row1,row2,row3,...other })=>{
			return { ...other,content:[ row1,row2,row3 ] }
		})
	}

}


export const api_home = new Home('')
