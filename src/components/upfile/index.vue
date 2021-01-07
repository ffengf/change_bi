<template>
    <div id="upload_file" v-loading="_loading">
        <el-upload
            :action="'http://13.125.137.129:8000' + '/file_upload'"
            :before-upload="beforeUpload"
            multiple
			:on-success="success"
			:on-error="error"
        >
			<div class="inp_box">
				<el-input v-model="name" disabled></el-input>
				<el-button type="success" plain >찾아보기</el-button>
			</div>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Emit } from "vue-property-decorator";
@Component
export default class extends Vue {
	new = {
		name:'',
		url:''
	}

	@Model("update:name", { type: String, required: true })
	readonly name!: string;
    @Emit("update:name")
    change_name(index: string) {
		return index
	}

	@Model("update:url", { type: String, required: true })
	readonly url!: string;
    @Emit("update:url")
    change_url(index: string) {
		return index
	}

    beforeUpload(file) {
		this._loading = true
        this.new.name = file.name
	}

	success(_,file){
		this._loading = false
		this.change_name(this.new.name)
		this.change_url(file.response.url)
	}

	error(){
		this._loading = false
		this.$message.error('error:upfile')
	}
}
</script>

<style scoped lang="less">
#upload_file{
	width: 100%;
	/deep/.el-upload-list {
		display: none!important;
	}
	/deep/.el-upload{
		width: 100%;
	}
	.inp_box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		.el-button--success{
			background: #fff!important;
			color: #3fa535;
			width: 5rem;
			height: 1.75rem;
			padding: 0;
			margin-left: 0.5rem;
		}
	}
}
</style>
