<template>
    <div class="question">
        <el-input v-model="input" placeholder="*제목"></el-input>
		<div class="line" style="margin-top:0.8rem"></div>
		<div class="box" style="margin-top:0.8rem">
			<el-input  class="inp" v-model="input" placeholder="*메인 썸네일 이미지 첨부하기 (.jpg, jpeg, png)"></el-input>
			<el-button class="success_btn" type="success" plain>첨부하기</el-button>
		</div>
		<div class="line" style="margin-top:2.2rem;margin-bottom:1.1rem"></div>
		<div>富文本</div>
		<div class="btn_box">
			<el-button type="success" @click="change_type('list')">작성완료</el-button>
			<el-button type="default" plain @click="change_type('list')">작성취소</el-button>
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Emit } from "vue-property-decorator";

type type = "list" | "info" | "question";

@Component
export default class extends Vue {
	@Model('update:type',{ required:true,type:String })
	type !:type

	@Emit('update:type')
	change_type(type:type){
		return type
	}

	input = ''
}
</script>



<style lang='less' scoped>
.question{
	/deep/.el-input__inner{
		border: 1px solid #ccc !important;
	}
	.line{
		height: 1px;
		background: #324b9b;
	}
	.box{
		display: flex;
		.inp{
			width: 50%;
			margin-right:0.4rem ;
		}
	}
	.btn_box{
		display: flex;
		justify-content: flex-end;
		margin-bottom: 6rem;
		> *{
			width: 10rem;
		}
	}
}
</style>
