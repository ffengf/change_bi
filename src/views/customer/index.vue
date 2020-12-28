<template>
    <div id="customer" class="flexC">
		<div class="w70vw min_width1000 customer">
			<Bread />
			<div class="line mt10"></div>
			<ul class="tab" id="customer_tab">
				<router-link class="item" to="/customer/notice" tag="li">공지사항</router-link>
				<router-link class="item" to="/customer/problem" tag="li">자주묻는질문</router-link>
				<router-link class="item" to="/customer/answer" tag="li">1:1 문의</router-link>
			</ul>
			<div class="body">
				<Rview />
			</div>
		</div>
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
#customer{
	margin-top: 2rem;
	.line{
		background: #324b9b;
	}
	.tab{
		display: flex;
		width: 100%;
		background: #fff;
		height: 3rem;
		cursor: pointer;
		text-align: center;
		line-height: 3rem;
		font-family: NotoSansKR-Medium;
		.item{
			border: 1px solid #324b9b;
			width: 34%;
			color: #324b9b;
		}
		.router-link-active{
			background: #324b9b;
			color: #fff;
		}
	}
	.body{
		margin-top: 2rem;
		width: 100%;
	}
}
@media screen and (max-width: 768px) {
	.item{
		font-size: 16px !important;
	}
}
</style>
