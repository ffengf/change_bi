<template>
    <div class="warpper" v-loading="_loading">
		<h1 class="top">총 {{ count }}개 모임이 검색되었습니다.</h1>
		<div class="line"></div>
		<ul class="box_list" v-if="list.length !==0">
			<el-card shadow="never" class="item" v-for="(ele) in list" :key="ele.id" @click.native="go(ele)">
				<img :src="ele.cover" alt="">
				<h1>{{ ele.title }}</h1>
				<h2>
					<span class="green" v-if="ele.status === 0">모집 중</span>
					<span class="blue" v-if="ele.status === 1">진행 중</span>
					<span class="orange" v-if="ele.status === 3">마감 임박</span>
					<span class="blue" v-if="ele.status === 4">모집대기</span>
					<span class="orange" v-if="ele.status === 5">모집마감</span>
					<span>|</span>
					<span>{{ ele.start_time }} ~ {{ ele.end_time }}</span>
				</h2>
				<h3>{{ ele.subtitle }}</h3>
			</el-card>
		</ul>
		<div class="none" v-else>
			<img src="@/assets/img/search.png" alt="">
			<h1>검색된 모임이 없습니다.</h1>
			<h2>모임명 또는 키워드를 확인하여 검색해 주세요.</h2>
		</div>
		<el-button type="success" class="more" @click="more" :disabled="disabled" v-if="list.length !==0">더 보기</el-button>
	</div>
</template>

<script lang="ts">
import { api_club, club_list } from "@/api";
import { More } from "@/mixin/more";
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class extends More(api_club.get_list,false) {

	filter = {
		search:this.value
	}

	@Watch('value',{ immediate:true })
	watch_value(){
		this.filter.search = this.value
		this.clear_list()
	}

	go(ele:club_list){
		const type = ele.type === 0 ? 'creation' : 'apply'
		this.$router.push(`/club/${type}/info/${ele.id}`)
	}

    get value() {
        return String(this.$route.query.value);
    }
}
</script>

<style lang="less" scoped>
.warpper{
	width: 100%;
	box-sizing: border-box;
	padding: 4rem 0 5rem 0;
	display: flex;
	flex-direction: column;
	.top{
		font-size: 16px;
	}
	.line{
		height: 4px;
		background: #324b9b;
	}
	.box_list{
		display: flex;
		flex-wrap: wrap;
		.item{
			width: 33%;
			overflow: hidden;
			cursor: pointer;
			margin-top: 3.5rem;
			box-sizing: border-box;
			/deep/.el-card__body{
				padding: 0.5rem!important;
				box-sizing: border-box !important;
			}
			img{
				width: 15rem;
				height: 11rem;
			}
			h1{
				margin-top: 1.25rem;
				font-family: NotoSansKR;
				font-size: 19px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.95px;
				text-align: left;
			}
			h2{
				margin-top: 0.6rem;
				font-family: NotoSansKR;
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.3px;
				text-align: left;
				span:nth-of-type(2){
					margin: 0 0.3rem;
				}
			}
			h3{
				margin-top: 0.8rem;
				font-family: NotoSansKR;
				font-size: 13px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.33px;
				text-align: left;
				color: #858585;
			}
		}
	}
	.none{
		display: flex;
		flex-direction: column;
		align-items: center;
		img{
			width: 8rem;
			height: 8rem;
			margin-top: 2rem;
		}
		h1{
			margin-top: 1rem;
			color: #324b9b;
			font-size: 18px;
		}
		h2{
			margin-top: 0.5rem;
			font-size: 12px;
		}
	}
	.more{
		margin-top: 2.5rem;
		margin-bottom: 6rem;
		width: 10rem;
		height: 2.2rem;
		align-self: center;
	}
}
.green{
	color: #3fa535;
}
.blue{
	color: #324b9b;
}
.orange{
	color: #df5400;
}
@media only screen and (max-width: 1024px) {
	.warpper{
		padding-top: 1rem;
	}
	.box_list{
		.item{
			width: 100%!important;
			img{
				width: 100%!important;
				max-height: 20rem!important;
			}
		}
	}
}

</style>
