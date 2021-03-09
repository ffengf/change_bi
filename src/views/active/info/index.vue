<template>
    <div id="active_info" v-loading="_loading">
        <BoxHeader :new_list="bread" />
        <h2>
			<span class="green" v-if="info.status === 1">모집 중</span>
			<span class="blue" v-if="info.status === 2">마감 임박</span>
			<span class="orange" v-if="info.status === 3">모집 마감</span>
            <!-- <span>{{ active_type === "1" ? "서평단·강연" : "스페셜 이벤트" }}</span> -->
            <span>|</span>
            <span>{{ info.apply_start }} ~ {{ info.apply_end }}</span>
        </h2>
        <h1>{{ info.title }}</h1>
        <div class="line"></div>
        <!-- <div class="inner" v-html="info.content"></div> -->
		<Inner :val="info.content" />
		<el-button type="primary" class="join" @click="key = true" :disabled="info.is_apply">신청하기</el-button>
		<div class="line"></div>
        <div class="btn_box">
            <el-button @click="id = info.prev" :disabled="info.prev === null">이전 글</el-button>
            <el-button type="success" @click="ret">목록으로</el-button>
            <el-button @click="id = info.next" :disabled="info.next === null">다음 글</el-button>
        </div>
		<el-dialog title="신청사유" :visible="key" width="30%" :before-close="close">
			<div class="dialog" v-loading="dialog_loading">
				<el-input
					class="inp"
					v-model="apply_reason"
					placeholder="신청사유를 작성해 주세요."
					type="textarea"
				></el-input>
				<!-- <div class="len_text color_80">{{ apply_reason.length }}/500</div> -->
				<div class="dialog_btn_box">
					<el-button type="success" @click="join">신청하기</el-button>
					<el-button @click="close">취소</el-button>
				</div>
			</div>
		</el-dialog>
    </div>
</template>

<script lang="ts">
import { active, api_active } from "@/api";
import { Vue, Component, Watch } from "vue-property-decorator";
import BoxHeader from "../header.vue";
import Inner from "@/components/inner/index.vue"
@Component({
    components: {
		BoxHeader,
		Inner,
    },
})
export default class extends Vue {
    bread = [
        {
            to: "/active/1/list",
            title: "이벤트",
        },
        {
            title: this.active_type === "1" ? "서평단·강연" : "스페셜 이벤트",
        },
    ];

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
		this._loading = true
		this.info = await api_active.get_info(this.id).finally(()=>{
			this._loading = false
		})
	}

	ret(){
		this.$router.push(`/active/${this.active_type}/list`)
	}


	key = false
	apply_reason = ''
	dialog_loading = false
	async join(){
		const apply_reason = this.apply_reason
		if(apply_reason === ''){
			return this.$message.error('신청사유를 작성해 주세요.')
		}
		this.dialog_loading = true
		const { code } = await api_active.join(this.id,apply_reason).finally(()=>{
			this.dialog_loading = false
		})
		this.close()
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

	close(){
		this.apply_reason = ''
		this.key = false;
	}

}
</script>



<style lang='less' scoped>
.green{
	color: #3fa535;
}
.blue{
	color: #324b9b;
}
.orange{
	color: #df5400;
}
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
	/deep/.el-dialog__wrapper {
        border-radius: 0;
        .el-dialog__header {
            background: #324b9b;
            padding: 0.7rem;
            .el-dialog__headerbtn {
                i {
                    color: #fff;
                    font-size: 20px;
                }
            }
            .el-dialog__title {
                color: #fff;
            }
        }
        .el-dialog {
            border-radius: 0;
        }
    }
    .dialog {
        h1 {
            font-family: NotoSansKR;
            font-size: 17px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.43px;
            margin-bottom: 0.5rem;
        }
        .inp {
            /deep/.el-textarea__inner {
                border: 1px solid #000 !important;
				border-radius: 0!important;
            }
        }
        .dialog_btn_box {
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
            > * {
                width: 49.5%;
                height: 2.2rem;
            }
        }
    }
}
</style>
