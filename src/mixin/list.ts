

import { Vue, Component, Watch } from "vue-property-decorator";
import { clean } from '@/util/object';
import { req_list, res_list } from "@/types/global";



export interface params {
	page?: number | string
	page_size?: number | string
	[propName:string]:any
}


interface Id {
	id: number
}


export const Mixin_list = <T extends Id>(axios_get:(data:req_list)=> Promise<res_list<T>>) => {
	@Component
	 class Mixin_list extends Vue {
		list: T[] = [];
		total: number = 0;
		page_size: number = 5;
		page: number = 1;
		selete: T[] = [];
		ordering: string = '';

		filter: Record<string, any> = {}

		allSelect(val: T[]) {
			this.selete = val
		}

		sort_change({ prop, order }: Record<string, string>) {//ascending 升 id
			if (order === null) {
				this.ordering = ''
				return
			}
			this.ordering = order === "ascending" ? prop : `-${prop}`;
		}

		get get_select() {
			return this.selete.map(x => x.id)
		}

		@Watch('page_size')
		find(){
			if(this.page === 1){
				this.get_list()
			}else{
				this.page = 1
			}
		}


		@Watch('page')
		@Watch('ordering')
		async get_list() {
			const { page, page_size, ordering } = this
			const data = clean({ page, ordering, page_size, ...this.filter })
			const { count, results } = await axios_get(data)
			this.total = count
			this.list = results
		}

		created() {
			this.get_list()
		}
	};
	return Mixin_list
}
