<template>
    <li class="item" v-loading="_loading">
        <div class="show">
            <img :src="info.from_user.avatar" alt="" />
            <div class="content">
                <div class="h2">
                    <span>{{ info.create_time }}</span>
                    <span>|</span>
                    <span v-if="info.delete === 0">{{
                        info.from_user.real_name
                    }}</span>
                    <span v-else>ㅇㅇㅇ님</span>
                </div>
                <div class="h1 show_br" v-if="info.delete === 0">
                    {{ info.content }}
                </div>
                <div class="h1" v-else>삭제된 게시글입니다.</div>
                <div class="reapply" @click="reapply">댓글쓰기</div>
                <div
                    class="btn_box"
                    v-if="info.from_user.id === user_id && info.delete === 0"
                >
                    <span @click="edit(info)">수정</span>
                    <span>|</span>
                    <span @click="remove(info.id,null)">삭제</span>
                </div>
            </div>
        </div>
        <div class="children_box" v-if="info.reply_list.length !== 0">
            <div class="children" v-for="e in info.reply_list" :key="e.id">
                <img :src="e.from_user.avatar" alt="" />
                <div class="content">
                    <div class="h2">
                        <span>{{ e.create_time }}</span>
                        <span>|</span>
                        <span v-if="e.delete === 0">{{
                            e.from_user.real_name
                        }}</span>
                        <span v-else>ㅇㅇㅇ님</span>
                    </div>
                    <div class="h1 show_br" v-if="e.delete === 0">
                        {{ e.content }}
                    </div>
                    <div class="h1" v-else>삭제된 게시글입니다.</div>
                    <div
                        class="btn_box"
                        v-if="e.from_user.id === user_id && e.delete === 0"
                    >
                        <span @click="edit(e)">수정</span>
                        <span>|</span>
                        <span @click="remove(e.id,info.id)">삭제</span>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog width="30%" :visible.sync="key" id="dialog">
            <div class="user_inp" v-loading="submit_loading">
                <img :src="user_info && user_info.avatar" alt="" />
                <div id="inp" @click="$refs['inp'].focus()">
                    <div class="name">
                        {{ user_info && user_info.real_name }}
                    </div>
                    <el-input
                        ref="inp"
                        v-model="dialog_info.content"
                        placeholder="내용을 작성해 보세요."
						type="textarea"
						resize="none"
                    ></el-input>
                    <div class="btn_box">
                        <span @click.stop="dialog_info.id === undefined ? submit() : edit_submit()">확인</span>
                        <span>|</span>
                        <span @click.stop="dialog_info.content = ''">취소</span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </li>
</template>

<script lang="ts">
import { api_myclub, discuss_list } from "@/api";
import { UserModule } from "@/store/user";
import { Encryption } from "@/util/encryption";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
interface children_submit {
	to_user_id:number
	content:string
	parent_id:number
}

interface edit_submit {
	content:string
	id:number
}

@Component
export default class extends Vue {
    key = false;

    dialog_info:children_submit | edit_submit = {
		content: "",
		parent_id:0,
		to_user_id:0
    };

    @Prop({ required: true })
    info!: discuss_list;

    get user_id() {
        return UserModule.info?.id;
    }

    get user_info() {
        return UserModule.info;
	}
	get club_id() {
        return Number(Encryption.base_dec(this.$route.params.id));
    }

    reapply() {
		this.dialog_info = {
			content : "",
			parent_id:this.info.id,
			to_user_id:this.info.from_user.id
		}
        this.key = true;
    }

	submit_loading = false

	@Emit('submit')
	async submit(){
		if(this.dialog_info.content.replaceAll('\n','') === ''){
			return this.$message.error('내용을 작성해 주세요.')
		}
		const club_id = this.club_id
		this.submit_loading = true
		const data = await api_myclub.add_discuss({ club_id,...this.dialog_info }).finally(()=>{
			this.submit_loading = false
		})
		this.key = false
		return data
	}

	@Emit('edit')
	async edit_submit(){
		if(this.dialog_info.content.replaceAll('\n','') === ''){
			return this.$message.error('내용을 작성해 주세요.')
		}
		this.submit_loading = true
		const data = await api_myclub.edit_discuss({ ...this.dialog_info } as edit_submit).finally(()=>{
			this.submit_loading = false
		})
		this.key = false
		return data
	}

    edit(info:discuss_list) {
		this.key = true
		this.dialog_info = {
			id:info.id,
			content:info.content
		}
	}



	@Emit('remove')
    async remove(id:number,parent_id:number | null) {
		this._loading = true
		await api_myclub.remove_discuss(id).finally(()=>{
			this._loading = false
		})
		this.$message.success('삭제 되었습니다.')
		return {
			id,
			parent_id
		}
	}
}
</script>



<style lang='less' scoped>
.item {
    width: 100%;
    padding: 0.7rem 0;
    border-bottom: 1px solid #324b9b;
    .show {
        display: flex;
    }
    img {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .content {
        margin-left: 0.75rem;
        flex: 1;
        position: relative;
        .h2 {
            font-family: NotoSansKR;
            font-size: 11.5px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.29px;
            text-align: left;
            span:nth-of-type(1) {
                color: #324b9b;
            }
            span:nth-of-type(2) {
                margin: 0 0.3rem;
            }
            span:nth-of-type(3) {
                color: #3fa535;
            }
        }
        .h1 {
            margin-top: 0.25rem;
            font-family: NotoSansKR;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.35px;
            text-align: left;
			color: #000000;
			word-break: break-all;
        }
        .reapply {
            cursor: pointer;
            margin-top: 1.1rem;
            font-family: NotoSansKR;
            font-size: 13.5px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.68px;
            text-align: left;
            color: #858585;
        }
        .btn_box {
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
            span {
                cursor: pointer;
            }
            span:nth-of-type(2) {
                margin: 0 0.3rem;
            }
        }
    }
    .children_box {
        margin-top: 1rem;
        .children {
            box-sizing: border-box;
            padding: 1.1rem 0 1.1rem 2.95rem;
            border-top: 1px solid #e5e5e5;
            display: flex;
        }
    }
}
.user_inp {
    box-sizing: border-box;
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    height: 7.5rem;
    img {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 0.5rem;
    }
    #inp {
        width: 90%;
        position: relative;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/deep/.el-textarea{
			height: 100%;
			.el-textarea__inner{
				border: none;
			}
		}
		.name {
			margin-top: 0.4rem;
			margin-left: 0.7rem;
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
        .btn_box {
            cursor: pointer;
            position: absolute;
            right: 0.75rem;
            bottom: 0.5rem;
            display: flex;
            align-items: center;
            span {
                font-family: NotoSansKR;
                font-size: 13.5px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.68px;
                color: #858585;
            }
            span:nth-of-type(2) {
                margin: 0 0.3rem;
            }
        }
    }
}
</style>
