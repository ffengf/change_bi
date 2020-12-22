<template>
    <div id="comments">
        <el-dialog :visible.sync="keys" width="30%">
            <div class="body" v-loading="_loading">
                <div class="user_top">
                    <div class="left">
                        <img :src="info.user.avatar" alt="" />
                        <div class="left_right">
                            <h2 class="h2">{{ info.user.real_name }}</h2>
                            <h1 class="h1">{{ info.title }}</h1>
                        </div>
                    </div>
                    <div class="right">{{ info.create_time }}</div>
                </div>
				<div class="file_name" @click="download(info.attach)">
					<img src="@/assets/img/file.png" alt="">
					<span>{{ info.file_name }}</span>
				</div>
				<div class="inner" v-html="info.content"></div>
				<div class="len">댓글 {{ people_len }}</div>
				<div class="user_inp">
					<img :src="info.user.avatar" alt="">
					<div id="inp" @click="$refs['inp'].focus()">
						<div class="name">{{ info.user.real_name }}</div>
						<el-input ref="inp" v-model="input" placeholder="내용을 작성해 보세요."></el-input>
						<div class="btn_box">
							<span @click.stop="submit">확인</span>
							<span>|</span>
							<span @click.stop="input = ''">취소</span>
						</div>
					</div>
				</div>
				<ul class="comments_list">
					<li v-for="ele in info.comment_list" :key="ele.id">
						<img :src="ele.user.avatar" alt="">
						<div class="content">
							<div class="h2">
								<span>{{ ele.create_time }}</span>
								<span>|</span>
								<span v-if="ele.delete === 0">{{ ele.user.real_name }}</span>
								<span v-else>ㅇㅇㅇ님</span>
							</div>
							<div class="h1" v-if="ele.delete === 0">{{ ele.content }}</div>
							<div class="h1" v-else>삭제된 게시글입니다.</div>
							<div class="btn_box" v-if="ele.user.id === user_id && ele.delete === 0">
								<span @click="edit(ele)">수정</span>
								<span>|</span>
								<span @click="remove(ele.id)">삭제</span>
							</div>
						</div>
					</li>
				</ul>
            </div>
        </el-dialog>

		<el-dialog
			width="30%"
			:visible.sync="out_key"
			id="dialog"
		>
			<div class="user_inp">
				<img :src="info.user.avatar" alt="">
				<div id="inp" @click="$refs['inp'].focus()">
					<div class="name">{{ info.user.real_name }}</div>
					<el-input ref="inp" v-model="old_info.content" placeholder="내용을 작성해 보세요."></el-input>
					<div class="btn_box">
						<span @click.stop="submit_edit">확인</span>
						<span>|</span>
						<span @click.stop="old_info.content = ''">취소</span>
					</div>
				</div>
			</div>
		</el-dialog>
    </div>
</template>

<script lang="ts">
import { api_myclub, comment_info, comment_small } from "@/api";
import { UserModule } from "@/store/user";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
	keys = false
	input = ''


	out_key = false
	old_info = {
		content:'',
		id:0
	}


    info: comment_info = {
        attach: "",
        comment_list: [],
        content: "",
        file_name: "",
        id: 0,
        title: "",
        task_id: 0,
        user: {
            avatar: "",
            id: 0,
            real_name: "",
            username: "",
        },
    };

    async open(attendance_id: number) {
        this.keys = true;
        this.get_info(attendance_id)
	}

	async get_info(attendance_id: number){
		this._loading = true;
		this.info = await api_myclub.comment_info(attendance_id).finally(() => {
            this._loading = false;
        });
	}

	get people_len(){
		return this.info.comment_list.length
	}

	get user_id(){
		return UserModule.info?.id
	}

	download(url:string){
		window.open(url)
	}

	async submit(){
		if(this.input === ''){
			return this.$message.error('내용을 작성해 주세요.')
		}
		const attendance_id = this.info.id as number
		this._loading = true
		const new_comment = await api_myclub.send_comment({ attendance_id ,content:this.input }).finally(()=>{
			this._loading = false
		})
		this.input = ''
		this.info.comment_list = [new_comment,...this.info.comment_list]
	}

	async remove(id:number){
		this._loading = true
		await api_myclub.remove_comment(id).finally(()=>{
			this._loading = false
		})
		this.info.comment_list = this.info.comment_list.map((x)=>{
			if(x.id === id){
				return { ...x,delete:1 }
			}
			return x
		})
		this.$message.success('삭제 되었습니다.')
	}

	edit(ele:comment_small){
		this.out_key = true
		this.old_info = {
			content:ele.content,
			id:ele.id
		}
	}

	async submit_edit(){
		const info = this.old_info
		if(info.content === ''){
			return this.$message.error('내용을 작성해 주세요.')
		}
		this._loading = true
		await api_myclub.edit_comment(info).finally(()=>{
			this._loading = false
		})
		this.info.comment_list = this.info.comment_list.map((x)=>{
			if(x.id === info.id){
				return { ...x,content:info.content }
			}
			return x
		})
		this.out_key = false
		this.$message.success('수정 되었습니다.')
	}
}
</script>

