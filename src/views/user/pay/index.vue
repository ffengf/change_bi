<template>
    <div class="warpper">
		<template v-if="list.length !== 0">
			<div class="box" v-for="ele in list" :key="ele.id">
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
				<div class="text">{{ numFormat(ele.pay_amount) }} 원</div>
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
import { api_user } from "@/api";
import { numFormat } from "@/util/string";
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends More(api_user.get_pay) {
	numFormat = numFormat

	pay_methods(e:'card'|'trans'|'phone'){
		return {
			card:'신용카드',
			trans:'계좌이체',
			phone:'휴대폰결제',
		}[e]
	}
}
</script>



<style lang='less' scoped>

.small{
	font-size: 13.5px;
	letter-spacing: -0.68px;
}
</style>
