<template>
    <div class="login_warpper">
        <h1>注册</h1>
        <div class="flex_column">
			<el-form ref="form1" label-position="left" :model="info" :rules="rules" label-width="80px">
				<el-form-item prop="username" label="ID">
                    <div class="flex">
						<el-input v-model="info.username" :placeholder="$t('用户名')"></el-input>
						<el-button type="default" plain>{{ $t('查重') }}</el-button>
					</div>
                </el-form-item>
				<el-form-item prop="password" :label="$t('密码')">
                    <el-input v-model="info.password" :placeholder="$t('密码')" show-password></el-input>
                </el-form-item>
				<el-form-item prop="password" :label="$t('确认密码')">
                    <el-input v-model="info.password" :placeholder="$t('确认密码')" show-password></el-input>
                </el-form-item>
				<el-form-item prop="password" :label="$t('姓名')">
                    <el-input v-model="info.password" :placeholder="$t('姓名')"></el-input>
                </el-form-item>
				<el-form-item prop="password" :label="$t('性别')">
                    <el-radio-group v-model="info.resource">
						<el-radio-button :label="$t('男')"></el-radio-button>
						<el-radio-button :label="$t('女')"></el-radio-button>
						<el-radio-button :label="$t('其他')"></el-radio-button>
					</el-radio-group>
                </el-form-item>
				<el-form-item prop="password" :label="$t('出生日期')">
                    <el-date-picker
						v-model="info.value1"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
                </el-form-item>
				<el-form-item prop="password" :label="$t('手机号')">
                    <div class="flex">
						<el-input v-model="info.password" :placeholder="$t('手机号')" ></el-input>
						<el-button type="default" plain>{{ $t('发送信息') }}</el-button>
					</div>
                </el-form-item>
				<el-form-item prop="password" :label="$t('验证码')">
                    <el-input v-model="info.password" :placeholder="$t('验证码')"></el-input>
                </el-form-item>
				<el-form-item prop="password" :label="$t('地址')">
                    <div class="flex">
						<el-input v-model="info.password" :placeholder="$t('邮编')" disabled></el-input>
						<el-button type="default" plain>{{ $t('搜索') }}</el-button>
					</div>
					<el-input v-model="info.password" :placeholder="$t('地址')" disabled></el-input>
					<el-input v-model="info.password" :placeholder="$t('详细地址')" disabled></el-input>
                </el-form-item>
			</el-form>
			<el-form ref="form2" label-position="top" :model="info" :rules="rules">
				<el-form-item prop="password" :label="$t('选择喜欢的图书类型')">
					<el-checkbox-group v-model="info.checkList">
						<el-checkbox :label="$t('文学')"></el-checkbox>
						<el-checkbox :label="$t('人文教育')"></el-checkbox>
						<el-checkbox :label="$t('历史')"></el-checkbox>
						<el-checkbox :label="$t('科学')"></el-checkbox>
						<el-checkbox :label="$t('儿童')"></el-checkbox>
						<el-checkbox :label="$t('青少年读物')"></el-checkbox>
						<el-checkbox :label="$t('绘本')"></el-checkbox>
						<el-checkbox :label="$t('英语')"></el-checkbox>
						<el-checkbox :label="$t('漫画')"></el-checkbox>
						<el-checkbox :label="$t('其他')"></el-checkbox>
					</el-checkbox-group>
                </el-form-item>
				<el-form-item prop="password" :label="$t('是否从事图书馆的工作')">
                    <el-radio-group v-model="info.resource">
						<el-radio :label="$t('是')"></el-radio>
						<el-radio :label="$t('否')"></el-radio>
					</el-radio-group>
                </el-form-item>
				<el-form-item prop="password" :label="$t('今后是否愿意从事出版行业')">
                    <el-radio-group v-model="info.resource">
						<el-radio :label="$t('是')"></el-radio>
						<el-radio :label="$t('否')"></el-radio>
					</el-radio-group>
                </el-form-item>
				<el-form-item prop="password" :label="$t('同意使用条款')">
                    <el-checkbox>{{ $t('同意所有条款') }}</el-checkbox>
					<el-checkbox-group v-model="info.checkList" style="display:flex;flex-direction: column;margin-left:1rem">
						<el-checkbox :label="$t('服务使用条款')">
							<span>{{ $t('服务使用条款') }}</span>
							<el-button type="text" style="margin-left:1rem">{{ $t('查看详情') }}</el-button>
						</el-checkbox>
						<el-checkbox :label="$t('隐私政策')">
							<span>{{ $t('隐私政策') }}</span>
							<el-button type="text" style="margin-left:1rem">{{ $t('查看详情') }}</el-button>
						</el-checkbox>
					</el-checkbox-group>
					<el-checkbox>{{ $t('同意接受营销推送信息') }}</el-checkbox>
					<el-checkbox-group v-model="info.checkList" style="display:flex;flex-direction: column;margin-left:1rem">
						<el-checkbox :label="$t('同意接收邮件')"></el-checkbox>
						<el-checkbox :label="$t('SMS同意接收')"></el-checkbox>
					</el-checkbox-group>
                </el-form-item>
			</el-form>
			<el-button type="success">{{ $t('注册') }}</el-button>
		</div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
	rules = {}
	info = {
		checkList:[]
	}
}
</script>

<style lang="less" scoped>

</style>
