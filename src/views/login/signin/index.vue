<template>
    <div class="login_warpper">
        <h1>{{ $t("登录") }}</h1>
        <div class="box">
            <el-form ref="form" :model="info">
                <el-form-item prop="username">
                    <el-input v-model="info.username" :placeholder="$t('用户名')"></el-input>
                </el-form-item>
				<el-form-item prop="password">
                    <el-input v-model="info.password" :placeholder="$t('密码')" show-password></el-input>
                </el-form-item>
				<el-form-item>
					<div class="flexBC">
						<el-checkbox v-model="info.check">{{$t('记住密码')}}</el-checkbox>
						<div>
							<el-link type="info" :underline="false">找回账号</el-link>
							<el-divider direction="vertical"></el-divider>
							<el-link type="info" :underline="false">找回密码</el-link>
						</div>
					</div>
                </el-form-item>
            </el-form>
			<el-button type="success">{{ $t('登录') }}</el-button>
			<el-divider><em class="color_80">or</em></el-divider>
			<el-button type="primary" plain>{{ $t('注册') }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
    info = {
		username:'',
		password:'',
		check:true
	};
}
</script>

<style lang="less" scoped>
.box{
	display: flex;
	flex-direction: column;
}
</style>
