<template>
    <div class="warpper" v-loading="_loading">
        <div class="item">
            <div class="top">
                <span class="color_success">공지사항</span>
                <span class="lines"></span>
                <span>{{ info.create_time }}</span>
            </div>
            <h1>{{ info.title }}</h1>
        </div>
        <h2 class="inner" v-html="info.content"></h2>
        <div class="btn_box">
            <el-button
                class="btns aaa"
                type="default"
                :disabled="prev === undefined"
                @click="id = prev"
                >이전 글</el-button
            >
            <el-button class="btns" type="success" @click="$router.push('/')"
                >목록으로</el-button
            >
            <el-button
                class="btns aaa"
                type="default"
                :disabled="next === undefined"
                @click="id = next"
                >다음 글</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import { api_customer, notice } from "@/api";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
    list: (notice & { cover: string })[] = [];

    get prev() {
        for (let i = 0; i < this.list.length; i++) {
            if(this.list[i].id === this.id){
				return this.list[i - 1]?.id;
			}
        }
	}

	get next() {
        for (let i = 0; i < this.list.length; i++) {
            if(this.list[i].id === this.id){
				return this.list[i + 1]?.id;
			}
        }
    }

    get info() {
        const res = this.list.find((x) => {
            return x.id === this.id;
		});
		return res === undefined ? {} : res
    }

    get id(): number {
        return +this.$route.params.id;
    }

    set id(id: number) {
        this.$router.push(`/other/notice/${id}`);
    }

    async get_notice_list() {
        this._loading = true;
        const { results } = await api_customer.get_home().finally(() => {
            this._loading = false;
        });
        this.list = results;
    }

    created() {
        this.get_notice_list();
    }
}
</script>



<style lang='less' scoped>
.warpper {
    width: 100%;
    margin-top: 2rem;
}
.item {
    min-height: 4.3rem;
    margin-top: -1rem;
    position: relative;
    padding-bottom: 0.5rem;
    p {
        color: #3fa535;
        font-size: 11.5px;
        margin-top: 1rem;
    }
    h1 {
        font-weight: bold;
        margin-top: 0.4rem;
    }
    .icon {
        position: absolute;
        right: 1.5rem;
        top: 50%;
        color: #3fa535;
        transform: translateY(-50%);
        font-size: 40px;
        cursor: pointer;
    }
}
h2 {
    padding: 2rem 0;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    width: 100%;
    border-top: 1px solid #324b9b;
    min-height: 21rem;
    border-bottom: 1px solid #324b9b;
    word-break: break-all;
    /deep/p {
        white-space: normal !important;
    }
}
.btn_box {
    margin-top: 2.5rem;
    margin-bottom: 6rem;
    display: flex;
    justify-content: space-between;
    > * {
        width: 10rem;
        height: 2.2rem;
    }
}
.top {
    margin-top: 0.7rem;
    span {
        font-size: 11.5px;
    }
    .lines {
        display: inline-block;
        height: 0.5rem;
        width: 1px;
        background: #000;
        margin: 0 0.3rem;
    }
}
</style>
