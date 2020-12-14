<template>
    <div id="box_header">
        <Bread :new_list="new_list" />
        <div class="box_line"></div>
        <h2>이벤트</h2>
        <div class="line"></div>
        <h1>오직 스위치에서만 제공하는 이벤트</h1>
        <div class="tab">
            <router-link class="item" tag="div" to="/active/1/list">서평단 신청</router-link>
            <router-link class="item" tag="div" to="/active/2/list">강연 초대</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";

@Component({
    components: {
        Bread,
    },
})
export default class extends Vue {
    @Prop({ required: true })
    new_list!: {
        to: string;
        title: string;
    }[];
}
</script>



<style lang='less' scoped>
#box_header {
    h2 {
        margin-top: 1.15rem;
        font-family: NotoSansKR;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -0.7px;
        text-align: left;
        color: #010101;
    }
    .line {
        background-color: #000000;
        width: 1rem;
        height: 2px;
        margin: 1.25rem 0;
    }
    h1 {
        font-family: NotoSansKR;
        font-size: 30px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -1.5px;
        color: #3fa535;
    }
    .tab {
        margin-top: 1.4rem;
        margin-bottom: 1.25rem;
        width: 100%;
        border: 1px solid #324b9b;
        height: 3.25rem;
        display: flex;
        > .item {
            width: 50%;
            line-height: 3.25rem;
            text-align: center;
            color: #324b9b;
            font-family: NotoSansKR;
            font-size: 20px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -1px;
            cursor: pointer;
            height: 100%;
        }
        .router-link-active {
            background: #324b9b;
            color: #fff;
        }
    }
}
</style>
