<template>
    <el-button class="btn" :size="size" @click="send_tel_pass" :loading="_loading" :disabled="time !== 0">{{ time === 0 ? content : time }}</el-button>
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

	time = 0

	Interval_timer:number | null = null

	async send_tel_pass() {
		if(this.phone.length !== 11) {
			return this.$message.error("'-'를 빼고 입력해 주세요.")
		}
        this._loading = true;
		await api_login.send_sms({
			phone: this.phone,
		}).finally(()=>{
			this._loading = false;
		})
		this.time = 180
		this.Interval_timer = setInterval(()=>{
			this.time--
			if(this.time <= 0){
				if(this.Interval_timer === null){
					return
				}
				clearInterval(this.Interval_timer)
			}
		},1000)
		this.$message.success("발송 되었습니다. 인증번호를 입력해 주세요.");
	}


	destroyed(){
		if(this.Interval_timer === null){
			return
		}
		clearInterval(this.Interval_timer)
	}
}
</script>



<style lang='less' scoped>

</style>
