<template>
    <div class="warpper" v-loading="_loading">
		<template v-if="list.length !== 0">
			<div class="box" v-for="(ele) in list" :key="ele.id">
				<div class="box_left cu" @click="go_info(ele)">
					<h2>
						<span :class="class_name(status_str(ele))">{{ status_str(ele) }}</span>
						<span>|</span>
						<span>{{ ele.club.start_time }} ~ {{ ele.club.end_time }}</span>
						<span class="margin">|</span>
						<span v-if="ele.group_leader === null">개인</span>
						<span v-else>조장ID:{{ ele.group_leader }}</span>
					</h2>
					<h1>{{ ele.club.title }}</h1>
					<h6 v-if="ele.refuse_reason !== null">{{ ele.refuse_reason }}</h6>
				</div>
				<div class="flex" v-if="status_str(ele) === '승인대기' || status_str(ele) === '승인완료'">
					<el-button class="right_btn" type="danger" @click="un_join(ele)">신청취소</el-button>
				</div>
				<div class="flex" v-if="status_str(ele) === '진행대기'">
					<el-button class="right_btn" type="danger" @click="un_join(ele)">신청취소</el-button>
					<el-button class="right_btn" type="primary" @click="go_myclub(ele)">내용보기</el-button>
				</div>
				<div class="flex" v-if="status_str(ele) === '진행 중'">
					<el-button class="right_btn" type="success" @click="go_myclub(ele)">참여하기</el-button>
				</div>
				<div class="flex" v-if="status_str(ele) === '진행완료'">
					<el-button class="right_btn" type="success" @click="open(ele)" v-if="ele.allow_print">수료증 발급</el-button>
					<el-button class="right_btn" type="primary" @click="go_myclub(ele)">내용보기</el-button>
				</div>
				<div class="flex" v-if="status_str(ele) === '취소완료' || status_str(ele) === '환불완료'">
					<el-button class="right_btn" type="danger" @click="del(ele)">삭제</el-button>
				</div>
				<div class="flex" v-if="status_str(ele) === '환불대기'">
					<!--  -->
				</div>
			</div>
			<el-button class="more" type="success" :disabled="disabled" @click="more">더 보기</el-button>
		</template>
		<div v-else class="none">
			신청하신 모임이 없습니다.
		</div>
		<Paper ref="paper" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Paper from "./components/paper.vue"
import { More } from "@/mixin/more"
import { api_user,user_club } from "@/api"
import { Encryption } from "@/util/encryption"

@Component({
	components:{
		Paper
	}
})
export default class extends More(api_user.get_club) {
	open(ele:user_club){
		(this.$refs['paper'] as any).open({
			start_time:ele.club.start_time,
			end_time:ele.club.end_time,
			title:ele.club.title
		})
	}

	async del(ele:user_club){
		await this.$confirm('정말 삭제 하시겠습니까?', {
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		})
		this._loading = true
		await api_user.del_club(ele.id).finally(()=>{
			this._loading = false
		})
		this.list = this.list.filter(x => x.id !== ele.id)
		this.count --
		this.$message.success('삭제되었습니다.')
	}

	async un_join(ele:user_club){
		await this.$confirm('정말로 신청 취소 하시겠습니까?', {
			confirmButtonText: '신청 취소',
			cancelButtonText: '닫기',
		})
		this._loading = true
		const new_user_club = await api_user.un_join_club(ele.id).finally(()=>{
			this._loading = false
		})
		this.list = this.list.map(x => x.id === new_user_club.id ? new_user_club : x)
		this.$message.success('반영되었습니다.')
	}

	go_myclub(ele:user_club){
		this.$router.push(`/myclub/${Encryption.base_enc(ele.club.id)}`)
	}
	go_info(ele:user_club){
		if(this.status_str(ele) === '진행완료'){
			return this.$message.error('진행완료된 모임입니다.')
		}
		this.$router.push(`/club/${ ele.club.type == 0 ? 'creation' : 'apply' }/info/${ele.club.id}`)
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
						return '진행 중'
					case 2 :
						return '진행완료'
					case 0:
					case 3:
						return '승인완료'
					case 5 :
						return '진행대기'
				}
			default :
				return ''
		}
	}

	class_name(key:"승인대기" | "취소완료" | "진행 중" | "진행완료" | "승인완료" | "진행대기" | "환불대기" | "환불완료"){
		return {
			'승인대기':'orange',
			'취소완료':'red',
			'진행 중' :'blue',
			'진행완료':'info',
			'승인완료':'light_green',
			'진행대기':'green',
			'환불대기':'red',
			'환불완료':'red',
		}[key]
	}
}
</script>



<style lang='less' scoped>
.flex{
	justify-content: space-between;
}
.green{
	color: #3fa535;
}
.blue{
	color: #324b9b;
}
.info{
	color: #909399;
}
.red{
	color: #F56C6C;
}
.orange{
	color: orange;
}
.light_green{
	color: rgb(138, 192, 7);
}
h6{
	margin-top: 0.2rem;
	font-size: 12px;
	color: #F56C6C;
}
.cu{
	cursor: pointer;
}
.margin{
	margin: 0 0.2rem;
}
@media only screen and (max-width: 1024px) {
	.flex{
		width: auto;
		flex-direction: column;
		.right_btn{
			margin: 0.2rem 0;
		}
	}
}
</style>
