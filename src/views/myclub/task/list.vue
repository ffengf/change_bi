<template>
    <div class="list" v-loading="_loading">
		<ul v-for="ele in list" :key="ele.id">
			<li @click="go_info(ele.id)">
				<h2>
					<span>{{ ele.create_time }}</span>
					<span>|</span>
					<span>운영자 작성</span>
				</h2>
				<h1>{{ ele.title }}</h1>
				<p class="inner_detail" v-html="ele.content"></p>
				<el-button class="btn" type="success" @click.stop="create" v-if="ele.attendance_id === null">제출하기</el-button>
				<el-button class="btn" type="primary" @click.stop="edit" v-else>수정하기</el-button>
			</li>
		</ul>
		<el-button class="more" type="success" @click="more" :disabled="disabled">더 보기</el-button>
    </div>
</template>

<script lang="ts">
import { api_myclub } from "@/api";
import { More } from "@/mixin/more";
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends More(api_myclub.task_list) {

	filter = {
		club_id: this.$route.params.id
	}

	go_info(id:number){
		this.$router.push(this.$route.path + '?id=' + id)
	}

	aaa(){

	}
}
</script>



<style lang='less' scoped>
.list{
	display: flex;
	flex-direction: column;
	li{
		height: 3.8rem;
		border-bottom: 1px solid #324b9b;
		cursor: pointer;
		position: relative;
		.btn{
			position: absolute;
			transform: translateY(-50%);
			top: 45%;
			right: 0;
			height: 1.7rem;
			width: 6.8rem;
			padding: 0;
		}
		h2{
			margin-top: 1rem;
			font-family: NotoSansKR;
			font-size: 11.5px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			letter-spacing: -0.29px;
			span:nth-of-type(1){
				color: #324b9b;
			}
			span:nth-of-type(2){
				margin: 0 0.3rem;
			}
		}
		h1{
			font-size: 16.5px;
			font-weight: 500;
			letter-spacing: -0.41px;
			color: #000000;
			margin-top: 0.2rem;
		}
		.inner_detail{
			margin-top: 0.2rem;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
			width: 70%;
			overflow: hidden;
			font-size: 12.5px;
			letter-spacing: -0.34px;
			color: #858585;
			/deep/ * {
				font-size: 12.5px!important;
				letter-spacing: -0.34px!important;
				color: #858585!important;
				display: none!important;
			}
			/deep/ p:nth-of-type(1){
				display: block!important;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				width: 70%;
			}
		}
	}
	.more{
		align-self: center;
	}
}
</style>
