<template>
    <div class="list">
        <el-button type="success" class="top_btn" @click="change_type('question')">질문하기</el-button>
        <div class="box">
            <div class="top">
                <span class="color_success">답변대</span>
                <span class="lines"></span>
                <span>2020.05.01</span>
            </div>
            <h1 @click="change_type('info')">
                스위치 웹사이트 런칭 기념, 추첨을 통해 신규가입자에게 스타벅스
                쿠폰을 드립니다.
            </h1>
        </div>
        <div class="box">
            <div class="top">
                <span class="color_success">답변대</span>
                <span class="lines"></span>
                <span>2020.05.01</span>
            </div>
            <h1 @click="change_type('info')">
                스위치 웹사이트 런칭 기념, 추첨을 통해 신규가입자에게 스타벅스
                쿠폰을 드립니다.
            </h1>
        </div>
        <div class="box">
            <div class="top">
                <span class="color_success">답변대</span>
                <span class="lines"></span>
                <span>2020.05.01</span>
            </div>
            <h1 @click="change_type('info')">
                스위치 웹사이트 런칭 기념, 추첨을 통해 신규가입자에게 스타벅스
                쿠폰을 드립니다.
            </h1>
        </div>

        <div class="box">
            <div class="top">
                <span class="color_success">답변대</span>
                <span class="lines"></span>
                <span>2020.05.01</span>
            </div>
            <h1 @click="change_type('info')">
                스위치 웹사이트 런칭 기념, 추첨을 통해 신규가입자에게 스타벅스
                쿠폰을 드립니다.
            </h1>
        </div>
        <div class="box">
            <div class="top">
                <span class="color_success">답변대</span>
                <span class="lines"></span>
                <span>2020.05.01</span>
            </div>
            <h1 @click="change_type('info')">
                스위치 웹사이트 런칭 기념, 추첨을 통해 신규가입자에게 스타벅스
                쿠폰을 드립니다.
            </h1>
        </div>
        <div class="box">
            <div class="top">
                <span class="color_success">답변대</span>
                <span class="lines"></span>
                <span>2020.05.01</span>
            </div>
            <h1 @click="change_type('info')">
                스위치 웹사이트 런칭 기념, 추첨을 통해 신규가입자에게 스타벅스
                쿠폰을 드립니다.
            </h1>
        </div>
        <div class="box">
            <div class="top">
                <span class="color_success">답변대</span>
                <span class="lines"></span>
                <span>2020.05.01</span>
            </div>
            <h1 @click="change_type('info')">
                스위치 웹사이트 런칭 기념, 추첨을 통해 신규가입자에게 스타벅스
                쿠폰을 드립니다.
            </h1>
        </div>
        <div class="box">
            <div class="top">
                <span class="color_success">답변대</span>
                <span class="lines"></span>
                <span>2020.05.01</span>
            </div>
            <h1 @click="change_type('info')">
                스위치 웹사이트 런칭 기념, 추첨을 통해 신규가입자에게 스타벅스
                쿠폰을 드립니다.
            </h1>
        </div>

        <el-button type="success" class="btn">더 보기</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Emit } from "vue-property-decorator";

type type = "list" | "info" | "question";

@Component
export default class extends Vue {
	@Model('update:type',{ required:true,type:String })
	type !:type

	@Emit('update:type')
	change_type(type:type){
		return type
	}
}
</script>



<style lang='less' scoped>
.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .top_btn {
        align-self: flex-end;
        height: 2rem;
        width: 7rem;
    }
    .box {
        width: 100%;
        height: 4.2rem;
        border-bottom: 1px solid #324b9b;
        margin-top: 1rem;
        .top {
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
        h1 {
            font-size: 16.5px;
            font-weight: 500;
            margin-top: 0.3rem;
            cursor: pointer;
        }
        h1:hover {
            color: #324b9b;
        }
    }
    .btn {
        width: 10rem;
        align-self: center;
        margin-top: 2.5rem;
        margin-bottom: 6rem;
    }
}
</style>
