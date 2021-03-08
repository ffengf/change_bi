<template>
    <div id="pay" class="flex">
		<template v-if="pay_type === 'success'">
			<img src="@/assets/img/success.png" alt="">
			<h1>결제가 완료되었습니다.</h1>
			<h2>모임 신청이 제출되었습니다.</h2>
			<h3>아래 버튼을 선택하여 신청/결제 내역을 확인해 주세요.</h3>
			<div class="btn_box">
				<el-button type="success" @click="go_1">나의모임</el-button>
				<el-button type="default" @click="go_2">결제내역</el-button>
			</div>
		</template>
		<template v-if="pay_type === 'fail'">
			<img src="@/assets/img/fail.png" alt="">
			<h1>결제에 실패하였습니다.</h1>
			<h2> </h2>
			<h3>{{ fail_msg }}</h3>
			<div class="btn_box">
				<el-button type="success" @click="go_1">다시시도</el-button>
				<el-button type="default" @click="go_2">결제내역</el-button>
			</div>
		</template>
    </div>
</template>

<script lang="ts">
import { Encryption } from "@/util/encryption";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {

	get pay_type():string{
		return this.$route.params.type
	}

	go_1(){
		this.$router.replace(this.$route.query.go_1 as string)
	}

	go_2(){
		this.$router.replace(this.$route.query.go_2 as string)
	}


	get fail_msg(){
		return (this.$route.query.fail_msg as string | undefined) || `결제가 취소되었습니다. 다시 시도해주세요.`
	}
}
</script>



<style lang='less' scoped>
#pay {
	width: 100%;
	height: 35rem;
	flex-direction: column;
	img{
		margin-top: 6rem;
	}
	h1{
		margin-top: 1rem;
		font-family: NotoSansKR;
		font-size: 26.5px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: -1.99px;
		text-align: center;
		color: #324b9b;
	}
	h2,h3{
		margin-top: 2.5rem;
		font-family: NotoSansKR;
		font-size: 14.5px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: -0.36px;
		text-align: center;
		color: #000000;
	}
	.btn_box{
		margin-top: 4rem;
		display: flex;
		>*{
			margin: 0 0.2rem;
			width: 8.6rem;
			height: 2.2rem;
		}
	}
}
</style>
