<template>
    <div id="info">
		<div class="left">
			<img src="https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png">
			<div class="title">상세설명</div>
			<div class="line"></div>
			<div class="box">
				관리자에서 작성한 내용 입력
『개인주의자 선언』 『미스 함무라비』 문유석 판사의 신작. 글쓰는 판사, 소문난 다독가로 알려진 작가의 독서 에세이로, 어린 시절부터 지금까지 책 중독자로 살아온 이야기를 유쾌하게 담았다. 사춘기 시절 야한 장면을 찾아 읽다가 한국문학전집을 샅샅이 읽게 된 사연, 『유리가면』으로 순정만화 세계에 입문한 이야기, 고시생 시절 『슬램덩크』가 안겨준 뭉클함, 김용과 무라카미 하루키 전작을 탐독한 이유 등 책과 함께 가슴 설레고 즐거웠던 책 덕후 인생을 솔직하게 펼쳐 보인다. 단, 아무리 대단해 보여도 딱딱하고 지루한 책은 읽지 않았다. 이 책은 읽고 싶은 것만 읽어온 편식 독서에 대한 이야기다.
글쓰는 판사, 소문난 다독가로 알려진 작가의 독서 에세이로, 어린 시절부터 지금까지 책 중독자로 살아온 이야기를 유쾌하게 담았다. 사춘기 시절 야한 장면을 찾아 읽다가 한국문학전집을 샅샅이 읽게 된 사연, 『유리가면』으로 순정만화 세계에 입문한 이야기, 고시생 시절 『슬램덩크』가 안겨준 뭉클함, 김용과 무라카미 하루키 전작을 탐독한 이유 등 책과 함께 가슴 설레고 즐거웠던 책 덕후 인생을 솔직하게 펼쳐 보인다. 단, 아무리 대단해 보여도 딱딱하고 지루한 책은 읽지 않았다. 이 책은 읽고 싶은 것만 읽어온 편식 독서에 대한 이야기다.
			</div>
			<div class="title mt">환불규정</div>
			<div class="line"></div>
			<div class="box">
				관리자에서 작성한 내용 입력
『개인주의자 선언』 『미스 함무라비』 문유석 판사의 신작. 글쓰는 판사, 소문난 다독가로 알려진 작가의 독서 에세이로, 어린 시절부터 지금까지 책 중독자로 살아온 이야기를 유쾌하게 담았다. 사춘기 시절 야한 장면을 찾아 읽다가 한국문학전집을 샅샅이 읽게 된 사연, 『유리가면』으로 순정만화 세계에 입문한 이야기, 고시생 시절 『슬램덩크』가 안겨준 뭉클함, 김용과 무라카미 하루키 전작을 탐독한 이유 등 책과 함께 가슴 설레고 즐거웠던 책 덕후 인생을 솔직하게 펼쳐 보인다. 단, 아무리 대단해 보여도 딱딱하고 지루한 책은 읽지 않았다. 이 책은 읽고 싶은 것만 읽어온 편식 독서에 대한 이야기다.
글쓰는 판사, 소문난 다독가로 알려진 작가의 독서 에세이로, 어린 시절부터 지금까지 책 중독자로 살아온 이야기를 유쾌하게 담았다. 사춘기 시절 야한 장면을 찾아 읽다가 한국문학전집을 샅샅이 읽게 된 사연, 『유리가면』으로 순정만화 세계에 입문한 이야기, 고시생 시절 『슬램덩크』가 안겨준 뭉클함, 김용과 무라카미 하루키 전작을 탐독한 이유 등 책과 함께 가슴 설레고 즐거웠던 책 덕후 인생을 솔직하게 펼쳐 보인다. 단, 아무리 대단해 보여도 딱딱하고 지루한 책은 읽지 않았다. 이 책은 읽고 싶은 것만 읽어온 편식 독서에 대한 이야기다.
			</div>
		</div>
		<div class="right">
			<div class="top">
				<h1>클럽이름</h1>
				<h2>클럽부재</h2>
			</div>
			<div class="mid">
				<h2>신청하기</h2>
				<h1>맴버십 (1개월)</h1>
				<h3>(설명)1개월동안 진행되는 맴버십입니다.</h3>
				<div class="line"></div>
				<div class="money" v-if="info.money">무료</div>
				<div class="money" v-else>60,000원</div>
			</div>
			<div class="bottom">
				<div class="pay" v-if="!info.money">
					<h1>결제하기</h1>
					<div class="how">
						<div>결제방법</div>
						<el-select v-model="value" placeholder="신용카드">
							<el-option>123</el-option>
							<el-option>111</el-option>
							<el-option>222</el-option>
						</el-select>
					</div>
					<div class="line"></div>
					<div class="info_money">
						<div class="left">결제금액</div>
						<div class="right">60,000원</div>
					</div>
				</div>
				<el-button type="success" class="btn" @click="info.money = !info.money">신청하기</el-button>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {

	info = {
		money:false
	}
	value = ''

	get id(){
		return this.$route.params.id
	}

	@Watch('id')
	async get_info(){
		this.$route.meta.title = this.id
	}

	created(){
		this.get_info()
	}
}
</script>



