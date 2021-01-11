<template>
    <div id="login" class="flexC" v-loading="_loading">
        <div class="w75vw min_width1100 login_div">
            <div class="img_box sm-down">
                <h1>
					<p class="kr-li">스위치와 함께하는</p>
					<p class="kr-li">최고의 독서 경험,</p>
					<p>지금 시작해볼까요?</p>
                </h1>
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
import { UserModule } from '@/store/user';
@Component({
    components: { Rview },
})
export default class extends Vue {

	created(){
		if(UserModule.token !== null && UserModule.token !== ''){
			this._loading = true
			this.$message.success('로그인 되었습니다. 홈페이지로 이동하겠습니다.')
			setTimeout(() => {
				this.$router.push('/')
			}, 1000);
		}
	}
}
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
            width: 410px;
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
        display: flex;
        justify-content: center;
        margin: 3rem 0;
        .box {
            width: 18rem;
        }
        // padding: 3rem 4rem 0 4rem;
    }
    .line {
        height: auto;
        width: 1px;
        background: #ebebeb;
    }
}
@media only screen and (max-width: 1024px) {
    .min_width1100 {
        min-width: 100% !important;
    }
    .w75vw {
        width: 100vw !important;
    }
    .right {
        width: 100% !important;
		padding: 0 1.5rem 0 1.5rem !important;
		margin-top: 0!important;
		.box{
			width: 100%!important;
			max-width: 20rem;
		}
    }
}
</style>
