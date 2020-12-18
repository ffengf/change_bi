<template>
    <div>
		<div class="info" v-loading="_loading">
			<h2>
				<span>{{ info.create_time }}</span>
				<span>|</span>
				<span>운영자 작성</span>
			</h2>
			<h1>{{ info.title }}</h1>
			<el-button class="btn" type="success" @click.stop="create" v-if="info.attendance_id === null">제출하기</el-button>
			<el-button class="btn" type="primary" @click.stop="edit" v-else>수정하기</el-button>
		</div>
		<div class="inner" v-html="info.content"></div>
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
	</div>
</template>

<script lang="ts">
import { api_myclub,club_task } from "@/api";
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class extends Vue {

	info:club_task = {
		prev:null,
		next:null,
		id:0,
		content:'',
		title:'',
		create_time:'',
		attendance_id:null
	}

	@Watch('id',{ immediate:true })
	async watch_id(){
		this._loading = true
		this.info = await api_myclub.task_info(this.id).finally(()=>{
			this._loading = false
		})
	}

    get id(): number {
        return +this.$route.query.id;
    }

    set id(id: number) {
        this.$router.push({
            path: this.$route.path,
            query: { id: String(id) },
        });
	}

	ret_list(){
		this.$router.push(this.$route.path)
	}
}
</script>



<style lang='less' scoped>
.info{
	height: 3.8rem;
	border-bottom: 1px solid #324b9b;
	position: relative;
	.btn{
		position: absolute;
		transform: translateY(-50%);
		top: 45%;
		right: 0;
		height: 1.7rem;
		width: 6.8rem;
		padding: 0;
	}
	h2{
		font-family: NotoSansKR;
		font-size: 11.5px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: -0.29px;
		span:nth-of-type(1){
			color: #324b9b;
		}
		span:nth-of-type(2){
			margin: 0 0.3rem;
		}
	}
	h1{
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.41px;
		color: #000000;
		margin: 0.3rem 0;

	}
}
.inner{
	min-height: 27rem;
	border-bottom: 1px solid #324b9b;
	padding-top: 1rem;
	box-sizing: border-box;
}
.btn_box{
	margin-top: 2.5rem;
	margin-bottom: 6rem;
	display: flex;
	justify-content: space-between;
	> * {
		width: 7.5rem;
		height: 2.2rem;
	}
}
</style>
