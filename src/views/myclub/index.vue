<template>
    <div id="club" class="flexC" v-loading="loading">
		<div class="club w70vw min_width1000">
			<div class="bread_box">
				<Bread :new_list="title" />
			</div>
			<div class="line mt10 w70vw"></div>
			<div class="body">
				<div id="info" v-loading="loading">
					<div class="left">
						<img :src="info.cover">
						<ul class="tab">
							<li class="active">공지사항</li>
							<li>미션 게시판</li>
							<li>자유 게시판</li>
						</ul>
						1
					</div>
					<div class="right">
						<div class="top">
							<h1>{{ info.title }}</h1>
							<h2>{{ info.subtitle }}</h2>
						</div>
						<div class="mid">
							<h2>신청하기</h2>
							<h1>{{ info.option }}</h1>
							<h3>{{ info.option_desc }}</h3>
						</div>
						<div class="bottom">
							<el-button  type="success" class="btn" @click="pay">1123</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue"
import { api_club, club_info } from "@/api";
import { numFormat } from "@/util/string";
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends Vue {
	title = [
		{
			title:'마이페이지',
			to:'/user'
		},
		{
			title:'나의 모임',
			to:'/user/club'
		},
		{
			title:'',
		}
	]

	numFormat = numFormat

	info:club_info = {
		id: 0,
		title: '',
		subtitle: '',
		cover: '',
		status: 0,
		is_collect: 0 ,
		start_time:'',
		end_time:'',
		price:0,
		refund_desc:'',
		option:'',
		option_desc:'',
	}

	get id():number{
		return Number(this.$route.params.id)
	}

	@Watch('id',{ immediate:true })
	async get_info(){
		this.loading = true
		this.info = await api_club.get_info(this.id).finally(()=>{
			this.loading = false
		})
		this.title.splice(2,1,{ title:this.info.title })
	}

	async free(){
		const { code } = await api_club.join(this.info.id)
		if(code === 50001){
			await this.$confirm('이미 참여하고 있는 모임입니다. 나의 모임으로 이동하시겠습니까?',{
				confirmButtonText: '이동',
				cancelButtonText: '취소',
			})
			this.$router.push('/user/club')
		}else{
			await this.$confirm('신청이 완료되었습니다.',{//free first
				confirmButtonText: '나의 모임',
				cancelButtonText: '이전으로',
			})
			this.$router.push('/user/club')
		}
	}

	pay(){

	}

}
</script>



<style lang='less' scoped>
#club{
	width: 100vw;
	margin-top: 3.75rem;
	.club{
		display: flex;
		flex-direction: column;
	}
	.line{
		background: #324b9b;
	}
	.body{
		margin-top: 2rem;
		width: 100%;
	}
}

#info{
	margin-top: -0.5rem;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-bottom: 6rem;
	.left{
		width: 30rem;
		img{
			width: 100%;
			height: 21.5rem;
		}
		.tab{
			margin: 1.5rem 0;
			display: flex;
			width: 100%;
			height: 2.5rem;
			li{
				box-sizing: border-box;
				line-height: 2.5rem;
				height: 100%;
				text-align: center;
				width: 34%;
				border: 1px solid #324b9b;
				color: #324b9b;
				cursor: pointer;
			}
			.active{
				color: #fff;
				background: #324b9b;
			}
		}
	}
	.right{
		width: 16rem;
		.top{
			width: 100%;
			height: 5.25rem;
			background: #324b9b;
			box-sizing: border-box;
			padding-top: 1.5rem;
			padding-left: 1.4rem;
			h1,h2{
				color: #fff;
			}
			h1{
				font-family: NotoSansKR;
				font-size: 22px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.09;
				letter-spacing: -1.1px;
				text-align: left;
			}
			h2{
				margin-top: 0.5rem;
				font-family: NotoSansKR;
				font-size: 14px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.71;
				letter-spacing: -0.7px;
				text-align: left;
			}
		}
		.mid{
			width: 100%;
			height: 11rem;
			box-sizing: border-box;
			border-left: 1px solid #dfdfdf;
			border-right: 1px solid #dfdfdf;
			padding: 1.5rem 1.4rem;
			overflow: hidden;
			h2{
				font-family: NotoSansKR;
				font-size: 16px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.5;
				letter-spacing: -0.8px;
				text-align: left;
			}
			h1{
				font-family: NotoSansKR;
				font-size: 22px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.09;
				letter-spacing: -1.1px;
				text-align: left;
				color: #3fa535;
				margin: 0.7rem 0;
			}
			h3{
				font-family: NotoSansKR;
				font-size: 13px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.77;
				letter-spacing: -0.65px;
				text-align: left;
				color: #000000;
			}
			.line{
				background: #dfdfdf;
				height: 1px;
				margin: 1.1rem 0;
			}
			.money{
				font-family: NotoSansKR;
				font-size: 18px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.28;
				letter-spacing: -0.9px;
				color: #324b9b;
				float: right;
				margin-bottom: 1.5rem;
			}
		}
		.bottom{
			width: 100%;
			border: 3px solid #3fa535;
			box-sizing: border-box;
			padding: 1.5rem;
			.pay{
				margin-bottom: 1.9rem;
				h1{
					font-family: NotoSansKR;
					font-size: 16px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					line-height: 1.5;
					letter-spacing: -0.8px;
					text-align: left;
					color: #000000;
				}
				.how{
					>div{
						font-family: NotoSansKR;
						font-size: 14px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						line-height: 1.64;
						letter-spacing: -0.7px;
						text-align: left;
					}
					display: flex;
					align-items: center;
					justify-content: space-between;
					/deep/.el-input__inner{
						border: 1px solid #000000 !important;
						padding: 0.75rem !important;
						box-sizing: border-box!important;
						height: 2rem;
						width: 7.5rem;

					}
				}
				.line{
					height: 1px;
					background: #dfdfdf;
					margin: 1rem 0;
				}
				.info_money{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						font-family: NotoSansKR;
						font-size: 14px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						line-height: 1.64;
						letter-spacing: -0.7px;
					}
					.right{
						font-family: NotoSansKR;
						font-size: 16px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						line-height: 1.44;
						letter-spacing: -0.4px;
						text-align: right;
					}
				}
			}
			.btn{
				width: 100%;
				font-family: NotoSansKR;
				font-size: 15px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.38px;
			}
		}
	}
}
@media only screen and (max-width: 1024px) {
	#info{
		.left,.right{
			width: 100%;
			img{
				height: auto;
			}
		}
		.right{
			order: 1;
		}
	}
}
</style>
