<template>
    <div id="info" v-loading="_loading">
        <div class="info">
            <h2>
                <span>{{ info.create_time }}</span>
                <span>|</span>
                <span>운영자 작성</span>
            </h2>
            <h1>{{ info.title }}</h1>
            <el-button
                class="btn"
                type="success"
                @click.stop="sign(info.attendance_id)"
				v-show="club_type"
                v-if="info.attendance_id === null"
                >제출하기</el-button
            >
            <el-button
                class="btn"
                type="primary"
                @click.stop="sign(info.attendance_id)"
				v-show="club_type"
                v-else
                >수정하기</el-button
            >
        </div>
        <!-- <div class="inner" v-html="info.content"></div> -->
		<Inner :val="info.content" />
        <h1 class="title">제출 완료 {{ total }}</h1>
        <div class="line"></div>
        <ul class="attend">
            <li
                v-for="ele in list"
                :key="ele.id"
                @click="show_comment(ele.id)"
            >
                <img :src="ele.user.avatar" alt="" />
				<div class="left_right">
					<h2>{{ ele.user.real_name }}</h2>
					<h1>{{ ele.title }}</h1>
				</div>
                <div class="right">{{ ele.create_time }}</div>
            </li>
        </ul>
        <div class="page">
            <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="page_size"
				:current-page.sync="page"
            >
            </el-pagination>
        </div>
        <div class="line"></div>
        <div class="btn_box">
            <el-button
                class="btns aaa"
                type="default"
                :disabled="info.prev === null"
                @click="id = info.prev"
                >이전 글</el-button
            >
            <el-button class="btns" type="success" @click="ret_list"
                >목록으로</el-button
            >
            <el-button
                class="btns aaa"
                type="default"
                :disabled="info.next === null"
                @click="id = info.next"
                >다음 글</el-button
            >
        </div>
        <el-dialog :visible.sync="key" width="30%" :close-on-click-modal="false">
            <div class="body" ref="body" v-loading="submit_loading">
                <h1>{{ info.title }}</h1>
                <div class="line"></div>
                <el-form
                    ref="form"
                    :model="form"
                    :rules="rules"
                    label-position="top"
                    label-width="80px"
                >
                    <el-form-item label="제목" prop="title">
                        <el-input
                            v-model="form.title"
							:maxlength="30"
                        >
							<div slot="suffix" class="color_80">{{ form.title.length }}/30</div>
						</el-input>
                    </el-form-item>
                    <div class="line"></div>
                    <el-form-item label="내용" prop="content">
                        <Editor v-model="form.content" />
                    </el-form-item>
					<div class="line"></div>
					<el-form-item prop="file_name">
                        <span slot="label"
                            >첨부파일
                            <span class="color_92"
                                >(.pdf, .hwp, docx, doc, pptx, ppt, jpg,
                                jpeg, zip)</span
                            >
                        </span>
                        <UpFile
                            :name.sync="form.file_name"
                            :url.sync="form.attach"
                        />
                    </el-form-item>
					<div class="line"></div>
                </el-form>
                <div class="submit_box">
                    <el-button class="submit" type="success" @click="submit"
                        >제출하기</el-button
                    >
                </div>
            </div>
        </el-dialog>

        <Comments ref="comment" />
    </div>
</template>

<script lang="ts">
import { api_myclub, attend_base, club_task, task_attend_list } from "@/api";
import Editor from "@/components/editor/index.vue";
import UpFile from "@/components/upfile/index.vue";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Mixin_list } from "@/mixin/list";
import { ElForm } from "element-ui/types/form";
import Comments from "./component/comment.vue";
import { Encryption } from "@/util/encryption";
import Inner from "@/components/inner/index.vue"
import { editor_length } from "@/util/string";
@Component({
    components: {
        Editor,
        UpFile,
		Comments,
		Inner,
    },
})
export default class extends Mixin_list<task_attend_list>(
    api_myclub.task_attend_list
) {
    info: club_task = {
        prev: null,
        next: null,
        id: 0,
        content: "",
        title: "",
        create_time: "",
        attendance_id: null,
    };

    filter = {
        task_id: this.id,
    };

    key = false;

    form: attend_base = {
        id: null,
        title: "",
        file_name: "",
        attach: "",
        content: "",
        task_id: this.id,
    };

    rules = {
        title:[{ required: true, message:'제목을 작성해 주세요.' }],
		content:[{ required: true, message:'내용을 작성해 주세요.' }]
    };

    attendance_id: number | null = null;

    @Watch("id", { immediate: true })
    async watch_id() {
        this._loading = true;
        this.info = await api_myclub.task_info(this.id).finally(() => {
            this._loading = false;
		});
		this.filter.task_id = this.id
		this.get_list()
    }

    get id(): number {
        return Number(Encryption.base_dec(this.$route.query.id as string));
    }

    set id(id: number) {
        this.$router.push({
            path: this.$route.path,
            query: { id: Encryption.base_enc(id.toString()) },
        });
    }

    ret_list() {
        this.$router.push(this.$route.path);
    }

    async sign(attendance_id: null | number) {
        if (attendance_id === null) {
            this.form = {
                id: attendance_id,
                title: "",
                file_name: "",
                attach: "",
                content: "",
                task_id: this.id,
            };
        } else {
            this._loading = true;
            this.form = await api_myclub
                .attend_info(attendance_id)
                .finally(() => {
                    this._loading = false;
                });
        }
        this.key = true;
    }

	submit_loading = false

    async submit() {
		await (this.$refs["form"] as ElForm).validate();
		// if(editor_length(this.form.content) > 1000){
		// 	return this.$message.error('글자 수 제한이 초과되었습니다. 1000자 이내로 작성해 주세요.')
		// }
        this.submit_loading = true;
        if (this.form.id === null) {
            await api_myclub.add_attend({ ...this.form }).finally(() => {
                this.submit_loading = false;
            });
        } else {
            await api_myclub.edit_attend({ ...this.form }).finally(() => {
                this.submit_loading = false;
            });
        }
        this.$message.success('미션 제출 되었습니다.')
        this.get_list();
        this.key = false;
	}

	show_comment(id:number){
		(this.$refs['comment'] as any).open(id)
	}



	get club_type():Boolean{
		const type = document.getElementById('club_type') as HTMLElement;
		return type.innerText === '진행완료' ? false : true;
	}
}
</script>



