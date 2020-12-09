<template>
    <div id="footer" class="flexBC">
        <div class="w70vw min_width1100 footer">
            <ul class="link_box kr-me">
                <li @click="$router.push('/service/content')">서비스소개</li>
                <li @click="$router.push('/customer/notice')">고객센터</li>
                <li @click="$router.push('/service/use')">서비스이용약관</li>
                <li @click="$router.push('/service/privacy')">개인정보취급방침</li>
            </ul>
            <div class="content kr-re">
                <p>법인명 : (주)창비 <span>|</span> 사업자등록번호 : 105-81-63672 <span>|</span>
                개인정보책임자 : 이정원</p>
                <p>주소 : 경기도 파주시 회동길 184 (문발동) <span>|</span> 대표이사 : 강일우 <span>|</span>
                통신판매업 : 제2009-경기파주-1928호</p>
                <p>전화 : 031-955-3333 (월~금, 10~17시) <span>|</span> 팩스 : 031-955-3400 <span>|</span>
                이메일 : supporter@changbi.com</p>
            </div>

            <p class="end kr-re">Copyright © 2020 Changbi. All rights reserved.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {}
</script>

<style lang="less" scoped>
#footer {
    height: 100%;
    width: 100%;
    border-top: 1px solid #e1e1e1;
    box-sizing: border-box;
    flex-direction: column;
    .footer {
        .link_box {
            display: flex;
			margin: 1.75rem 0 1.25rem 0;
			flex-wrap: wrap;
            li {
                margin: 0 1.5rem;
                font-size: 14px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -1.05px;
				cursor: pointer;
				white-space: nowrap
            }
            li:nth-of-type(1) {
                margin-left: 0;
            }
        }
        .content {
			line-height: 1.1rem;
			p{
				font-size: 13px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.65px;
				span{
					margin: 0 0.3rem;
				}
			}
        }
        .end {
            margin: 1rem 0 1.5rem 0;
            font-family: NotoSansKR;
			font-size: 12px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			letter-spacing: normal;
        }
    }
}

@media only screen and (max-width: 1024px){
	.link_box{
		justify-content: space-around;
		li{
			width: 49%;
			margin: 0.5rem 0!important;
			text-align: center;
		}
	}
	.content,.end{
		text-align: center;
	}
}
</style>
