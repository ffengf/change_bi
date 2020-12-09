


import { req_list, res_list } from '@/types/global'
import { Vue, Component, Watch } from "vue-property-decorator"

export const More = <T>(axios_get: (req_list: req_list) => Promise<res_list<T>>) => {

	@Component
	class Mixin extends Vue {
		count = 0
		list: T[] = []
		page = 1


		async get_list() {
			if (this.list.length === this.count && this.list.length !== 0) {
				return this.$message.error("没有更多了");
			}
			this.loading = true
			const { results, count } = await axios_get({
				page: this.page
			}).finally(() => {
				this.loading = false
			})
			this.list = [...this.list, ...results];
			this.count = count;
		}

		more(){
			if (this.list.length === this.count && this.list.length !== 0) {
				return this.$message.error("没有更多了");
			}
			this.page ++
			this.get_list()
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
			this.get_list()
		}
	}

	return Mixin
}
