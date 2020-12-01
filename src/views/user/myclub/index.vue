<template>
    <div class="user">
		<div class="user_information">
			<div class="bg_color_primary">마이페이지</div>
			<div>
				<div class="user_avatar">
					<img src="@/assets/img/user/1.png" alt="">
					<img src="@/assets/img/user/2.png" alt="">
				</div>
				<p class="user_name kr-bo">유승하 님</p>
				<p class="momenti kr-re">(momenti)</p>
				<p class="color_success b mt30 fs16 pb10 user_line">주요관리</p>
				<p class="mt10 fs14">나의 모임</p>
				<p class="mt10 fs14">나의 이벤트</p>
			</div>
			<div>
				<p class="pb10 user_line color_primary fs16">회원정보</p>
				<p class="fs14 mt10 kr-re">개인 정보 수정</p>
				<p class="pb10 user_line color_primary fs16 mt20">서비스 이용내역</p>
				<p class="mt10 fs14 kr-re">찜</p>
				<p class="mt10 fs14 kr-re">나의 모임</p>
				<p class="mt10 fs14 kr-re">나의 이벤트</p>
				<p class="mt10 fs14 kr-re">결제내역</p>
				<p class="mt10 fs14 kr-re">쿠폰조회</p>
				<p class="mt10 fs14 kr-re">수료증 발급</p>
				<p class="mt10 fs14 kr-re">로그아웃</p>
			</div>
		</div>
		<div class="user_party">
			<div class="party_title">나의 모임</div>
			<div class="party_title_line mt20 bg_color_success"></div>
			<div class="party_list flexBC user_line">
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
.flex{
	align-items: flex-start;
}
.user{
	padding-bottom:80px;
	display: flex;
	justify-content: space-between;
	.user_information{
		width:320px;
		div:first-child{
			padding:31px;
			font-size: 22px;
			line-height: 1.09;
			letter-spacing: -1.1px;
			color: #ffffff;
		}
		div:nth-child(2){
			padding: 40px 31px;
			border: solid 1px #324b9b;
			border-bottom :transparent;
			.user_avatar{
				margin:auto;
				padding:0;
				width:82px;
				height:82px;
				position: relative;
				img:first-child{
					width:100%;
					height:100%;
				}
				img:last-child{
					position: absolute;
					bottom:5px;
					right:-5px;
					width:25px;
					height:25px;
				}
			}
			.user_name{
				font-size: 15px;
				text-align: center;
				margin-top:5px;
			}
			.momenti{
				font-size: 11.5px;
				text-align: center;
			}
			
		}
		div:nth-child(3){
			padding: 34px 29px 29px;
			border: solid 2px #3fa535;
		}
	}
	.user_line{
		border-bottom:1px solid #324b9b
	}
	.user_party{
		width:607px;
		.party_title{
			font-family: NotoSansKR;
			font-size: 22px;
			line-height: 1.16;
			letter-spacing: -1.1px;
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
			.party_detail{
				div:first-child{
					display: flex;
					align-items: center;
					line-height:12px;
					div:first-child{
						font-size: 12px;
						padding-right:10px;
						border-right:1px solid #000
					}
					div:last-child{
						font-size: 12px;
					}
				}
				div:last-child{
					font-family: NotoSansKR;
					font-size: 17px;
				}
			}
			.select{
				width: 6rem;
				height: 34px;
				line-height:34px;
				font-family: NotoSansKR;
				font-size: 13.5px;
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
@media only screen and (max-width: 1025px){
	.user{
		display: block;
		.user_information{
			width:100%;
			padding:0 1rem;
			box-sizing: border-box;
		}
		.user_party{
			margin-top:50px;
			width:100%;
			padding:0 1rem;
			box-sizing: border-box;
		}
	}
}

</style>
