<template>
    <div class="list">
        <el-button type="success" class="top_btn" @click="change_type('question')">질문하기</el-button>
        <template v-if="list.length !== 0">
			<div class="box" v-for="(ele,index) in list" :key="index">
				<div class="top">
					<span class="color_success" v-if="ele.status === 0">답변대기</span>
					<span class="color_primary" v-if="ele.status === 1">답변완료</span>
					<span class="lines"></span>
					<span>{{ ele.create_time }}</span>
				</div>
				<h1 @click="change_what(index)">{{ ele.title }}</h1>
			</div>

			<el-button type="success" class="btn" @click="more" :disabled="disabled">더 보기</el-button>
		</template>
		<div class="none">
			질문하신 내역이 없습니다.
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Model, Prop } from "vue-property-decorator";
import { qa } from '@/api';
type type = "list" | "info" | "question";

@Component
export default class extends Vue {
	@Model('update:type',{ required:true,type:String })
	type !:type
	@Emit('update:type')
	change_type(type:type):type{
		return type
	}


	@Prop({ required:true })
	list !:qa[]

	@Prop({ required:true })
	disabled !:boolean


	@Model("update:page", { type: Number, required: true })
	readonly page!: number;
    @Emit("update:page")
    more() {
        return this.page + 1;
	}

	@Model("update:what", { type: Number, required: false })
	readonly what!: number;
    @Emit("update:what")
    change_what(index: number) {
		this.change_type('info')
		return index
	}

}
</script>



<style lang='less' scoped>
.list {
    width: 100%;
    display: flex;
	flex-direction: column;
	position: relative;
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
	.none{
		width: 100%;
		text-align: center;
		height: 10rem;
		line-height: 10rem;
	}
}
@media screen and (max-width: 1024px) {
	.list {
		.top_btn {
			position: absolute;
			top: -2.3rem;
			width: 5rem;
		}
	}
}
</style>
