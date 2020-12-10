<template>
    <div class="login_warpper">
        <h1>로그인</h1>
        <div class="flex_column">
            <el-form ref="form" :model="info" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="info.username" placeholder="아이디"></el-input>
                </el-form-item>
				<el-form-item prop="password">
                    <el-input v-model="info.password" placeholder="비밀번호" show-password></el-input>
                </el-form-item>
				<el-form-item>
					<div class="flexBC info_box">
						<el-checkbox v-model="info.check">아이디 저장</el-checkbox>
						<div class="kr-re">
							<el-link type="info" :underline="false" @click="$router.push('/login/findusername')">아이디 찾기</el-link>
							<el-divider direction="vertical"></el-divider>
							<el-link type="info" :underline="false" @click="$router.push('/login/findpassword')">비밀번호 찾기</el-link>
						</div>
					</div>
                </el-form-item>
            </el-form>
			<el-button type="success" style="margin-top:1rem" @click="submit" :loading="btn_loadding.submit">로그인</el-button>
			<el-divider><em class="color_80">or</em></el-divider>
			<el-button @click="$router.push('/login/signup')">회원가입</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { api_login } from "@/api"
import { ElForm } from "element-ui/types/form";
import { UserModule } from "@/store/user"
import StorageDb from "@/util/storage"
@Component
export default class extends Vue {
	validatePass_8(rules, value, callback){
		const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
		if(reg.test(value)){
			callback()
		}else{
			callback(new Error("简单了"));
		}
	}
	rules={
		username:[{ required:true }],
		password:[{ required:true,validator: this.validatePass_8  }],
	}
    info = {
		username:'',
		password:'',
		check:true,
	};

	btn_loadding = {
        submit: false,
    };

	async submit(){
		await (this.$refs["form"] as ElForm).validate();
		this.btn_loadding.submit = true
		const { check,...info } = this.info
		if(check){
			StorageDb.setLocal('login_info',info)
		}else{
			StorageDb.removeLocal('login_info')
		}
		await UserModule.login(info).finally(()=>{
			this.btn_loadding.submit = false
		})
		this.$message.success('success')
		this.$router.push('/')
	}

	created(){
		const info = StorageDb.getLocal('login_info')
		if(info !== null){
			this.info = { ...this.info,...info }
		}
	}
}
</script>

<style lang="less" scoped>
.info_box{
	margin-top: -0.7rem;
}
</style>
