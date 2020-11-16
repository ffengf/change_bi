<template>
    <div id="login" class="flexC">
        <div class="w75vw min_width1100 login_div">
            <div class="img_box sm-down">
                <h1>스위치와 함께하는 최고의 독서 경험, 지금 시작해볼까요?</h1>
                <img src="@/assets/img/login.png" alt="" srcset="" />
            </div>
            <div class="line sm-down"></div>
            <div class="right">
                <div class="box">
					<Rview />
				</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
@Component({
    components: { Rview },
})
export default class extends Vue {}
</script>



<style lang='less' scoped>
#login {
    .login_div {
        display: flex;
        padding: 2rem 0;
        min-width: 1024px;
    }
    .img_box {
        height: 600px;
        width: auto;
        box-sizing: border-box;
        width: 50%;
        h1 {
            width: 366px;
            height: 170px;
            margin: 40px 14px;
            font-family: NotoSansKR;
            font-size: 50px;
            font-weight: 300;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.23;
            letter-spacing: -3.75px;
            text-align: left;
            color: #3fa535;
            font-weight: 500;
        }
        img {
            margin: 70px 0;
            object-fit: contain;
        }
    }
    .right {
        width: 50%;
		height: 100%;
		box-sizing: border-box;
		padding: 3rem 5rem 0 5rem;

    }
    .line {
        height: auto;
        width: 1px;
        background: #ebebeb;
    }
}
@media only screen and (max-width: 768px) {
    .min_width1100 {
        min-width: auto !important;
    }
    .w75vw {
        width: 100vw!important;
	}
	.right{
		width: 100% !important;
		padding: 3rem 1.5rem 0 1.5rem!important;
	}
}
</style>
