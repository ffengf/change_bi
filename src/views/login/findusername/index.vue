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
                                placeholder="'-'는 빼고 입력해주세요"
                            ></el-input>
                            <PhoneSend class="send_btn" :phone="info.phone" />
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
            <h1>아이디 찾기 결과</h1>
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
import PhoneSend from "../components/phoneSend.vue"
@Component({
	components:{
		PhoneSend
	}
})
export default class extends Vue {
    validatePhone(rule, value: string, callback) {
        if (value.length !== 11) {
            callback(new Error("'-'를 빼고 입력해 주세요."));
        } else {
            callback();
        }
    }
    rules = {
        phone: [{ required: true, validator: this.validatePhone }],
        code: [{ required: true,message:'인증번호를 입력해 주세요.' }],
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
    width: 65%;
}
.login_warpper{
	/deep/.el-input__inner{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
}
@media only screen and (max-width: 1024px) {
	.width_70 {
		width: 100%;
		flex: 1;
	}
	// .send_btn{
	// 	width: 50%;
	// }
}
</style>
