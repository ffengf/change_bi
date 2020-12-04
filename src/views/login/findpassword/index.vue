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
                            <el-button type="default" plain size="small" :loading="btn_loadding.send" @click="send_tel_pass">인증번호 발송</el-button>
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
                            placeholder="휴대폰 번호('-'는 빼고 입력해주세요)"
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
import { api_user } from "@/api/user";
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

	validateEmail(rule, value, callback) {
        if (value === "") {
            callback(new Error("输入"));
        } else if (
            !value.match(/^[a-zA-Z0-9_-|.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
        ) {
            callback(new Error("不对"));
        } else {
            callback();
        }
	}
	validatePass(rules, value, callback) {
        if (this.info_2.password !== this.info_2.again_pass) {
            callback(new Error("两次不对"));
        } else {
            callback();
        }
	}
	validatePass_8(rules, value, callback){
		const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
		if(reg.test(value)){
			callback()
		}else{
			callback(new Error("简单了"));
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
        username: "532864961@qq.com",
        phone: "15107550015",
        code: "121231",
    };

	step = 1;

	btn_loadding = {
		send:false,
		submit_1:false,
		submit_2:false
	}

	async send_tel_pass() {
        (this.$refs["form"] as ElForm).validateField("phone", async (rules) => {
            this.btn_loadding.send = true;
			try {
				await api_user.send_sms({
					phone: this.info_1.phone,
				});
				this.btn_loadding.send = false;
				this.$message.success("发送成功，输入验证码");
			} catch (e) {
				this.btn_loadding.send = false;
			}
        });
    }


	async submit_1(){
		await (this.$refs["form"] as ElForm).validate();
		this.btn_loadding.submit_1 = true
		const data = await api_user.check_account(this.info_1).finally(()=>{
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
		await api_user.edit_user({
			id:this.info_2.id,
			token:this.info_2.token,
			password:this.info_2.password,
		}).finally(()=>{
			this.btn_loadding.submit_2 = false
		})
		// this.$message.success('success')
		await this.$alert('success','edit',{
			confirmButtonText: 'ok',
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
