<template>
    <div class="warpper" v-loading="_loading">
		<!-- <div class="box" v-for="(ele) in list" :key="ele.id">
			<div class="box_left">
				<h2>
					<span>{{ status_str(ele) }}</span>
					<span>|</span>
					<span>{{ ele.club.start_time }} ~ {{ ele.club.end_time }}</span>
				</h2>
				<h1>{{ ele.club.title }}</h1>
			</div>
			<div class="flex" v-if="status_str(ele) === '审核中' || status_str(ele) === '未开始'">
				<el-button class="right_btn" type="danger">取消申请</el-button>
				<el-button class="right_btn" type="primary" @click="$router.push(`/myclub/${ele.id}`)">查看内容</el-button>
			</div>
			<div class="flex" v-if="status_str(ele) === '进行中'">
				<el-button class="right_btn" type="primary" @click="$router.push(`/myclub/${ele.id}`)">查看内容</el-button>
			</div>
			<div class="flex" v-if="status_str(ele) === '已结束'">
				<el-button class="right_btn" type="success">打印结业证</el-button>
				<el-button class="right_btn" type="primary" @click="$router.push(`/myclub/${ele.id}`)">查看内容</el-button>
			</div>
			<div class="flex" v-if="status_str(ele) === '已取消' || status_str(ele) === '待退款' || status_str(ele) === '已退款'">
				<el-tooltip v-if="ele.refuse_reason !== null" class="item" effect="dark" :content="ele.refuse_reason" placement="top-start">
					<div class="text">{{ ele.refuse_reason }}</div>
				</el-tooltip>
				<el-button class="right_btn" type="danger" @click="$router.push(`/myclub/${ele.id}`)">删除</el-button>
			</div>
		</div>
		<el-button class="more" type="success" :disabled="disabled">더 보기</el-button>
		<el-button class="more" type="success" @click="open">test</el-button>

		<Paper ref="paper" /> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Paper from "./components/paper.vue"
import { More } from "@/mixin/more"
import { api_user,user_club } from "@/api"
@Component({
	components:{
		Paper
	}
})
export default class extends More(api_user.get_club) {
	open(){
		(this.$refs['paper'] as any).open({
			name:10
		})
	}

	status_str(ele:user_club){
		switch(ele.status){
			case 0 :
				return '审核中'
			case 2 :
				return '已取消'
			case 3 :
				return '待退款'
			case 4 :
				return '已退款'
			case 1 :
				switch(ele.club.status){
					case 1 :
						return '进行中'
					case 2 :
						return '已结束'
					default :
						return '未开始'
				}
			default :
				return ''
		}
	}
}
</script>



<style lang='less' scoped>
.flex{
	width: 12rem;
	justify-content: space-between;
	&::before{
		content: '';
	}
	.right_btn{
		width: 45% !important;
	}
	.text{
		width: 45%!important;
		overflow: hidden;
		white-space: nowrap;
     	text-overflow: ellipsis;
	}
}
// @media only screen and (max-width: 1024px) {
// 	.flex{
// 		width: 12rem;
// 	}
// }
</style>
