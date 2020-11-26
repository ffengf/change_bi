<template>
    <div class="login_warpper">
        <template v-if="step === 1">
            <h1>비밀번호찾기</h1>
            <h2>
                <p>가입시입력한</p>
                <p><strong>아이디</strong>와<strong>휴대폰번호</strong>를</p>
                <p>입력하세요.</p>
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
                                placeholder="휴대폰번호('-'는빼고입력해주세요)"
                            ></el-input>
                            <el-button type="default" plain>{{
                                $t("发送信息")
                            }}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
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
            <h1>{{ $t("重置密码") }}</h1>
            <h2>새로운비밀번호를입력해주세요.</h2>
            <div class="flex_column">
                <el-form ref="form" :model="info" :rules="rules">
                    <el-form-item prop="password">
                        <el-input
                            v-model="info.password"
                            :placeholder="$t('密码')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input
                            v-model="info.password"
                            :placeholder="$t('再次输入密码')"
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
