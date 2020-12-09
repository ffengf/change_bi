<template>
    <div id="footer" class="flexBC">
        <div class="w70vw min_width1100 footer">
            <ul class="link_box">
                <li>서비스소개-服务介绍</li>
                <li>고객센터-跳客服中心</li>
                <li>서비스이용약관-服务条款</li>
                <li>개인정보취급방침-隐私</li>
            </ul>
            <div class="content">
                <p>법인명 : (주)창비 | 사업자등록번호 : 105-81-63672 |
                개인정보책임자 : 이정원</p>
                <p>주소 : 경기도 파주시 회동길 184 (문발동) | 대표이사 : 강일우 |
                통신판매업 : 제2009-경기파주-1928호</p>
                <p>전화 : 031-955-3333 (월~금, 10~17시) | 팩스 : 031-955-3400 |
                이메일 : supporter@changbi.com</p>
            </div>

            <p class="end">Copyright © 2020 Changbi. All rights reserved.</p>
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
            li {
                margin: 0 1.5rem;
                font-family: NotoSansKR;
                font-weight: 550;
                font-size: 14px;
                cursor: pointer;
            }
            li:nth-of-type(1) {
                margin-left: 0;
            }
        }
        .content {
			line-height: 1.1rem;
			p{
				font-family: NotoSansKR;
				font-size: 13px;
				font-weight: 500;
			}
        }
        .end {
            margin: 1rem 0 1.5rem 0;
            font-family: NotoSansKR;
            font-size: 12px;
        }
    }
}
</style>
