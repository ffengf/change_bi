<template>
    <div class="list" v-loading="_loading">
		<template v-if="list.length !== 0">
			<ul v-for="ele in list" :key="ele.id">
				<li @click="go_info(ele.id)">
					<h2>
						<span>{{ ele.create_time }}</span>
						<span>|</span>
						<span>운영자 작성</span>
					</h2>
					<h1>{{ ele.title }}</h1>
					<!-- <p class="inner_detail" v-html="ele.content"></p> -->
					<Inner class="inner_detail" :val="ele.content" />
					<el-button v-show="club_type" class="btn" type="success" @click.stop="sign(null,ele.id,ele.title)" v-if="ele.attendance_id === null">제출하기</el-button>
					<el-button v-show="club_type" class="btn" type="primary" @click.stop="sign(ele.attendance_id,ele.id,ele.title)" v-else>수정하기</el-button>
				</li>
			</ul>
			<el-button class="more" type="success" @click="more" :disabled="disabled">더 보기</el-button>
		</template>
		<div v-else class="none">
			작성된 미션 게시글이 없습니다.
		</div>



		<el-dialog
			v-if="key"
			:visible.sync="key"
			width="30%"
			:close-on-click-modal="false"
		>
			<div class="body" ref="body" v-loading='submit_loading'>
				<h1>{{ diolog_title }}</h1>
				<div class="line"></div>
				<el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="80px">
					<el-form-item label="제목" prop="title">
						<el-input v-model="form.title">
							<!-- <div slot="suffix"  class="color_80">{{ form.title.length }}/30</div> -->
						</el-input>
					</el-form-item>
					<div class="line"></div>
					<el-form-item label="내용" prop="content">
						<Editor v-model="form.content" />
					</el-form-item>
					<div class="line"></div>
					<el-form-item prop="file_name">
						<span slot="label">첨부파일 <span class="color_92">(.pdf, .hwp, docx, doc, pptx, ppt, jpg, jpeg, zip)</span>
						</span>
						<UpFile :name.sync="form.file_name" :url.sync="form.attach" />
					</el-form-item>
					<div class="line"></div>
				</el-form>
				<div class="submit_box">
					<el-button class="submit" type="success" @click="submit">제출하기</el-button>
					<el-button v-if="form.id !== null" class="submit" type="danger" @click="remove_attend(form.id)">삭제하기</el-button>
				</div>
			</div>
		</el-dialog>
    </div>
</template>

<script lang="ts">
import { api_myclub, attend_base } from "@/api";
import { More } from "@/mixin/more";
import { ElForm } from "element-ui/types/form";
import { Vue, Component } from "vue-property-decorator";
import Editor from "@/components/editor/index.vue"
import UpFile from "@/components/upfile/index.vue"
import { Encryption } from "@/util/encryption";
import Inner from "@/components/inner/index.vue"
import { editor_length } from "@/util/string";
@Component({
	components:{
		Editor,
		UpFile,
		Inner,
	}
})
export default class extends More(api_myclub.task_list) {

	filter = {
		club_id: Number(Encryption.base_dec(this.$route.params.id))
	}

	key = false

	form:attend_base = {
		id:null,
		title:'',
		file_name:'',
		attach:'',
		content:'',
		task_id:0
	}

	rules = {
		title:[{ required: true, message:'제목을 작성해 주세요.' }],
		content:[{ required: true, message:'내용을 작성해 주세요.' }]
	}

	go_info(id:number){
		this.$router.push(this.$route.path + '?id=' + Encryption.base_enc(id.toString()))
	}


	diolog_title = ''
	async sign(attendance_id:null|number,task_id:number,title:string){
		this.diolog_title = title
		if(attendance_id === null){
				this.form = {
				id:attendance_id,
				title:'',
				file_name:'',
				attach:'',
				content:'',
				task_id
			}
		}else{
			this._loading = true
			const form = await api_myclub.attend_info(attendance_id).finally(()=>{
				this._loading = false
			})
			this.form = {
				...form,
				attach:form.attach === null ? '':form.attach,
				file_name:form.file_name === null ? '': form.file_name
			}
		}
		this.key = true
	}

	submit_loading = false

