<template>
    <div class="warpper">
		<div class="box">
			<div class="box_left">
				<h2>
					<span>진행 중</span>
					<span>|</span>
					<span>2020. 11. 01 ~ 2020. 11. 30</span>
				</h2>
				<h1>클럽 창작과비평 2기</h1>
			</div>
			<el-button class="right_btn" type="primary">참여하기</el-button>
		</div>
		<el-button class="more" type="success">더 보기</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue"
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends Vue {

}
</script>



<style lang='less' scoped>


</style>
