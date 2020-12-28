


import { req_list, res_list } from '@/types/global'
import { Vue, Component } from "vue-property-decorator"

export const More = <T>(axios_get: (req_list: req_list) => Promise<res_list<T>>,use_created = true) => {

	@Component
	class Mixin extends Vue {
		count = 0
		list: T[] = []
		page = 1

		filter:Object = {

		}


		async get_list() {
			if (this.list.length === this.count && this.list.length !== 0) {
				return this.$message.error("没有更多了");
			}
			this._loading = true
			const { results, count } = await axios_get({
				page: this.page,
				...this.filter
			}).finally(() => {
				this._loading = false
			})
			this.list = [...this.list, ...results];
			this.count = count;
		}

		more(){
			if (this.list.length === this.count && this.list.length !== 0) {
				return this.$message.error("没有更多了");
			}
			this.page ++
			this.get_list().catch(()=>{
				this.page --
			})
		}

		clear_list(){
			this.list = []
			this.page = 1
			this.get_list()
		}

		get disabled():boolean{
			return this.count <= this.list.length
		}

		created() {
			if(use_created){
				this.get_list()
			}
		}
	}

	return Mixin
}
