<template>
    <div class="warpper" v-loading="_loading">
		<template v-if="list.length !== 0">
			<div class="box" v-for="(ele) in list" :key="ele.id">
				<div class="box_left" @click="go(ele)">
					<h2>
						<span :class="class_name(type(ele))">{{ type(ele) }}</span>
						<span>|</span>
						<span>{{ ele.activity.start_time }} ~ {{ ele.activity.end_time }}</span>
					</h2>
					<h1>{{ ele.activity.title }}</h1>
					<h6 v-if="ele.refuse_reason !== null">{{ ele.refuse_reason }}</h6>
				</div>
				<el-button class="right_btn" type="danger" v-if="show_un_join(ele)" @click="un_join(ele)">신청취소</el-button>
				<el-button class="right_btn" type="danger" v-if="ele.status === 2" @click="del(ele)">삭제</el-button>
			</div>
			<el-button class="more" type="success" @click="more" :disabled="disabled">더 보기</el-button>
		</template>
		<div v-else class="none">
			신청하신 이벤트가 없습니다.
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue"
import { More } from "@/mixin/more"
import { api_user,user_active } from "@/api"
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends More(api_user.get_active) {
	go(ele:user_active){
		this.$router.push(`/active/${ele.activity.type}/info/${ele.activity.id}`)
	}

	type(ele:user_active){
		switch(ele.status){
			case 0 :
				return '승인대기'
			case 2 :
				return '취소완료'
			case 1 :
				switch(ele.activity.status){
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

	show_un_join(ele:user_active){
		if(ele.status !== 2){
			if(ele.activity.status === 0 || ele.activity.status === 3){
				return true
			}
		}
		return false
	}

	async un_join(ele:user_active){
		this._loading = true
		const new_user_active = await api_user.un_join_active(ele.id).finally(()=>{
			this._loading = false
		})
		this.list = this.list.map(x => x.id === new_user_active.id ? new_user_active : x)
		this.$message.success('반영되었습니다.')
	}

	async del(ele:user_active){
		await this.$confirm('정말 삭제 하시겠습니까?', {
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		})
		this._loading = true
		await api_user.del_active(ele.id).finally(()=>{
			this._loading = false
		})
		this.list = this.list.filter(x => x.id !== ele.id)
		this.count --
		this.$message.success('삭제되었습니다.')
	}


	class_name(key:"승인대기" | "취소완료" | "진행 중" | "진행완료" | "승인완료" | "진행대기"){
		return {
			'승인대기':'orange',
			'취소완료':'red',
			'진행 중' :'blue',
			'진행완료':'info',
			'승인완료':'light_green',
			'진행대기':'green',
		}[key]
	}
}
</script>



<style lang='less' scoped>
.box_left{
	cursor: pointer;
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

</style>
