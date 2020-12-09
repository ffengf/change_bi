<template>
    <div class="login_warpper">
        <template v-if="step === 1">
            <h1>아이디찾기</h1>
            <h2>
                <p class="kr-li">가입 시 입력한</p>
                <p>
                    <em class="kr-me">휴대폰 번호</em><em class="kr-li">를</em>
                </p>
                <p class="kr-li">입력하세요.</p>
            </h2>
            <div class="flex_column">
                <el-form ref="form" :model="info" :rules="rules">
                    <el-form-item prop="phone">
                        <div class="flex">
                            <el-input
                                class="width_70"
                                v-model="info.phone"
                                placeholder="휴대폰 번호('-'는 빼고 입력해주세요)"
                            ></el-input>
                            <el-button type="default" size="small" plain @click="send_tel_pass" :loading="btn_loadding.send"
                                >인증번호 발송</el-button
                            >
                        </div>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input
                            class="width_70"
                            v-model="info.code"
                            placeholder="인증번호 6자리"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button
                    type="success"
                    style="margin-top: 2rem"
                    @click="submit"
                    >확인</el-button
                >
            </div>
        </template>
        <template v-if="step === 2">
            <h1>아이디 찾기 결과-找回账号结果</h1>
            <h2>
                <p>
                    <strong class="kr-me">가입 아이디</strong
                    ><em class="kr-li">를</em>
                </p>
                <p class="kr-li">확인해 주세요.</p>
            </h2>
            <div class="box">
                <span class="h1">아이디</span>
                <span class="h2">{{ user_info.username }}</span>
                <h3>{{ user_info.create_time }}</h3>
            </div>
            <div class="btn_box">
                <el-button
                    type="default"
                    plain
                    @click="$router.push('/login/findpassword')"
                    >비밀번호 찾기</el-button
                >
                <el-button type="success" @click="$router.push('/login/signin')"
                    >로그인하기</el-button
                >
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { api_login } from "@/api";
import { ElForm } from "element-ui/types/form";
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
    validatePhone(rule, value: string, callback) {
        if (value.length !== 11) {
            callback(new Error("输入11位"));
        } else {
            callback();
        }
    }
    rules = {
        phone: [{ required: true, validator: this.validatePhone }],
        code: [{ required: true }],
    };
    info = {
        phone: "",
        code: "",
    };
    user_info = {
        username: "",
        create_time: "",
	};
	btn_loadding = {
		send:false
	}

	async send_tel_pass() {
        (this.$refs["form"] as ElForm).validateField("phone", async (rules) => {
            this.btn_loadding.send = true;
			try {
				await api_login.send_sms({
					phone: this.info.phone,
				});
				this.btn_loadding.send = false;
				this.$message.success("发送成功，输入验证码");
			} catch (e) {
				this.btn_loadding.send = false;
			}
        });
    }

    async submit() {
		await (this.$refs["form"] as ElForm).validate();
		this.user_info = await api_login.find_account(this.info);
		this.step = 2
    }

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
