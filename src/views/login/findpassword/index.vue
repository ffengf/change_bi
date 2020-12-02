<template>
    <div class="login_warpper">
        <template v-if="step === 1">
            <h1>비밀번호 찾기</h1>
            <h2>
                <p class="kr-li">가입 시 입력한</p>
                <p><strong class="kr-me">아이디</strong><em class="kr-li">와</em><strong class="kr-me">휴대폰 번호</strong><em class="kr-li">를</em></p>
                <p class="kr-li">입력하세요.</p>
            </h2>
            <div class="flex_column">
                <el-form ref="form" :model="info" :rules="rules">
                    <el-form-item prop="password">
                        <el-input
                            v-model="info.password"
                            placeholder="아이디(이메일)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                        <div class="flex">
                            <el-input
                                v-model="info.password"
                                placeholder="휴대폰 번호('-'는 빼고 입력해주세요)"
                            ></el-input>
                            <el-button type="default" plain>{{
                                $t("发送信息")
                            }}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="info.password"
                            placeholder="인증번호 6자리"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="success" style="margin-top:2rem" @click="step = 2">{{
                    $t("确认")
                }}</el-button>
            </div>
        </template>
        <template v-if="step === 2">
            <h1>비밀번호 변경</h1>
            <h2>
				<p class="kr-li">새로운</p>
				<p>비밀번호<em class="kr-li">를</em></p>
				<p class="kr-li">입력해주세요.</p>
			</h2>
            <div class="flex_column">
                <el-form ref="form" :model="info" :rules="rules">
                    <el-form-item prop="password">
                        <el-input
                            v-model="info.password"
                            placeholder="영문,숫자,특수문자 포함8자 이상 입력"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input
                            v-model="info.password"
                            placeholder="휴대폰 번호('-'는 빼고 입력해주세요)"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button
                    type="success"
					style="margin-top:2rem"
                    @click="$router.push('/login/signin')"
                    >{{ $t("确认") }}</el-button
                >
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
    .h1 {
        font-weight: 550;
    }
    .h2 {
        color: #3fa535;
        margin-left: 0.5rem;
    }
    h3 {
        margin-top: 1rem;
        color: #929292;
        font-size: 15px;
    }
}
</style>
