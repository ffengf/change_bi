<template>
    <div id="active_info" v-loading="loading">
        <BoxHeader :new_list="bread" />
        <h2>
            <span>{{ active_type === "1" ? "서평단 신청" : "강연 초대" }}</span>
            <span>|</span>
            <span>{{ info.start_time }}</span>
        </h2>
        <h1>{{ info.title }}</h1>
        <div class="line"></div>
        <div class="inner" v-html="info.content"></div>
		<el-button type="primary" class="join" @click="join" :disabled="info.is_apply">신청하기</el-button>
		<div class="line"></div>
        <div class="btn_box">
            <el-button @click="id = info.prev" :disabled="info.prev === null">이전 글</el-button>
            <el-button type="success" @click="ret">목록으로</el-button>
            <el-button @click="id = info.next" :disabled="info.next === null">다음 글</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { active, api_active } from "@/api";
import { Vue, Component, Watch } from "vue-property-decorator";
import BoxHeader from "../header.vue";
@Component({
    components: {
        BoxHeader,
    },
})
export default class extends Vue {
    bread = [
        {
            to: "/active/1/list",
            title: "이벤트",
        },
        {
            title: this.active_type === "1" ? "서평단 신청" : "강연 초대",
        },
    ];

	ids:number[] = []

	info:active = {
		id:0,
		title: '',
		content: '',
		cover: '',
		status: 1,
		apply_num: 0,
		total_num: 0,
		start_time: '',
		end_time: '',
		create_time: '',
		apply_start: '',
		apply_end: '',
		prev:null,
		next:null,
	}

    get active_type() {
        const type: string = this.$route.params.active_type
        if (type === "1" || type === "2") {
            return type;
        } else {
            return "1";
        }
    }

    get id(): number {
        return +this.$route.params.id
	}

	set id(id:number){
		this.$router.push(`/active/${this.active_type}/info/${id}`)
	}


	@Watch('id',{ immediate:true })
	async get_info(){
		this.loading = true
		this.info = await api_active.get_info(this.id).finally(()=>{
			this.loading = false
		})
	}

	ret(){
		this.$router.push(`/active/${this.active_type}/list`)
	}


	async join(){
		this.loading = true
		const { code } = await api_active.join(this.id).finally(()=>{
			this.loading = false
		})
		this.get_info()
		if(code === 50001){
			await this.$confirm('이미 참여하고 있는 이벤트입니다. 나의 이벤트로 이동하시겠습니까?',{
				confirmButtonText: '이동',
				cancelButtonText: '이전으로',
			})
			this.$router.push('/user/active')
		}else{//first
			await this.$confirm('신청이 완료되었습니다.',{
				confirmButtonText: '나의 이벤트',
				cancelButtonText: '이전으로',
			})
			this.$router.push('/user/active')
		}
	}

}
</script>



<style lang='less' scoped>
#active_info{
	width: 100%;
	display: flex;
	flex-direction: column;
	h2{
		font-family: NotoSansKR;
		font-size: 11.5px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: -0.29px;
		text-align: left;
		color: #000000;
		span:nth-of-type(1){
			color: #3fa535;
		}
		span:nth-of-type(2){
			margin: 0 0.3rem;
		}
	}
	h1{
		margin-top: 0.6rem;
		margin-bottom: 1.25rem;
		font-family: NotoSansKR;
		font-size: 22px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: -1.1px;
		text-align: left;
		color: #000000;
	}
	.line{
		height: 1px;
		background: #324b9b;
	}
	.inner{
		min-height: 20rem;
		margin: 1.25rem 0;
	}
	.join{
		width: 12.2rem;
		height: 2.65rem;
		align-self: center;
		margin-bottom: 2.5rem;
	}
	.btn_box{
		margin-top: 2.25rem;
		margin-bottom: 6rem;
		display: flex;
		justify-content: space-between;
		> * {
			width: 10rem;
			height: 2.2rem;
		}
	}
}
</style>