<style lang='less' scoped>
#info .info {
    min-height: 3.8rem;
    border-bottom: 1px solid #324b9b;
    position: relative;
    .btn {
        position: absolute;
        transform: translateY(-50%);
        top: 45%;
        right: 0;
        height: 1.7rem;
        width: 6.8rem;
        padding: 0;
    }
    h2 {
        font-family: NotoSansKR;
        font-size: 11.5px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -0.29px;
        span:nth-of-type(1) {
            color: #324b9b;
        }
        span:nth-of-type(2) {
            margin: 0 0.3rem;
        }
    }
    >h1 {
        font-size: 22px;
        font-weight: 500;
        letter-spacing: -0.41px;
        color: #000000;
		margin: 0.3rem 0;
		width: 55%;
    }
}
#info .inner {
    min-height: 11rem;
    padding-top: 1rem;
    box-sizing: border-box;
}
#info .btn_box {
    margin-top: 2.5rem;
    margin-bottom: 6rem;
    display: flex;
    justify-content: space-between;
    > * {
        width: 7.5rem;
        height: 2.2rem;
    }
}
#info .title {
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.8px;
}
#info .line {
    height: 1px;
    background: #324b9b;
    margin-top: 0.75rem;
}
#info .attend {
    width: 100%;
    min-height: 2rem;
    li {
        width: 100%;
        padding: 1rem 0;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
		img {
			width: 2.2rem;
			height: 2.2rem;
			border-radius: 50%;
			overflow: hidden;
		}
		.left_right {
			padding-left: 0.75rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			h2 {
				font-family: NotoSansKR;
				font-size: 11.5px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.29px;
			}
			h1 {
				font-family: NotoSansKR;
				font-size: 16.5px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.41px;
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
}
#info .page {
    text-align: center;
    margin: 2rem 0;
    /deep/.more {
        margin: 0 !important;
        width: auto !important;
        height: auto !important;
    }
    /deep/.el-icon {
        font-size: 28px !important;
        font-weight: 100 !important;
    }
    /deep/.el-icon-more {
        font-size: 13px !important;
        height: 28px;
        line-height: 28px;
    }
}
#info {
    /deep/.el-dialog {
        border-radius: 0;
        box-sizing: border-box;
        padding: 0 2rem;
        .el-dialog__header {
            border-bottom: 1px solid #324b9b;
            .el-dialog__headerbtn {
                top: 0;
                right: -35px;
                .el-dialog__close {
                    color: #fff;
                    font-size: 30px;
                }
            }
        }
        .el-dialog__body {
            padding: 0;
            padding-bottom: 2rem;
            display: flex;
            flex-direction: column;
            h1 {
                font-family: NotoSansKR;
                font-size: 20px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.5px;
                margin: 1.8rem 0;
            }
            .inp_box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .el-button--success {
                    background: #fff !important;
                    color: #3fa535;
                    width: 5rem;
                    height: 1.75rem;
                    padding: 0;
                    margin-left: 0.5rem;
                }
            }
            .submit_box {
                display: flex;
                justify-content: center;
                margin-top: 2rem;
                .submit {
                    width: 10rem;
                    height: 2.2rem;
                }
            }
            .el-input__inner {
                border: 1px solid #dcdcdc !important;
                padding-left: 0.75rem !important;
                height: 1.75rem !important;
                color: #000;
            }
            .el-form-item__label {
                padding: 0;
                font-family: NotoSansKR;
                font-size: 13.5px;
            }
            .is-required .el-form-item__label:before {
                margin: 0;
            }
        }
    }
}

.color_92 {
    color: #929292;
}
@media only screen and (max-width: 1024px) {
	#info{
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
