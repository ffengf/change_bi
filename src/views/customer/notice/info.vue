<template>
    <div v-loading="_loading">
		<div class="item">
			<div class="top">
				<span class="color_success">공지사항</span>
				<span class="lines"></span>
				<span>{{ info.create_time }}</span>
			</div>
			<h1>{{ info.title }}</h1>
		</div>
		<Inner :val="info.content" />
		<div class="btn_box">
			<el-button class="btns aaa" type="default" :disabled="info.prev === null" @click="change_id(info.prev)">이전 글</el-button>
			<el-button class="btns" type="success" @click="ret_list">목록으로</el-button>
			<el-button class="btns aaa" type="default" :disabled="info.next === null" @click="change_id(info.next)">다음 글</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { api_customer, notice_info } from "@/api"
import Inner from "@/components/inner/index.vue"
@Component({
	components:{
		Inner,
	}
})
export default class extends Vue {

	@Prop({ required:true,type:Number })
	id !: number

	@Watch('id',{ immediate:true })
	watch_id(){
		this.get_info()
	}

	async get_info(){
		this._loading = true
		this.info = await api_customer.get_notice_info(this.id).finally(()=>{
			this._loading = false
		})
	}

	info:notice_info = {
		next:null,
		prev:null,
		id:0,
		title: '',
		content: '',
		create_time: '',
	}

	change_id(id:number){
		this.$router.push(`/customer/notice?id=${id}`)
	}

	ret_list(){
		this.$router.push('/customer/notice')
	}

}
</script>



<style lang='less' scoped>
.item{
	min-height: 4.3rem;
	margin-top: -1rem;
	position: relative;
	padding-bottom: 0.5rem;
	p{
		color: #3fa535;
		font-size: 11.5px;
		margin-top: 1rem;
	}
	h1{
		font-weight: bold;
		margin-top: 0.4rem;
	}
	.icon{
		position: absolute;
		right: 1.5rem;
		top: 50%;
		color: #3fa535;
		transform: translateY(-50%);
		font-size: 40px;
		cursor: pointer;
	}
}
h2{
	padding: 2rem 0;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	width: 100%;
	border-top: 1px solid #324b9b;
	min-height: 21rem;
	border-bottom: 1px solid #324b9b;
	word-break: break-all;
	/deep/p{
		white-space: normal!important;
	}
}
.btn_box{
	margin-top: 2.5rem;
	margin-bottom: 6rem;
	display: flex;
	justify-content: space-between;
	> * {
		width: 10rem;
		height: 2.2rem;
	}
}
.top{
	margin-top: 0.7rem;
	span{
		font-size: 11.5px;
	}
	.lines{
		display: inline-block;
		height: 0.5rem;
		width: 1px;
		background: #000;
		margin: 0 0.3rem;
	}
}
</style>
