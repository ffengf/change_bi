<template>
    <div class="warpper" v-loading="_loading">
		<template v-if="list.length !== 0">
			<div class="box cu" v-for="ele in list" :key="ele.id" @click="link(ele)">
				<div class="box_left">
					<h2>
						<span class="color_primary">{{ pay_methods(ele.pay_method) }}</span>
						<span>|</span>
						<span>{{ ele.create_time }}</span>
					</h2>
					<h1>
						{{ ele.club.title }}
						<span class="small">{{ ele.club.option }}</span>
					</h1>
				</div>
				<div class="text" v-if="ele.status === 1">{{ numFormat(ele.pay_amount) }} 원</div>
				<div class="text red" v-else>- {{ numFormat(ele.pay_amount) }} 원</div>
			</div>
			<el-button class="more" type="success" @click="more" :disabled="disabled">더 보기</el-button>
		</template>
		<div v-else class="none">
			결제하신 내역이 없습니다.
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue"
import { More } from "@/mixin/more";
import { api_user, user_pay } from "@/api";
import { numFormat } from "@/util/string";
import { winopen } from "@/util/other"
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends More(api_user.get_pay) {
	numFormat = numFormat

	pay_methods(e:'card'|'trans'|'phone'|'coupon'|'other'){
		return {
			card:'신용카드',
			trans:'계좌이체',
			phone:'휴대폰결제',
			coupon:'쿠폰결제',
			other:'쿠폰결제'
		}[e]
	}

	link(ele:user_pay){
		if(ele.receipt_url === null){
			if(ele.pay_method === 'phone'){
				return this.$message('휴대폰 결제의 경우 제공되는 매출전표 서비스가 없습니다.')
			}else{
				return this.$message('무료 결제의 경우 제공되는 매출전표 서비스가 없습니다.')
			}
		}
		winopen(ele.receipt_url)
	}
}
</script>



<style lang='less' scoped>

.small{
	font-size: 13.5px;
	letter-spacing: -0.68px;
}

.cu{
	cursor: pointer;
}

.red{
	color: #F56C6C!important;
}
</style>
