<template>
    <div>
		<div class="item">
			<div class="top">
				<span class="color_success" v-if="info.status === 0">답변대기</span>
				<span class="color_primary" v-if="info.status === 1">답변완료</span>
				<span class="lines"></span>
				<span>{{ info.create_time }}</span>
			</div>
			<h1>Q.{{ info.title }}</h1>
		</div>
		<div class="warpper">
			<!-- <h2 class="inner" v-html="info.question"></h2> -->
			<Inner :val="info.question" />
			<template v-if="info.status === 1">
				<div class="answer">답변드립니다.</div>
				<!-- <h2 class="inner" v-html="info.answer"></h2> -->
				<Inner :val="info.answer" />
			</template>
		</div>
		<div class="btn_box">
			<el-button class="btns aaa" :disabled="what === 0" @click="change_what(what - 1)">이전 글</el-button>
			<el-button class="btns" type="success" @click="change_type('list')">목록으로</el-button>
			<el-button class="btns aaa" :disabled="what + 1 === count" @click="change_what(what + 1)">다음 글</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Model, Emit, Prop } from "vue-property-decorator";
import { api_customer, qa } from "@/api"
import Inner from "@/components/inner/index.vue"
type type = "list" | "info" | "question";

@Component({
	components:{
		Inner,
	}
})
export default class extends Vue {
	@Model('update:type',{ required:true,type:String })
	readonly type !:type
	@Emit('update:type')
	change_type(type:type):type{
		return type
	}

	@Model("update:what", { type: Number, required: true })
	readonly what!: number;
    @Emit("update:what")
    change_what(index: number) {
		return index
	}

	@Prop({ required:true })
	count !:number

	@Prop({ required:true })
	list !:qa[]

	get info():qa{
		return this.list[this.what]
	}
}
</script>



<style lang='less' scoped>
.item{
	height: 4.3rem;
	margin-top: -1rem;
	position: relative;
	p{
		color: #3fa535;
		font-size: 11.5px;
		margin-top: 1rem;
	}
	h1{
		// color: #324b9b;
		font-weight: bold;
		margin-top: 0.4rem;
	}
	.icon{
		position: absolute;
		right: 1.5rem;
		top: 50%;
		color: #3fa535;
		transform: translateY(-50%);
		font-size: 40px;
		cursor: pointer;
	}
}
.warpper{
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
	.answer{
		height: 5rem;
		border-top: 1px solid #3fa535;
		border-bottom: 1px solid #3fa535;
		line-height: 5rem;
		font-family: NotoSansKR;
		font-size: 22px;
		font-weight: 550;
		margin:  2.5rem 0;
	}
}
.btn_box{
	margin-top: 2.5rem;
	margin-bottom: 6rem;
	display: flex;
	justify-content: space-between;
	> * {
		width: 10rem;
		height: 2.2rem;
	}
}
.top{
	margin-top: 0.7rem;
	span{
		font-size: 11.5px;
	}
	.lines{
		display: inline-block;
		height: 0.5rem;
		width: 1px;
		background: #000;
		margin: 0 0.3rem;
	}
}
</style>
