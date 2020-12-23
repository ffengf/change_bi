<template>
    <div class="warpper" v-loading="_loading">
		<div class="box" v-for="(ele) in list" :key="ele.id">
			<div class="box_left">
				<h2>
					<span>{{ status_str(ele) }}</span>
					<span>|</span>
					<span>{{ ele.club.start_time }} ~ {{ ele.club.end_time }}</span>
				</h2>
				<h1>{{ ele.club.title }}</h1>
			</div>
			<div class="flex" v-if="ele.status === 0 || ele.status === 1 && ele.club_status === 5">
				<el-button class="right_btn" type="danger">取消申请</el-button>
				<el-button class="right_btn" type="primary" @click="$router.push(`/myclub/${ele.id}`)">查看内容</el-button>
			</div>
			<div class="flex" v-if="ele.status === 1 && ele.club_status === 1">
				<el-button class="right_btn" type="primary">去参加</el-button>
			</div>
			<div class="flex" v-if="ele.status === 1 && ele.club_status === 2">
				<el-button class="right_btn" type="primary">查看内容</el-button>
				<el-button class="right_btn" type="primary">打印结业证</el-button>
			</div>
			<div class="flex" v-if="ele.status === 2">
				<p class="text" v-if="ele.refuse_reason !== null">{{ ele.refuse_reason }}</p>
				<p class="text" v-else>自己取消</p>
				<el-button class="right_btn" type="primary">删除</el-button>
			</div>
		</div>
		<el-button class="more" type="success" :disabled="disabled">더 보기</el-button>
		<el-button class="more" type="success" @click="open">test</el-button>

		<Paper ref="paper" />
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
	width: 10rem;
	justify-content: space-between;
}
@media only screen and (max-width: 1024px) {
	.flex{
		width: auto;
	}
}
</style>
