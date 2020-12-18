<template>
    <div class="warpper" v-loading="_loading">
		<div class="box" v-for="(ele) in list" :key="ele.id">
			<div class="box_left">
				<h2>
					<span class="color_success" v-if="ele.type === 1">진행 중</span>
					<span class="color_primary" v-if="ele.type === 2">강연</span>
					<span>|</span>
					<span>{{ ele.start_time }} ~ {{ ele.end_time }}</span>
				</h2>
				<h1>{{ ele.title }}</h1>
			</div>
			<el-button class="right_btn" type="success" v-if="ele.status === 0">신청 진행 중</el-button>
			<el-button class="right_btn" type="primary" v-if="ele.status === 1">참여하기</el-button>
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
export default class extends More(api_user.get_active) {

}
</script>



<style lang='less' scoped>


</style>
