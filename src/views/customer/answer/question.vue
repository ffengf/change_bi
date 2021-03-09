<template>
    <div class="question" v-loading="_loading">
        <el-input v-model="info.title" placeholder="*제목">
            <!-- <div slot="suffix" class="color_80 suffix">
                {{ info.title.length }}/30
            </div> -->
        </el-input>
        <div
            class="line"
            style="margin-top: 0.8rem; margin-bottom: 0.7rem"
        ></div>
        <el-select v-model="info.category" placeholder="카테고리">
            <el-option value="0" label="클럽 창작과비평"></el-option>
			<el-option value="1" label="북클럽 필라멘트"></el-option>
			<el-option value="2" label="매일연재"></el-option>
			<el-option value="3" label="이벤트"></el-option>
			<el-option value="4" label="기타"></el-option>
        </el-select>
        <div class="line" style="margin-top: 0.8rem"></div>
        <div class="editor">
            <Editor
                v-model="info.question"
                :id="'summernote' + new Date().getTime()"
            />
        </div>
        <div class="line" style="margin-bottom: 1.2rem"></div>
        <div class="btn_box">
            <el-button type="success" @click="submit">작성완료</el-button>
            <el-button @click="ret_list">작성취소</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Emit } from "vue-property-decorator";
import Editor from "@/components/editor/index.vue";
import { api_customer, post_qa } from "@/api";
import { editor_length } from "@/util/string";
type type = "list" | "info" | "question";

@Component({
    components: { Editor },
})
export default class extends Vue {
    @Model("update:type", { required: true, type: String })
    type!: type;

    @Emit("update:type")
    ret_list(): type {
        return "list";
    }

    @Emit("clear")
    clear() {
        return null;
    }

    info: post_qa = {
        question: "",
        title: "",
        category: "",
    };

    async submit() {
        if (this.info.title === "") {
            return this.$message.error("제목을 작성해 주세요.");
        }
        if (this.info.question === "") {
            return this.$message.error("내용을 작성해 주세요.");
		}
		if (this.info.category === ""){
			return this.$message.error("문의 유형을 선택해 주세요.");
		}
        if (editor_length(this.info.question) > 1000) {
            return this.$message.error(
                "글자 수 제한이 초과되었습니다. 1000자 이내로 작성해 주세요."
            );
        }
        this._loading = true;
        await api_customer.post_qa(this.info).finally(() => {
            this._loading = false;
        });
        this.$message.success("문의사항이 제출 되었습니다.");
        this.clear();
        this.ret_list();
    }
}
</script>



<style lang='less' scoped>
.question {
    /deep/.el-input__inner {
        border: 1px solid #ccc !important;
        padding: 5px !important;
        padding-left: 10px !important;
        font-family: NotoSansKR-Regular !important;
    }
    .suffix {
        margin-top: 0.5rem;
    }
    .line {
        height: 1px;
        background: #324b9b;
    }
    .editor {
        margin: 0.75rem 0 2.2rem 0;
    }
    .box {
        display: flex;
        align-items: center;
        .inp {
            width: 50%;
            margin-right: 0.4rem;
        }
        .success_btn {
            border: 1px solid #65b75d;
            width: 5rem;
        }
    }
    .btn_box {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 6rem;
        > * {
            width: 10rem;
        }
    }
}
</style>
