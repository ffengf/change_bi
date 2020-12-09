<template>
    <div id="user" class="flexC">
        <div class="user w70vw min_width1000">
            <Bread class="bread" />
            <div class="line mt10"></div>
            <div class="body">
                <div class="user_information">
                    <div class="bg_color_primary">마이페이지</div>
                    <div>
                        <div class="user_avatar">
                            <img src="@/assets/img/user/1.png" alt="" />
                            <img src="@/assets/img/user/2.png" alt="" />
                        </div>
                        <p class="user_name kr-bo">유승하 님</p>
                        <p class="momenti kr-re">(momenti)</p>
                        <p class="color_success b mt30 fs16 pb10 user_line">
                            참여 관리
                        </p>
                        <p class="mt10 fs14 pointer">나의 모임</p>
                        <p class="mt10 fs14 pointer">나의 이벤트</p>
                    </div>
                    <div class="kr-re">
                        <p class="pb10 user_line color_primary fs16">
                            회원정보
                        </p>
                        <p class="fs14 mt10 pointer">개인정보 수정</p>
                        <p class="pb10 user_line color_primary fs16 mt20">
                            서비스 이용내역
                        </p>
                        <p class="mt10 fs14 pointer">찜</p>
                        <p class="mt10 fs14 pointer">나의 모임</p>
                        <p class="mt10 fs14 pointer">나의 이벤트</p>
                        <p class="mt10 fs14 pointer">결제내역</p>
                        <p class="mt10 fs14 pointer">쿠폰조회</p>
                        <p class="mt10 fs14 pointer">로그아웃</p>
                    </div>
                </div>
                <div class="content">
					<div class="party_title">{{ title }}</div>
					<div class="line bg_color_success"></div>
					<Rview />
				</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue";
@Component({
    components: {
        Rview,
        Bread,
    },
})
export default class extends Vue {
	get title():string{
		return this.$route.meta.title
	}

}
</script>



<style lang='less' scoped>
#user {
    width: 100%;
    margin-top: 3.75rem;
    .user {
        display: flex;
        flex-direction: column;
    }
    .line {
        background: #324b9b;
    }
    .body {
        margin-top: 2rem;
		width: 100%;
		display: flex;
		margin-bottom:4rem;
		justify-content: space-between;
		flex-wrap: wrap;
        .user_information {
            width: 16rem;
            div:first-child {
                padding: 31px;
                font-size: 22px;
                letter-spacing: -1.1px;
                color: #ffffff;
            }
            div:nth-child(2) {
                padding: 40px 31px;
                border: 1px solid #324b9b;
                border-bottom: transparent;
                .user_avatar {
                    margin: auto;
                    padding: 0;
                    width: 82px;
                    height: 82px;
                    position: relative;
                    img:first-child {
                        width: 100%;
                        height: 100%;
                    }
                    img:last-child {
                        position: absolute;
                        bottom: 5px;
                        right: -5px;
                        width: 25px;
                        height: 25px;
                    }
                }
                .user_name {
                    font-size: 15px;
                    text-align: center;
                    margin-top: 5px;
                }
                .momenti {
                    font-size: 11.5px;
                    text-align: center;
                }
            }
            div:nth-child(3) {
                padding: 34px 29px 29px;
				border: 2px solid #3fa535;
				> p{
					letter-spacing: -0.35px;
					font-family: NotoSansKR;
				}
            }
		}
		.content{
			width: 30.5rem;
			padding-top: 2rem;
			.party_title{
				font-family: NotoSansKR;
				font-size: 22px;
				letter-spacing: -1.1px;
				color: #3fa535;
				border-left:3px solid #3fa535;
				padding-left:0.75rem;
				height: 1rem;
				line-height: 1rem;
			}
			.line{
				width:100%;
				height:2px;
				margin-top: 1rem;
			}
			/deep/.warpper{
				position: relative;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				.box{
					height: 4.5rem;
					width: 100%;
					border-bottom: 1px solid #324b9b;
					box-sizing: border-box;
					padding: 1.2rem 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.box_left{
						h2{
							font-family: NotoSansKR;
							font-size: 12px;
							font-weight: normal;
							font-stretch: normal;
							font-style: normal;
							letter-spacing: -0.3px;
							>span:nth-of-type(2){
								margin: 0 0.2rem;
							}
						}
						h1{
							margin-top: 0.2rem;
							font-size: 17px;
							font-weight: 500;
							font-stretch: normal;
							font-style: normal;
							letter-spacing: -0.85px;
							.small{
								font-size: 13.5px;
							}
						}
					}
					.right_btn{
						width: 6.8rem;
						height: 1.7rem;
						padding: 0!important;
					}
					.text{
						color: #3fa535;
						font-family: NotoSansKR;
						font-size: 17px;
						font-weight: 500;
						font-stretch: normal;
						font-style: normal;
					}
				}
				.more{
					margin-top: 1.5rem;
					width: 10rem;
					height: 2.2rem;
				}
			}
		}
    }
}
.user_line{
	border-bottom:1px solid #324b9b
}
@media only screen and (max-width: 1024px) {
	.user_information,.content{
		width: 100%!important;
	}
}
</style>
