<template>
    <div class="warpper" v-loading="loading">
		<div class="box" v-for="(ele) in list" :key="ele.id">
			<div class="box_left">
				<h2>
					<span v-if="ele.status === 0">审核中</span>
					<span v-if="ele.status === 1 && ele.club_status === 5">未开始</span>
					<span v-if="ele.status === 1 && ele.club_status === 1">进行中</span>
					<span v-if="ele.status === 1 && ele.club_status === 2">已结束</span>
					<span v-if="ele.status === 2">已取消</span>
					<span>|</span>
					<span>{{ ele.start_time }} ~ {{ ele.end_time }}</span>
				</h2>
				<h1>{{ ele.title }}</h1>
			</div>
			<div class="flex" v-if="ele.status === 0 || ele.status === 1 && ele.club_status === 5">
				<el-button class="right_btn" type="danger">取消申请</el-button>
				<el-button class="right_btn" type="primary">查看内容</el-button>
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
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue"
import { More } from "@/mixin/more"
import { api_user,user_club } from "@/api"
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends More(api_user.get_club) {

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
