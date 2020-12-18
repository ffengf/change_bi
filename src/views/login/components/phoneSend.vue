<template>
    <el-button :size="size" @click="send_tel_pass" :loading="_loading">{{ content }}</el-button>
</template>

<script lang="ts">
import { api_login } from "@/api";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
	@Prop({required:true,type:String})
	phone!:string

	@Prop({ default:"small",type:String })
	size !:string

	@Prop({ default:"인증번호 발송",type:String })
	content !:string

	async send_tel_pass() {
		if(this.phone.length !== 11) {
			return this.$message.error('输入11位')
		}
        this._loading = true;
		await api_login.send_sms({
			phone: this.phone,
		}).finally(()=>{
			this._loading = false;
		})
		this.$message.success("发送成功，输入验证码");
    }
}
</script>



<style lang='less' scoped>

</style>
