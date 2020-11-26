<template>
    <div class="login_warpper">
        <template v-if="step === 1">
            <h1>아이디찾기</h1>
            <h2>
                <p>가입시입력한</p>
                <p><strong>휴대폰번호를</strong></p>
                <p>입력하세요.</p>
            </h2>
            <div class="flex_column">
                <el-form ref="form" :model="info" :rules="rules">
                    <el-form-item prop="username">
                        <div class="flex">
                            <el-input
                                class="width_70"
                                v-model="info.password"
                                placeholder="휴대폰번호('-'는빼고입력해주세요)"
                            ></el-input>
                            <el-button type="default" size="small" plain
                                >인증번호발송</el-button
                            >
                        </div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            class="width_70"
                            v-model="info.password"
                            placeholder="인증번호6자리"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="success" style="margin-top:2rem" @click="step = 2">{{
                    $t("确认")
                }}</el-button>
            </div>
        </template>
        <template v-if="step === 2">
            <h1>{{ $t("找回账号结果") }}</h1>
            <h2>
                <p><strong>가입아이디</strong>를</p>
                <p>확인해주세요.</p>
            </h2>
            <div class="box">
                <span class="h1">아이디</span>
                <span class="h2">11123awedf</span>
                <h3>2018.01.01</h3>
            </div>
            <div class="btn_box">
                <el-button
                    type="default"
                    plain
                    @click="$router.push('/login/findpassword')"
                    >비밀번호찾기</el-button
                >
                <el-button type="success" @click="$router.push('/login/signin')"
                    >로그인하기</el-button
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
    .btn_box {
        display: flex;
        justify-content: space-between;
        > * {
            margin-top: 3.5rem;
            width: 49%;
        }
    }
    .flex {
        justify-content: space-between;
        align-items: flex-end;
    }
    /deep/ .el-input__inner {
        background: red !important;
    }
}

.width_70 {
    width: 70%;
}
</style>
