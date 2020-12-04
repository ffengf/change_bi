<template>
    <div class="date">
        <Bread :new_list="new_list" />
        <div class="box on">
			<div class="top">
				<h1>스위치 ON</h1>
				<div class="lines"></div>
			</div>
			<div class="bottom">
				<el-card class="card" shadow="never">
					<img src="https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png" alt="">
					<h1>김민수 장편소설 ‘함께’ 연재</h1>
					<h2>
						<span class="owner">xxx 작가</span>
						<el-divider direction="vertical" class="lines_000"></el-divider>
						<span>연재중</span>
					</h2>
					<h3>
						<p>15화<el-divider direction="vertical"></el-divider>당신과 함께한 추억을 되새기다  </p>
						<p>14화<el-divider direction="vertical"></el-divider>그대와의 새로운 기억, 청년시절로 시간을 되돌리다</p>
						<p>13화<el-divider direction="vertical"></el-divider>혼자 보내는 외로운 밤</p>
					</h3>
				</el-card>
				<el-card class="card" shadow="never">
					<img src="https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png" alt="">
					<h1>김민수 장편소설 ‘함께’ 연재김민수 장편소설 ‘함께’ 연재</h1>
					<h2>
						<span class="owner">xxx 작가</span>
						<el-divider direction="vertical"></el-divider>
						<span>연재중</span>
					</h2>
					<h3>
						<p>15화<el-divider direction="vertical"></el-divider>당신과 함께한 추억을 되새기다  당신과 함께한 추억을 되새기다  </p>
						<p>14화<el-divider direction="vertical"></el-divider>그대와의 새로운 기억, 청년시절로 시간을 되돌리다</p>
						<p>13화<el-divider direction="vertical"></el-divider>혼자 보내는 외로운 밤</p>
					</h3>
				</el-card>
				<el-card class="card" shadow="never">
					<img src="https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png" alt="">
					<h1>김민수 장편소설 ‘함께’ 연재</h1>
					<h2>
						<span class="owner">xxx 작가</span>
						<el-divider direction="vertical"></el-divider>
						<span>연재중</span>
					</h2>
					<h3>
						<p>15화<el-divider direction="vertical"></el-divider>당신과 함께한 추억을 되새기다  </p>
						<p>14화<el-divider direction="vertical"></el-divider>그대와의 새로운 기억, 청년시절로 시간을 되돌리다그대와의 새로운 기억, 청년시절로 시간을 되돌리다</p>
						<p>13화<el-divider direction="vertical"></el-divider>혼자 보내는 외로운 밤</p>
					</h3>
				</el-card>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";
@Component({
    components: {
        Bread,
    },
})
export default class extends Vue {
	new_list = [{ title: "매일연재" }];

	aaa(){
		console.log(1)
	}
	bbb(){
		console.log(2)
	}
}
</script>



<style lang='less' scoped>
.date{
	*{
		box-sizing: border-box;
	}
	.box{
		width: 100%;
		margin-bottom: 5.65rem;
		.top{
			height: 5.75rem;
			border: 1px solid #3fa535;
			margin-bottom: 1.25rem;
			h1{
				padding: 1rem 0 0 1.5rem;
				font-size: 30px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -1.5px;
			}
			.lines{
				margin: 1rem 0 0 1.5rem;
				width: 0.8rem;
				height: 2px;
				background: #324b9b;
			}
		}
		.bottom{
			display: flex;
			width: 100%;
			.card{
				margin-left: 1.25rem;
				border-radius: 0;
				cursor: pointer;
				&:nth-of-type(1){
					margin: 0;
				}
				/deep/.el-card__body{
					padding: 0!important;
				}
				img{
					height: 11rem;
					width: 16rem;
				}
				h1{
					margin-top: 1.25rem;
					// font-family: NotoSansKR;
					font-size: 19px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.95px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: 16rem;
				}
				h2{
					margin: 0.65rem 0 0.76rem 0;
					font-family: NotoSansKR-Medium;
					font-size: 12px;
					font-weight: normal;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.3px;
				}
				h3{
					font-family: NotoSansKR-Regular;
					font-size: 13px;
					font-weight: normal;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.33px;
					p{
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						width: 16rem;
					}
				}
			}
		}
	}
}
.on{
	.top{
		background: #324b9b;
		border: none!important;
		color: #fff !important;
		.lines{
			background: #7eec73!important;
		}
	}
}
.lines_000{
	background: #000!important;
}
</style>
