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
			<div class="flex" v-if="status_str(ele) === '승인대기' || status_str(ele) === '진행대기'">
				<el-button class="right_btn" type="danger">신청취소</el-button>
				<el-button class="right_btn" type="primary" @click="$router.push(`/myclub/${ele.club.id}`)">내용보기</el-button>
			</div>
			<div class="flex" v-if="status_str(ele) === '진행중'">
				<el-button class="right_btn" type="success" @click="$router.push(`/myclub/${ele.club.id}`)">참여하기</el-button>
			</div>
			<div class="flex" v-if="status_str(ele) === '진행완료'">
				<el-button class="right_btn" type="success">수료증 발급</el-button>
				<el-button class="right_btn" type="primary" @click="$router.push(`/myclub/${ele.club.id}`)">내용보기</el-button>
			</div>
			<div class="flex" v-if="status_str(ele) === '취소완료' || status_str(ele) === '환불대기' || status_str(ele) === '환불완료'">
				<el-tooltip v-if="ele.refuse_reason !== null" class="item" effect="dark" :content="ele.refuse_reason" placement="top-start">
					<div class="text">{{ ele.refuse_reason }}</div>
				</el-tooltip>
				<el-button class="right_btn" type="danger" @click="del(ele)">삭제</el-button>
			</div>
		</div>
		<el-button class="more" type="success" :disabled="disabled">더 보기</el-button>
		<!-- <el-button class="more" type="success" @click="open">test</el-button> -->

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

	async del(ele:user_club){
		this._loading = true
		await api_user.del_club(ele.id).finally(()=>{
			this._loading = false
		})
		this.list = this.list.filter(x => x.id !== ele.id)
		this.count --
		this.$message.success('삭제되었습니다.')
	}

	status_str(ele:user_club){
		switch(ele.status){
			case 0 :
				return '승인대기'
			case 2 :
				return '취소완료'
			case 3 :
				return '환불대기'
			case 4 :
				return '환불완료'
			case 1 :
				switch(ele.club.status){
					case 1 :
						return '진행중'
					case 2 :
						return '진행완료'
					default :
						return '진행대기'
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
