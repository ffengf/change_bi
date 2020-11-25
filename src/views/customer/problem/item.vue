<template>
    <div>
		<div class="item">
			<p>회원가입</p>
			<h1>Q.hello wolrd</h1>
			<i class="icon el-icon-arrow-up" @click="show" v-if="key"></i>
			<i class="icon el-icon-arrow-down" @click="show" v-else></i>

		</div>
		<h2 v-if="key">
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
			자주묻는질문 답변 내용입니다. 해당 영역은 관리자에서 에디터로 작성한 내용이 노출됩니다. 이미지 / 텍스트 모두 노출 가능
		</h2>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
	key = false


	show(){
		this.key = !this.key
	}
}
</script>



<style lang='less' scoped>
.item{
	height: 4.3rem;
	border-top:1px solid #324b9b ;
	// border-bottom:1px solid #324b9b;
	position: relative;
	p{
		color: #3fa535;
		font-size: 11.5px;
		margin-top: 1rem;
	}
	h1{
		color: #324b9b;
		font-weight: bold;
	}
	.icon{
		position: absolute;
		right: 1.5rem;
		top: 50%;
		color: #3fa535;
		transform: translateY(-50%);
		font-size: 40px;
		cursor: pointer;
	}
}
h2{
	padding: 2rem 0;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	width: 100%;
	border-top: 1px solid #324b9b;
}
</style>