<style lang='less' scoped>
#info{
	margin-top: -0.5rem;
	display: flex;
	justify-content: space-between;
	margin-bottom: 6rem;
	.left{
		width: 30rem;
		img{
			width: 100%;
			height: 21.5rem;
		}
		.title{
			font-family: NotoSansKR;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.71;
			letter-spacing: -0.7px;
			font-size: 14px;
			font-weight: 500;
			color: #324b9b;
			margin-top: 2rem;
		}
		.mt{
			margin-top: 2.6rem;
		}
		.line{
			background: #324b9b;
			height: 1px;
			margin: 0.5rem 0 1.5rem 0;
		}
		.box{
			font-family: NotoSansKR;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.71;
			letter-spacing: -0.7px;
		}
	}
	.right{
		width: 16rem;
		.top{
			width: 100%;
			height: 5.25rem;
			background: #324b9b;
			box-sizing: border-box;
			padding-top: 1.5rem;
			padding-left: 1.4rem;
			h1,h2{
				color: #fff;
			}
			h1{
				font-family: NotoSansKR;
				font-size: 22px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.09;
				letter-spacing: -1.1px;
				text-align: left;
			}
			h2{
				margin-top: 0.5rem;
				font-family: NotoSansKR;
				font-size: 14px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.71;
				letter-spacing: -0.7px;
				text-align: left;
			}
		}
		.mid{
			width: 100%;
			height: 11rem;
			box-sizing: border-box;
			border-left: 1px solid #dfdfdf;
			border-right: 1px solid #dfdfdf;
			padding: 1.5rem 1.4rem;
			overflow: hidden;
			h2{
				font-family: NotoSansKR;
				font-size: 16px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.5;
				letter-spacing: -0.8px;
				text-align: left;
			}
			h1{
				font-family: NotoSansKR;
				font-size: 22px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.09;
				letter-spacing: -1.1px;
				text-align: left;
				color: #3fa535;
				margin: 0.7rem 0;
			}
			h3{
				font-family: NotoSansKR;
				font-size: 13px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.77;
				letter-spacing: -0.65px;
				text-align: left;
				color: #000000;
			}
			.line{
				background: #dfdfdf;
				height: 1px;
				margin: 1.1rem 0;
			}
			.money{
				font-family: NotoSansKR;
				font-size: 18px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.28;
				letter-spacing: -0.9px;
				color: #324b9b;
				float: right;
				margin-bottom: 1.5rem;
			}
		}
		.bottom{
			width: 100%;
			border: 3px solid #3fa535;
			box-sizing: border-box;
			padding: 1.5rem;
			.pay{
				margin-bottom: 1.9rem;
				h1{
					font-family: NotoSansKR;
					font-size: 16px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					line-height: 1.5;
					letter-spacing: -0.8px;
					text-align: left;
					color: #000000;
				}
				.how{
					>div{
						font-family: NotoSansKR;
						font-size: 14px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						line-height: 1.64;
						letter-spacing: -0.7px;
						text-align: left;
					}
					display: flex;
					align-items: center;
					justify-content: space-between;
					/deep/.el-input__inner{
						border: 1px solid #000000 !important;
						padding: 0.75rem !important;
						box-sizing: border-box!important;
						height: 2rem;
						width: 7.5rem;
					}
				}
				.line{
					height: 1px;
					background: #dfdfdf;
					margin: 1rem 0;
				}
				.info_money{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						font-family: NotoSansKR;
						font-size: 14px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						line-height: 1.64;
						letter-spacing: -0.7px;
					}
					.right{
						font-family: NotoSansKR;
						font-size: 16px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						line-height: 1.44;
						letter-spacing: -0.4px;
						text-align: right;
					}
				}
			}
			.btn{
				width: 100%;
				font-family: NotoSansKR;
				font-size: 15px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.38px;
			}
		}
	}
}
</style>
