<template>
    <div class="login_warpper">
        <h1>{{ $t("登录") }}</h1>
        <div class="flex_column">
            <el-form ref="form" :model="info" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="info.username" :placeholder="$t('用户名')"></el-input>
                </el-form-item>
				<el-form-item prop="password">
                    <el-input v-model="info.password" :placeholder="$t('密码')" show-password></el-input>
                </el-form-item>
				<el-form-item>
					<div class="flexBC info_box">
						<el-checkbox v-model="info.check">{{$t('记住密码')}}</el-checkbox>
						<div>
							<el-link type="info" :underline="false" @click="$router.push('/login/findusername')">找回账号</el-link>
							<el-divider direction="vertical"></el-divider>
							<el-link type="info" :underline="false" @click="$router.push('/login/findpassword')">找回密码</el-link>
						</div>
					</div>
                </el-form-item>
            </el-form>
			<el-button type="success" style="margin-top:1rem">{{ $t('登录') }}</el-button>
			<el-divider><em class="color_80">or</em></el-divider>
			<el-button type="default" plain @click="$router.push('/login/signup')">{{ $t('注册') }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
	rules={}
    info = {
		username:'',
		password:'',
		check:true
	};
}
</script>

<style lang="less" scoped>
.info_box{
	margin-top: -1.1rem;
}
</style>
