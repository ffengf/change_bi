<template>
    <div class="box">
        <div class="item">
            <p>{{ info.tag }}</p>
            <h1>Q. {{ info.question }}</h1>
            <i id="icon" class="icon el-icon-arrow-up" @click="show" v-if="key"></i>
            <i id="icon" class="icon el-icon-arrow-down" @click="show" v-else></i>
        </div>
        <h2 class="content inner" v-if="key" v-html="info.answer"></h2>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { faq } from "@/api";
@Component
export default class extends Vue {
    key = false;

    @Prop({ required: true })
    info!: faq;

    show() {
        this.key = !this.key;
    }
}
</script>



<style lang='less' scoped>
.box {
    .item {
        min-height: 4.3rem;
        border-top: 1px solid #324b9b;
		position: relative;
		box-sizing: border-box;
		padding-bottom: 1rem;
		width: 100%;
        p {
            color: #3fa535;
            font-size: 11.5px;
            margin-top: 1rem;
        }
        h1 {
			width: 80%;
            color: #324b9b;
            font-weight: bold;
            font-style: normal;
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
        /deep/.el-icon-arrow-up:before {
            content: "\e6e1" !important;
            color: #3fa535 !important;
            font-size: 40px !important;
        }
    }
    .content {
        padding: 2rem 0;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        width: 100%;
        border-top: 1px solid #324b9b;
        white-space: normal;
        word-break: break-all;
        /deep/p {
            white-space: normal;
            word-break: break-all;
        }
    }
}
@media screen and (max-width: 1024px) {
	h1{
		font-size: 16.5px!important;
	}
	#icon {
		font-size: 24px!important;
		&::before{
			font-size: 24px!important;
		}
	}
}
</style>