<style lang="less" scoped>
#comments {
    .user_top {
        width: 100%;
        height: 4.5rem;
        border-bottom: 1px solid #324b9b;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            img {
                width: 2.2rem;
                height: 2.2rem;
                border-radius: 50%;
                overflow: hidden;
            }
            .left_right {
                margin-left: 0.75rem;
                height: 2.2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .h2 {
                    font-family: NotoSansKR;
                    font-size: 11.5px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.29px;
                }
                .h1 {
                    font-family: NotoSansKR;
                    font-size: 16.5px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
					letter-spacing: -0.41px;
					margin: 0;
                }
            }
        }
        .right {
            font-family: NotoSansKR;
            font-size: 13.5px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.34px;
            text-align: left;
            color: #324b9b;
        }
	}
	.file_name{
		margin-top: 1.25rem;
		display: flex;
		cursor: pointer;
		img{
			width: 0.75rem;
			height: 1rem;
		}
		span{
			margin-left: 0.3rem;
			font-family: NotoSansKR;
			font-size: 13.5px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			letter-spacing: -0.34px;
			text-align: left;
			color: #858585;
		}
	}
	.inner{
		margin: 1rem 0;
		min-height: 10rem;
	}
	.len{
		font-family: NotoSansKR;
		font-size: 14px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: -0.7px;
		text-align: left;
		color: #000000;
	}
	.user_inp{
		box-sizing: border-box;
		padding: 1rem 0;
		border-top: 1px solid #324b9b;
		border-bottom: 1px solid #324b9b;
		margin-top: 0.75rem;
		display: flex;
		justify-content: space-between;
		height: 7.5rem;
		img {
			width: 2.2rem;
			height: 2.2rem;
			border-radius: 50%;
			overflow: hidden;
		}
		#inp{
			width: 86%;
			position: relative;
			border: 1px solid #ccc;
			/deep/.el-input__inner{
				margin-top: 1.2rem;
				border: none !important;
				font-family: NotoSansKR;
				font-size: 13.5px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.68px;
			}
			.name{
				position: absolute;
				top: 0.4rem;
				left: 0.7rem;
				z-index: 100;
				font-family: NotoSansKR;
				font-size: 13.5px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.68px;
				text-align: left;
				color: #000000;
			}
			.btn_box{
				cursor: pointer;
				position: absolute;
				right: 0.75rem;
				bottom: 0.5rem;
				display: flex;
				align-items: center;
				span{
					font-family: NotoSansKR;
					font-size: 13.5px;
					font-weight: normal;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.68px;
					color: #858585;
				}
				span:nth-of-type(2){
					margin: 0 0.3rem;
				}
			}
		}
	}
	.comments_list{
		li{
			padding: 1.2rem 0;
			box-sizing: border-box;
			border-bottom: 1px solid #324b9b;
			display: flex;
			img {
                width: 2.2rem;
                height: 2.2rem;
                border-radius: 50%;
                overflow: hidden;
			}
			.content{
				margin-left: 0.75rem;
				flex: 1;
				position: relative;
				.h2{
					font-family: NotoSansKR;
					font-size: 11.5px;
					font-weight: normal;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.29px;
					text-align: left;
					span:nth-of-type(1){
						color: #324b9b;
					}
					span:nth-of-type(2){
						margin: 0 0.3rem;
					}
					span:nth-of-type(3){
						color: #3fa535;
					}
				}
				.h1{
					margin-top: 0.25rem;
				}
				.btn_box{
					position: absolute;
					top: 0;
					right: 0;
					font-family: NotoSansKR;
					font-size: 13.5px;
					font-weight: normal;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.68px;
					text-align: left;
					color: #858585;
					span{
						cursor: pointer;
					}
					span:nth-of-type(2){
						margin: 0 0.3rem;
					}
				}
			}
		}
	}
}

#dialog{
	/deep/.el-dialog__header{
		border: none;
	}
}
</style>
