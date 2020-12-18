<template>
    <div class="problem" v-loading="_loading">
		<ul class="ul">
			<Item v-for="(ele) in list" :key="ele.id" :info="ele" />
			<div class="line"></div>
		</ul>
		<el-button type="success" class="btn" @click="more" :disabled="disabled">더보기</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Item from "./item.vue"
import { api_customer, faq } from '@/api';
@Component({
	components:{
		Item,
	}
})
export default class extends Vue {

	page = 1

	count = 0

	list:faq[] = []

	@Watch('page')
	async get_list(){
		if (this.list.length === this.count && this.list.length !== 0) {
            return this.$message.error("没有更多了");
		}
		this._loading = true
        const { results, count } = await api_customer.get_faq({
            page: this.page
        }).finally(()=>{
			this._loading = false
		})
        this.list = [...this.list, ...results];
        this.count = count;
	}

	more(){
		this.page ++
	}

	created(){
		this.get_list()
	}

	get disabled():boolean{
		return this.count <= this.list.length
	}
}
</script>



<style lang='less' scoped>
.problem{
	width: 100%;
	display: flex;
	flex-direction: column;
	.btn{
		width: 10rem;
		align-self: center;
		margin-top: 2.5rem;
		margin-bottom: 6rem;
	}
	.ul{
		.line{
			height: 1px;
			background: #324b9b;
		}
	}
}
</style>
