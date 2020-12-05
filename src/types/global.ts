

export interface req_list {
	page:number
	page_size?:number
}


export interface res_list<T>{
	results:T[],
	count:number
}
