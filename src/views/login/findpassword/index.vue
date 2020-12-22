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
                <el-form ref="form" :model="info_1" :rules="rules">
                    <el-form-item prop="username">
                        <el-input
                            v-model="info_1.username"
                            placeholder="아이디(이메일)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <div class="flex">
                            <el-input
                                v-model="info_1.phone"
                                placeholder="휴대폰 번호('-'는 빼고 입력해주세요)"
								class="width_70"
                            ></el-input>
                            <PhoneSend :phone="info_1.phone" />
                        </div>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input
                            v-model="info_1.code"
                            placeholder="인증번호 6자리"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="success" style="margin-top:2rem" @click="submit_1" :loading="btn_loadding.submit_1">확인</el-button>
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
                <el-form ref="form" :model="info_2" :rules="rules">
                    <el-form-item prop="password">
                        <el-input
							show-password
                            v-model="info_2.password"
                            placeholder="영문,숫자,특수문자 포함8자 이상 입력"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="again_pass">
                        <el-input
							show-password
                            v-model="info_2.again_pass"
                            placeholder="비밀번호를 한번 더 입력해 주세요."
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button
                    type="success"
					style="margin-top:2rem"
                    @click="submit_2"
					:loading="btn_loadding.submit_2"
                    >확인</el-button
                >
            </div>
        </template>
		<template v-if="step === 3">
            <h1>success</h1>
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

	validateEmail(rule, value, callback) {
        if (value === "") {
            callback(new Error("이메일을 입력해 주세요."));
        } else if (
            !value.match(/^[a-zA-Z0-9_-|.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
        ) {
            callback(new Error("정확한 이메일 주소를 이력해 주세요."));
        } else {
            callback();
        }
	}
	validatePass(rules, value, callback) {
        if (this.info_2.password !== this.info_2.again_pass) {
            callback(new Error("비밀번호와 비밀번호 확인이 일치하지 않습니다."));
        } else {
            callback();
        }
	}
	validatePass_8(rules, value, callback){
		const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
		if(reg.test(value)){
			callback()
		}else{
			callback(new Error("영문,숫자,특수문자 포함 8자 이상 입력"));
		}
	}

    rules = {
		phone: [{ required: true, validator: this.validatePhone }],
		code: [{ required: true, }],
		username: [{ required: true, validator: this.validateEmail }],
		password: [{ required: true, validator: this.validatePass_8  }],
		again_pass: [
            {
                required: true,
                validator: this.validatePass,
                trigger: ["change"],
            },
        ],
	};
    info_1 = {
        username: "",
        phone: "",
        code: "",
    };

	step = 1;

	btn_loadding = {
		submit_1:false,
		submit_2:false
	}



	async submit_1(){
		await (this.$refs["form"] as ElForm).validate();
		this.btn_loadding.submit_1 = true
		const data = await api_login.check_account(this.info_1).finally(()=>{
			this.btn_loadding.submit_1 = false
		})
		this.info_2 = {
			id:data.id,
			token:data.token,
			password:'',
			again_pass:''
		}
		this.step = 2
	}

	info_2 = {
		id:0,
		token:'',
		password:'',
		again_pass:''
	}

	async submit_2(){
		await (this.$refs["form"] as ElForm).validate();
		this.btn_loadding.submit_2 = true
		await api_login.edit_user({
			id:this.info_2.id,
			token:this.info_2.token,
			password:this.info_2.password,
		}).finally(()=>{
			this.btn_loadding.submit_2 = false
		})
		// this.$message.success('success')
		await this.$alert('성공적으로 변경되었습니다.','비밀번호 변경',{
			confirmButtonText: '확인',
		}).finally(()=>{
			this.$router.push('/login/signin')
		})
	}
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
	.flex {
        justify-content: space-between;
        align-items: flex-end;
    }
}
.width_70 {
    width: 70%;
}
</style>
