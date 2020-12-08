<template>
    <div class="question">
        <el-input v-model="info.title" placeholder="*제목"></el-input>
		<div class="line" style="margin-top:0.8rem"></div>
		<div class="editor">
			<Editor v-model="info.question" :id="'summernote' + new Date().getTime()" />
		</div>
		<div class="line" style="margin-bottom:1.2rem"></div>
		<div class="btn_box">
			<el-button type="success" @click="submit">작성완료</el-button>
			<el-button type="default" plain @click="ret_list">작성취소</el-button>
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Emit } from "vue-property-decorator";
import Editor from "@/components/editor/index.vue"
import { api_customer, post_qa } from "@/api"
type type = "list" | "info" | "question";

@Component({
	components:{ Editor }
})
export default class extends Vue {
	@Model('update:type',{ required:true,type:String })
	type !:type

	@Emit('update:type')
	ret_list():type{
		return 'list'
	}

	@Emit('clear')
	clear(){
		return null
	}

	info:post_qa = {
		question:'',
		title:''
	}

	async submit(){
		if(this.info.title === ''){
			return this.$message.error('标题不能为空')
		}
		if(this.info.question === ''){
			return this.$message.error('内容不能为空')
		}
		await api_customer.post_qa(this.info)
		this.$message.success('提交成功')
		this.clear()
		this.ret_list()
	}
}
</script>



<style lang='less' scoped>
.question{
	/deep/.el-input__inner{
		border: 1px solid #ccc !important;
		padding: 5px !important;
		padding-left: 10px!important;
		font-family: NotoSansKR-Regular !important;;
	}
	.line{
		height: 1px;
		background: #324b9b;
	}
	.editor{
		margin: 0.75rem 0 2.2rem 0;
	}
	.box{
		display: flex;
		align-items: center;
		.inp{
			width: 50%;
			margin-right:0.4rem ;
		}
		.success_btn{
			border: 1px solid #65b75d;
			width: 5rem;
		}
	}
	.btn_box{
		display: flex;
		justify-content: flex-end;
		margin-bottom: 6rem;
		> *{
			width: 10rem;
		}
	}
}

</style>
