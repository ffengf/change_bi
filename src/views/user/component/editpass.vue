<template>
    <el-dialog id="dialog" title="비밀번호 수정" :visible="key" width="25%" append-to-body :before-close="close">
		<div class="dialog" v-loading="_loading">
			<el-form
				ref="form"
				label-position="top"
				:model="form"
				:rules="rules"
				label-width="80px"
			>
				<el-form-item prop="old_password" label="기존 비밀번호">
					<el-input
						autocomplete="off"
						v-model="form.old_password"
						placeholder="비밀번호를 한번 더 입력해주세요."
						show-password
					></el-input>
				</el-form-item>
				<el-form-item prop="new_password1" label="새로운 비밀번호">
					<el-input
						autocomplete="off"
						v-model="form.new_password1"
						placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력"
						show-password
					></el-input>
				</el-form-item>
				<el-form-item prop="new_password2" label="비밀번호 확인">
					<el-input
						autocomplete="off"
						v-model="form.new_password2"
						placeholder="비밀번호를 한번 더 입력해주세요."
						show-password
					></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog_btn_box">
				<el-button type="success" @click="submit">수정하기</el-button>
				<el-button @click="close">닫기</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue";
import { UserModule } from "@/store/user";
import { api_login, api_user } from "@/api";
import { ElForm } from "element-ui/types/form";
import { mapObjIndexed } from "ramda";
@Component({
    components: {
        Rview,
        Bread,
    },
})
export default class extends Vue {

	form = {
		old_password:'',
		new_password1:'',
		new_password2:''
	}
	rules = {
		old_password:[
            {
				validator: this.validatePass_8,
                required: true,
                trigger: ["change"],
            },
        ],
		new_password1: [
            {
				validator: this.validatePass_8,
                required: true,
                trigger: ["change"],
            },
        ],
        new_password2: [
            {
                required: true,
                validator: this.validatePass,
                trigger: ["change"],
            },
        ],
	}
	key = false
	async submit(){
		await (this.$refs["form"] as ElForm).validate();
		this._loading = true
		await api_user.edit_pass(this.form).finally(()=>{
			this._loading = false
		})
		this.close()
		this.$message.success('수정 되었습니다.')
		this.form = mapObjIndexed( x => '')(this.form) as {
			old_password: string;
			new_password1: string;
			new_password2: string;
		}
	}

	async close(){
		await (this.$refs['form'] as ElForm).resetFields()
		this.key = false;
	}

	validatePass_8(rules, value, callback){
		const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
		if(reg.test(value)){
			(this.$refs["form"] as ElForm).validateField("again_pass")
			callback()
		}else{
			callback(new Error("영문,숫자,특수문자 포함 8자 이상 입력"));
		}
	}

    validatePass(rules, value, callback) {
        if (this.form.new_password1 !== this.form.new_password2) {
            callback(new Error("비밀번호와 비밀번호 확인이 일치하지 않습니다."));
        } else {
            callback();
        }
	}
}
</script>



<style lang='less' scoped>
#dialog {
	/deep/.el-dialog__header {
		background: #324b9b;
		padding: 0.7rem;
		.el-dialog__headerbtn {
			i {
				color: #fff;
				font-size: 20px;
			}
		}
		.el-dialog__title {
			color: #fff;
		}
	}
	.el-dialog {
		border-radius: 0;
	}
    .dialog {
        .inp {
            /deep/.el-input__inner {
                border: 1px solid #000 !important;
                padding: 0.75rem 0.5rem !important;
            }
        }
        .dialog_btn_box {
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
            > * {
                width: 49.5%;
                height: 2.2rem;
            }
        }
    }
}
</style>
