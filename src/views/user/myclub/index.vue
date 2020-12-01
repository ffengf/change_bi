<template>
    <div class="user">
		<div class="user_information">
			<div class="bg_color_primary">마이페이지</div>
			<div>
				<div class="user_avatar">
					<img src="" alt="">
					<img src="" alt="">
				</div>
				<p>유승하 님</p>
				<p>(momenti)</p>
				<p>주요관리</p>
				<div></div>
				<p>나의 모임</p>
				<p>나의 이벤트</p>
			</div>
			<div>
				<p>회원정보</p>
				<div></div>
				<p>개인 정보 수정</p>
				<p>서비스 이용내역</p>
				<div></div>
				<p>찜</p>
				<p>나의 모임</p>
				<p>나의 이벤트</p>
				<p>결제내역</p>
				<p>쿠폰조회</p>
				<p>수료증 발급</p>
				<p>로그아웃</p>
			</div>
		</div>
		<div class="user_party">
			<div class="party_title">나의 모임</div>
			<div class="party_title_line mt20 bg_color_success"></div>
			<div class="party_list flexBC">
				<div class="party_detail">
					<div>
						<div class="color_success mr10">진행 중</div>
						<div>2020. 11. 01 ~ 2020. 11. 30</div>
					</div>
					<div class="mt10">클럽 창작과비평 2기</div>
				</div>
				<div class="bg_color_success select">참여하기</div>
			</div>
			<div class="loading_more bg_color_success">더 보기</div>
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
.user{
	display: flex;
	justify-content: space-between;
	.user_information{
		width:320px;
		div:first-child{
			padding:31px;
			font-family: NotoSansKR;
			font-size: 22px;
			font-weight: 500;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.09;
			letter-spacing: -1.1px;
			text-align: left;
			color: #ffffff;
		}
		div:nth-child(2){
			padding: 40px 31px;
			border: solid 1px #324b9b;
			border-bottom :transparent;
			.user_avatar{
				width:82px;
				height:82px;
				position: relative;
				img:first-child{
					width:100%;
					height:100%;
				}
				img:last-child{
					position: absolute;
					bottom:10px;
					right:-10px;
					width:25px;
					height:25px;
				}
			}
		}
		div:nth-child(3){
			padding: 34px 29px 29px;
			border: solid 2px #3fa535;
		}
	}
	.user_party{
		width:607px;
		.party_title{
			font-family: NotoSansKR;
			font-size: 22px;
			font-weight: 500;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.16;
			letter-spacing: -1.1px;
			text-align: left;
			color: #3fa535;
			border-left:3px solid #3fa535;
			padding-left:16px
		}
		.party_title_line{
			width:100%;
			height:2px;
		}
		.party_list{
			padding:24px 0;
			border-bottom:1px solid #324b9b;
			.party_detail{
				div:first-child{
					display: flex;
					align-items: center;
					font-size: 12px;
					line-height:12px;
					div:first-child{
						padding-right:10px;
						border-right:1px solid #000
					}
				}
				&div:last-child{
					font-size: 17px;
				}
			}
			.select{
				width: 136px;
				height: 34px;
				line-height:34px;
				font-family: NotoSansKR;
				font-size: 13.5px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				text-align: center;
				color: #ffffff;
			}
		}
		.loading_more{
			width: 200px;
			height: 44px;
			margin: 30px auto;
			font-size: 15px;
			line-height:44px;
			text-align: center;
			color:#fff;
		}
	}
}


</style>
