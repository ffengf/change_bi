<template>
    <div class="login_warpper">
        <template v-if="step === 1">
            <h1>{{ $t("找回账号") }}</h1>
            <h2>가입 아이디를 확인해 주세요.</h2>
            <div class="flex_column">
                <el-form ref="form" :model="info" :rules="rules">
                    <el-form-item prop="username">
                        <div class="flex">
                            <el-input
                                v-model="info.password"
                                :placeholder="$t('手机号')"
                            ></el-input>
                            <el-button type="primary" plain>{{
                                $t("发送信息")
                            }}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="info.password"
                            :placeholder="$t('验证码')"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="success" @click="step = 2">{{
                    $t("确认")
                }}</el-button>
            </div>
        </template>
        <template v-if="step === 2">
            <h1>{{ $t("找回账号结果") }}</h1>
            <h2><em>가입 아이디를</em>확인해 주세요.</h2>
			<div class="box">
				<span class="h1">{{ $t("账号") }}</span>
				<span class="h2">11123awedf</span>
				<h3>2018.01.01</h3>
			</div>
			<div class="btn_box">
				<el-button type="primary" plain @click="$router.push('/login/findpassword')">{{ $t('找回密码') }}</el-button>
				<el-button type="success" @click="$router.push('/login/signin')">{{ $t('登录') }}</el-button>
			</div>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
    rules = {};
    info = {
        username: "",
        password: "",
        check: true,
    };

    step = 1;
}
</script>

<style lang="less" scoped>
.box {
	margin-top: 1rem;
	.h1{
		font-weight: 550;
	}
	.h2{
		color: #3fa535;
		margin-left: 0.5rem;
	}
	h3{
		margin-top: 1rem;
		color: #929292;
		font-size: 15px;
	}
	.btn_box {
		display: flex;
		justify-content: space-between;
		> *{
			width: 45%;
		}
	}
}
</style>