	async submit(){
		await (this.$refs['form'] as ElForm).validate()
		// if(editor_length(this.form.content) > 1000){
		// 	return this.$message.error('글자 수 제한이 초과되었습니다. 1000자 이내로 작성해 주세요.')
		// }
		this.submit_loading = true
		if(this.form.id === null){
			const { id } = await api_myclub.add_attend({ ...this.form }).finally(()=>{
				this.submit_loading = false
			})
			this.list = this.list.map(x => x.id === this.form.task_id ? { ...x,attendance_id:id } : x)
		}else{
			await api_myclub.edit_attend({ ...this.form }).finally(()=>{
				this.submit_loading = false
			})
		}
		this.$message.success('미션 제출 되었습니다.')
		this.key = false
	}

	async remove_attend(id:number){
		await this.$confirm('제출하신 내용이 삭제될 예정입니다. 정말 삭제 하시겠습니까?',{
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		})
		await api_myclub.remove_attend(id)
		this.$message.success('삭제되었습니다.')
		this.list = this.list.map(x => x.attendance_id === id ? { ...x,attendance_id:null } : x)
		this.key = false
	}


	get club_type():Boolean{
		const type = document.getElementById('club_type') as HTMLElement;
		return type.innerText === '진행완료' ? false : true;
	}
}
</script>



<style lang='less' scoped>
.list{
	display: flex;
	flex-direction: column;
	li{
		min-height: 3.8rem;
		border-bottom: 1px solid #324b9b;
		cursor: pointer;
		position: relative;
		.btn{
			position: absolute;
			transform: translateY(-50%);
			top: 45%;
			right: 0;
			height: 1.7rem;
			width: 6.8rem;
			padding: 0;
		}
		h2{
			margin-top: 1rem;
			font-family: NotoSansKR;
			font-size: 11.5px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			letter-spacing: -0.29px;
			span:nth-of-type(1){
				color: #324b9b;
			}
			span:nth-of-type(2){
				margin: 0 0.3rem;
			}
		}
		h1{
			font-size: 16.5px;
			font-weight: 500;
			letter-spacing: -0.41px;
			color: #000000;
			margin-top: 0.2rem;
			width: 58%;
		}
		.inner_detail{
			margin-top: 0.2rem;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
			width: 70%;
			overflow: hidden;
			font-size: 12.5px;
			letter-spacing: -0.34px;
			color: #858585;
			/deep/ * {
				font-size: 12.5px!important;
				letter-spacing: -0.34px!important;
				color: #858585!important;
				display: none!important;
			}
			/deep/ p:nth-of-type(1){
				display: block!important;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				width: 70%;
			}
		}
	}
	.more{
		align-self: center;
	}
}
.list{
	/deep/.el-dialog{
		border-radius: 0;
		box-sizing: border-box;
		padding: 0 2rem;
		.el-dialog__header{
			border-bottom: 1px solid #324b9b;
			.el-dialog__headerbtn{
				top: 0;
				right: -35px;
				.el-dialog__close{
					color: #fff;
					font-size: 30px;
				}
			}
		}
		.el-dialog__body{
			padding: 0;
			padding-bottom: 2rem;
			display: flex;
			flex-direction: column;
			.line{
				height: 1px;
				background: #324b9b;
			}
			h1{
				font-family: NotoSansKR;
				font-size: 20px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.5px;
				margin: 1.8rem 0;
			}
			.inp_box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.el-button--success{
					background: #fff!important;
					color: #3fa535;
					width: 5rem;
					height: 1.75rem;
					padding: 0;
					margin-left: 0.5rem;
				}
			}
			.submit_box{
				display: flex;
				justify-content: center;
				margin-top: 2rem;
				.submit{
					width: 10rem;
					height: 2.2rem;
				}
			}
			.el-input__inner{
				border:1px solid #dcdcdc!important;
				padding-left: 0.75rem!important;
				height: 1.75rem!important;
				color: #000;
			}
			.el-form-item__label{
				padding: 0;
				font-family: NotoSansKR;
				font-size: 13.5px;
			}
			.is-required .el-form-item__label:before{
				margin: 0;
			}
		}
	}
}

.color_92{
	color: #929292;
}
@media only screen and (max-width: 1024px) {
	.list{
		/deep/.el-dialog__headerbtn{
			right: 5px!important;
			top: 5px!important;
			.el-dialog__close{
				color: #ccc!important;
			}
		}
	}
}
</style>
