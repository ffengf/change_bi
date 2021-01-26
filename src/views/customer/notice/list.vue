<template>
    <div class="list" v-loading="_loading">
		<div class="box" v-for="(ele) in list" :key="ele.id">
			<div class="top">
				<span class="color_success">공지사항</span>
				<span class="lines"></span>
				<span>{{ ele.create_time }}</span>
			</div>
			<h1 @click="go_info(ele.id)">{{ ele.title }}</h1>
		</div>

		<el-button type="success" class="btn" @click="more" :disabled="disabled">더 보기</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Model, Prop } from "vue-property-decorator";
import { api_customer } from '@/api';
import { More } from "@/mixin/more";
@Component
export default class extends More(api_customer.get_notice) {
	go_info(id:number){
		this.$router.push(`/customer/notice?id=${id}`)
	}

}
</script>



<style lang='less' scoped>
.list{
	width: 100%;
	display: flex;
	flex-direction: column;
	.box{
		width: 100%;
		min-height: 4.2rem;
		border-bottom: 1px solid #324b9b;
		margin-top: 1rem;
		.top{
			span{
				font-size: 11.5px;
			}
			.lines{
				display: inline-block;
				height: 0.5rem;
				width: 1px;
				background: #000;
				margin: 0 0.3rem;
			}
		}
		h1{
			font-size: 16.5px;
			font-weight: 500;
			margin-top: 0.3rem;
			cursor: pointer;
			margin-bottom: 0.6rem;
		}
		h1:hover{
			color: #324b9b;
		}
	}
	.btn{
		width: 10rem;
		align-self: center;
		margin-top: 2.5rem;
		margin-bottom: 6rem;
	}
}
</style>
