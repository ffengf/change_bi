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
			<el-button type="success" style="margin-top:1rem" @click="submit">로그인</el-button>
			<el-divider><em class="color_80">or</em></el-divider>
			<el-button type="default" plain @click="$router.push('/login/signup')">회원가입</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { api_user } from "@/api/user"
import { ElForm } from "element-ui/types/form";
import { UserModule } from "@/store/user"
import StorageDb from "@/util/storage"
@Component
export default class extends Vue {
	rules={
		username:[{ required:true }],
		password:[{ required:true }],
	}
    info = {
		username:'',
		password:'',
		check:true,
	};

	async submit(){
		await (this.$refs["form"] as ElForm).validate();
		const { check,...info } = this.info
		if(check){
			StorageDb.setLocal('login_info',info)
		}else{
			StorageDb.removeLocal('login_info')
		}
		await UserModule.login(info)
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
