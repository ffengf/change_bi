<template>
	<div id="comments">
		<el-dialog
			:visible.sync="keys"
			width="30%"
			append-to-body
		>
			<div class="body" ref="body">
				<h1>제출하기 : 11월 넷째주 미션 제출해주세요!</h1>
				<div class="line"></div>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {

	keys = false

	attendance_id:null|number = null


	open(attendance_id:null|number){
		this.keys = true
	}

}
</script>

<style lang="less" scoped>

</style>
