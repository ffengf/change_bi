<template>
    <div class="creation">
		<div class="warpper w70vw min_width1000">
			<h1>클럽 창작과비평</h1>
			<div class="line"></div>
			<h2 class="na_sm">
				<p>한 계절이 지나고</p>
				<p>당신의 문학이 더 깊어집니다</p>
				<p>당신의 관점이 더 넓어집니다</p>
			</h2>
			<h3>
				<p>우리 함께 문학과 세상에 대해 이야기해요.</p>
				<p>한 계절 동안 함께 『창작과비평』을 읽어 나갈 분들을 모집합니다.</p>
			</h3>
			<a class="btn" v-loading="_loading" @click="are_you_ok">신청하기</a>
		</div>
		<div class="content w70vw min_width1000 kr-li">
			<div class="left">
				<img src="@/assets/img/1left.png" alt="">
			</div>
			<h1 class="mid sm-down">
				<p><span class="kr-bo">클럽 창작과비평은</span> 계간 『창작과비평』을 함께 읽는 활동입니다. 『창작과비평』은 1966년 창간 이래 우리 문학과 지식계에 큰 발자취를</p>
				<p>남겨온, 한국을 대표하는 문예지입니다. 주요 작가들의 시와 소설 신작은 물론 최근 정치 · 사회 이슈에 대한 심도 있는 비평 등 다양한 글을</p>
				<p>만날 수 있습니다. 클럽 창작과비평 클러버가 되면 『창작과비평』 종이책을 제공받고, 정해진 미션에 따라 같이 읽어나가는 활동을 하게 </p>
				<p>됩니다. 매년 2, 5, 8, 11월 클러버를 모집하며, 한 기수 당 3개월 간 계간지 한 권을 함께 읽습니다.</p>
			</h1>
			<h1 class="mid sm-up">
				<p><span>클럽 창작과비평은</span></p>
				<p>계간 『창작과비평』을 함께 읽는 활동입니다.</p>
				<p>『창작과비평』은 1966년 창간 이래</p>
				<p>우리 문학과 지식계에 큰 발자취를 남겨온,</p>
				<p>한국을 대표하는 문예지입니다.</p>
				<p>주요 작가들의 시와 소설 신작은 물론</p>
				<p>최근 정치 · 사회 이슈에 대한 심도 있는 비평 등</p>
				<p>다양한 글을 만날 수 있습니다.</p>
				<p>클럽 창작과비평 클러버가 되면</p>
				<p>『창작과비평』 종이책을 제공받고, 정해진 미션에 따라 같이 읽어나가는 활동을 하게 됩니다.</p>
				<p>매년 2, 5, 8, 11월 클러버를 모집하며,</p>
				<p>한 기수 당 3개월 간 계간지 한 권을 함께 읽습니다.</p>
			</h1>
			<div class="right">
				<img src="@/assets/img/1right.png" alt="">
			</div>
		</div>
		<h1 class="title w70vw min_width1000">클럽 창작과비평 활동</h1>
		<ul class="list w70vw min_width1000">
			<li class="item">
				<div class="v1">
					<div class="top">
						<h2>첫째</h2>
						<div class="line"></div>
						<h1>미션</h1>
						<div class="line"></div>
					</div>
					<h3 class="kr-li sm-down">
						<p>매주 미션이 주어집니다. ‘이번 호에서 가장 마음에 들었던 시 한편을 고르고,</p>
						<p>좋았던 문장 소개하기’, ‘내가 문학초점을 기획한다면 어떤 작품들을 다루고</p>
						<p>싶은지’ 등 각 챕터를 읽어나가기 위한 간단한 미션이 설정되어 있습니다. </p>
						<p>어렵지 않게 차근차근 읽어나갈 수 있도록 클럽지기가 매주 미션을 안내할 </p>
						<p>예정이에요!</p>
					</h3>
					<h3 class="kr-li sm-up">
						<p>매주 미션이 주어집니다. ‘이번 호에서 가장 마음에 들었던 시 한편을 고르고,
						좋았던 문장 소개하기’, ‘내가 문학초점을 기획한다면 어떤 작품들을 다루고
						싶은지’ 등 각 챕터를 읽어나가기 위한 간단한 미션이 설정되어 있습니다.
						어렵지 않게 차근차근 읽어나갈 수 있도록 클럽지기가 매주 미션을 안내할
						예정이에요!</p>
					</h3>
				</div>
				<div class="v2">
					<img src="@/assets/img/club/creation_1.jpg" alt="">
				</div>
			</li>
			<li class="item">
				<div class="v1">
					<div class="top">
						<h2>둘째</h2>
						<div class="line"></div>
						<h1>참여 단위</h1>
						<div class="line"></div>
					</div>
					<h3 class="kr-li sm-down">
						<p>클럽 창작과비평은 개별/조별 신청이 가능합니다. 혼자서 활동에 참여하고</p>
						<p>싶은 분들은 ‘개인 신청’을, 독서모임이나 학회 친구들과 함께 활동을 하고</p>
						<p>싶은 분들은 ‘조 신청’을 해주시면 됩니다.  </p>
					</h3>
					<h3 class="kr-li sm-up">
						<p>클럽 창작과비평은 개별/조별 신청이 가능합니다.
						혼자서 활동에 참여하고 싶은 분들은 ‘개인 신청’을,
						독서모임이나 학회 친구들과 함께 활동을 하고
						싶은 분들은 ‘조 신청'을 해주시면 됩니다. </p>
					</h3>
				</div>
				<div class="v2">
					<img src="@/assets/img/club/creation_2.jpg" alt="">
				</div>
			</li>
			<li class="item">
				<div class="v1">
					<div class="top">
						<h2>셋째</h2>
						<div class="line"></div>
						<h1>특별 미션</h1>
						<div class="line"></div>
					</div>
					<h3 class="kr-li sm-down">
						<p>책만 읽기 지루하다고요? 아니요!  계간지 미션 외에도 다양한</p>
						<p>특별 미션으로 클럽 창작과비평 활동이 더 다채롭게 채워집니다.</p>
					</h3>
					<h3 class="kr-li sm-up">
						<p>책만 읽기 지루하다고요? 아니요! 계간지 미션 외에도 다양한 특별 미션으로 클럽 창작과비평 활동이 더 다채롭게 채워집니다.</p>
					</h3>
				</div>
				<div class="v2">
					<img src="@/assets/img/club/creation_3.jpg" alt="">
				</div>
			</li>
			<li class="item">
				<div class="v1">
					<div class="top">
						<h2>넷째</h2>
						<div class="line"></div>
						<h1>편집위원과 함께하는 합평회</h1>
						<div class="line"></div>
					</div>
					<h3 class="kr-li sm-down">
						<p>매 계절, 『창작과비평』을 기획하고 만드는 편집위원, 편집자와 함께하는</p>
						<p>합평회가 준비되어 있습니다. 소수 정예 참여로 더욱 밀도 있는 이야기를 </p>
						<p>나눌 수 있습니다. +_+</p>
					</h3>
					<h3 class="kr-li sm-up">
						<p>매 계절, 『창작과비평』을 기획하고 만드는 편집위원, 편집자와 함께하는
						합평회가 준비되어 있습니다. 소수 정예 참여로 더욱 밀도 있는 이야기를
						나눌 수 있습니다. +_+</p>
					</h3>
				</div>
				<div class="v2">
					<img src="@/assets/img/club/creation_4.jpg" alt="">
				</div>
			</li>
			<li class="item">
				<div class="v1">
					<div class="top">
						<h2>다섯째</h2>
						<div class="line"></div>
						<h1>작가와의 만남</h1>
						<div class="line"></div>
					</div>
					<h3 class="kr-li sm-down">
						<p>매 계절, 각 호에 수록된 작가 또는 글의 특성에 맞게 작가와의 만남이</p>
						<p>진행됩니다.</p>
					</h3>
					<h3 class="kr-li sm-up">
						<p>매 계절, 각 호에 수록된 작가 또는 글의 특성에 맞게 작가와의 만남이
						진행됩니다.</p>
					</h3>
				</div>
				<div class="v2">
					<img src="@/assets/img/club/creation_5.jpg" alt="">
				</div>
			</li>
		</ul>
		<div id="href"></div>
		<div class="box">
			<div class="w70vw min_width1000 ccc">
				<h1 class="">신청하기</h1>
				<div class="line sm-down"></div>
				<div class="btn_box sm-down">
					<el-button :type="filter.status === '' ? 'primary' : 'default'" class="btn" @click="filter.status = ''">전체</el-button>
					<!-- <el-button :type="filter.status === 4 ? 'primary' : 'default'" class="btn" @click="filter.status = 4">모집대기</el-button> -->
					<el-button :type="filter.status === 0 ? 'primary' : 'default'" class="btn" @click="filter.status = 0">모집 중</el-button>
					<el-button :type="filter.status === 5 ? 'primary' : 'default'" class="btn" @click="filter.status = 5">모집 마감</el-button>
					<el-button :type="filter.status === 1 ? 'primary' : 'default'" class="btn" @click="filter.status = 1">진행 중</el-button>
				</div>
				<el-select class="select_what sm-up" v-model="filter.status" placeholder="결제 방법 선택" :popper-append-to-body="false">
					<el-option value label="전체"></el-option>
					<!-- <el-option :value="4" label="모집대기"></el-option> -->
					<el-option :value="0" label="모집 중"></el-option>
					<el-option :value="5" label="모집 마감"></el-option>
					<el-option :value="1" label="진행 중"></el-option>
				</el-select>
			</div>
		</div>
		<ul class="box_list w70vw min_width1000" v-loading="_loading" v-if="list.length !== 0">
			<el-card shadow="never" class="item" v-for="(ele) in list" :key="ele.id" @click.native="$router.push(`/club/creation/info/${ele.id}`)">
				<img :src="ele.cover" alt="">
				<h1>{{ ele.title }}</h1>
				<h2>
					<span class="blink green" v-if="ele.status === 0">모집 중</span>
					<span class="blue" v-if="ele.status === 1">진행 중</span>
					<span class="blink orange" v-if="ele.status === 3">마감 임박</span>
					<span class="blue" v-if="ele.status === 4">모집대기</span>
					<span class="orange" v-if="ele.status === 5">모집 마감</span>
					<span>|</span>
					<span>{{ ele.apply_start }} ~ {{ ele.apply_end }}</span>
				</h2>
				<h3>{{ ele.subtitle }}</h3>
			</el-card>
		</ul>
		<div class="none" v-loading="_loading" v-else>
			해당하는 모임이 없습니다.
		</div>
		<el-button type="success" class="more" @click="more" :disabled="disabled">더 보기</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component,Watch } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue"
import { api_club, club_list } from "@/api"
import { More } from "@/mixin/more"
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends More(api_club.get_creation_list) {
	filter = {
		status:''
	} as any

	@Watch('filter.status')
	watch_status(){
		this.clear_list()
	}


	async are_you_ok(){
		if(this._loading === true) return
		if(this.filter.status === 0){
			if(this.list[0] !== undefined){
				this.$router.push(`/club/creation/info/${this.list[0].id}`)
			}else{
				return this.$message.error('이번 기수는 신청 마감되었습니다. 2, 5, 8, 11월에 새 기수 모집이 시작됩니다!')
			}
		}else{
			const { results } = await api_club.get_creation_list({ page:1,page_size:1,status:0 })
			if(results[0] === undefined){
				return this.$message.error('이번 기수는 신청 마감되었습니다. 2, 5, 8, 11월에 새 기수 모집이 시작됩니다!')
			}
			this.$router.push(`/club/creation/info/${results[0].id}`)
		}
	}
}
</script>



<style lang='less' scoped>
.creation{
	display: flex;
	flex-direction: column;
	align-items: center;
	.warpper{
		height: 27.5rem;
		border-bottom: 1px solid #324b9b;
		display: flex;
		flex-direction: column;
		align-items: center;
		h1{
			font-family: NotoSansKR-Medium;
			font-size: 48px;
			font-weight: 500;
			font-stretch: normal;
			font-style: normal;
			letter-spacing: -2.4px;
			color: #3fa535;
		}
		.line{
			background: #3fa535;
			width: 1.25rem;
			margin-top: 1.75rem;
			height: 2px;
		}
		h2{
			margin-top: 2rem;
			color: #324b9b;
			font-family: NanumSquareRoundL;
			font-size: 50px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: normal;
			text-align: center;
			line-height: 55px;
		}
		h3{
			color: #3fa535;
			font-family: NotoSansKR-Medium;
			font-size: 16px;
			font-weight: 500;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.5;
			letter-spacing: -0.4px;
			text-align: center;
			margin-top: 2rem;
		}
		.btn{
			margin-top: 2rem;
			width: 10rem;
			height: 2.2rem;
			display: block;
			color: #fff;
			background-color: #324b9b;
			border-color: #324b9b;
			color: #ffffff;
			text-decoration: none;
			text-align: center;
			line-height: 2.2rem;
			font-size: 14px;
			cursor: pointer;
		}
	}
	.content{
		height: 5rem;
		// width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 7rem;
		margin-bottom: 6.6rem;
		box-sizing: border-box;
		white-space:nowrap;
		position: relative;
		.left,.right{
			position: relative;
		}
		.left{
			margin-right: 1rem;
			img{
				position: relative;
				top: -1rem;
			}
		}
		.right{
			margin-left: 1rem;
			img{
				position: relative;
				bottom: -5rem;
			}
		}
		.mid{
			width: 46.25rem;
			flex: 1;
			height: 5rem;
			font-family: NotoSansKR;
			font-size: 16px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.75;
			letter-spacing: -0.4px;
			text-align: left;
			span{
				color: #3fa535;
			}
		}
	}
	.title{
		font-family: NotoSansKR;
		font-size: 30px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 0.8;
		letter-spacing: -1.5px;
		text-align: left;
		color: #3fa535;
		margin-bottom: 2.15rem;
	}
	.list{
		.item{
			box-sizing: border-box;
			display: flex;
			height: 16.5rem;
			justify-content: space-between;
			flex-direction: row;
			margin-bottom: 5rem;
			&:nth-last-of-type(1){
				margin-bottom: 0;
			}
			.v1,.v2{
				box-sizing: border-box;
				padding-top: 1.5rem;
			}
			.v1{
				width: 48%;
				border-top: 4px solid #324b9b;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top{
					h2{
						color: #3fa535;
						font-family: NotoSansKR;
						font-size: 16px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						line-height: normal;
						letter-spacing: -1.2px;
					}
					.line{
						background: #324b9b;
						height: 2px;
						width: 25px;
					}
					.line:nth-of-type(1){
						margin: 0.75rem 0 1.5rem 0;
					}
					.line:nth-of-type(2){
						margin: 0;
						margin-top: 1.25rem;
					}
					h1{
						color: #3fa535;
						font-family: NotoSansKR;
						font-size: 36px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						line-height: normal;
						letter-spacing: -2.7px;
						text-align: left;
					}
				}
				h3{
					font-family: NotoSansKR;
					font-size: 16px;
					font-weight: normal;
					font-stretch: normal;
					font-style: normal;
					line-height: 1.75;
					letter-spacing: -0.8px;
					text-align: left;
					color: #000000;
				}
			}
			.v2{
				width: 48%;
				border-top: 4px solid #3fa535;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.item:nth-of-type(2n){
			flex-direction: row-reverse;
		}
	}
	#href{
		margin-bottom: 5rem;
	}
	.box{
		width: 100vw;
		height: 7.25rem;
		background: #3fa535;
		display: flex;
		flex-direction: column;
		align-items: center;
		.ccc{
			position: relative;
			h1{
				margin-top: 2rem;
				font-family: NotoSansKR;
				font-size: 30px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -1.5px;
				text-align: left;
				color: #ffffff;
			}
			.line{
				width: 17px;
				height: 2px;
				background: #ffdb7b;
				margin-top: 1.25rem;
			}
			.btn_box{
				position: absolute;
				display: flex;
				top: 50%;
				right: 0;
				> *{
					margin: 0 1px;
					width: 8rem;
					height: 2rem;
				}
			}
		}
	}
	.box_list{
		display: flex;
		flex-wrap: wrap;
		.item{
			width: 33%;
			overflow: hidden;
			cursor: pointer;
			margin-top: 3.5rem;
			box-sizing: border-box;
			/deep/.el-card__body{
				padding: 0.5rem!important;
				box-sizing: border-box !important;
			}
			img{
				width: 15rem;
				height: 11rem;
			}
			h1{
				margin-top: 1.25rem;
				font-family: NotoSansKR;
				font-size: 19px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.95px;
				text-align: left;
			}
			h2{
				margin-top: 0.6rem;
				font-family: NotoSansKR;
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.3px;
				text-align: left;
				span:nth-of-type(2){
					margin: 0 0.3rem;
				}
			}
			h3{
				margin-top: 0.8rem;
				font-family: NotoSansKR;
				font-size: 13px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.33px;
				text-align: left;
				color: #858585;
			}
		}
	}
	.more{
		margin-top: 2.5rem;
		margin-bottom: 6rem;
		width: 10rem;
		height: 2.2rem;
	}
}
.green{
	color: #3fa535;
}
.blue{
	color: #324b9b;
}
.orange{
	color: #df5400;
}

@media only screen and (max-width: 1024px) {
	p{
		white-space: pre-wrap!important;
	}
	.creation{
		.warpper{
			height: auto;

			.btn{
				margin-top: 2rem;
				margin-bottom: 2rem;

			}
		}
		.content{
			height: auto;
			.mid{
				height: auto;
			}
			.right{
				align-self: flex-end;
				img{
					bottom: -2rem;
				}
			}
		}
		.list{
			.item{
				height: auto;
				flex-wrap: wrap;
				.v1,.v2{
					width: 100%;
				}
			}
		}
		.box{
			.ccc{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				h1{
					font-size: 16px;
				}
				.btn_box{
					flex-wrap: wrap;
					justify-content: center;
					position: static;
					width: 100%;
					> *{
						margin: 2rem 0;
						width: 6rem!important;
						margin: 0 1px;
					}
				}
			}
		}
		.box_list{
			.item{
				width: 100%;
				img{
					width: 100%;
					max-height: 20rem;
				}
			}
		}
	}
}
</style>
<style lang="less" scoped>
@media only screen and (max-width: 1024px) {
	.creation{
		.warpper{
			h1{
				font-size: 28px;
			}
			h2{
				font-size: 28px;
			}
			h3{
				font-size: 12px;
			}
		}
		.content{
			.left,.right{
				position: absolute;
			}
			.left{
				top: -1rem;
			}
			.right{
				right: 0;
			}
		}
		.list{
			.item{
				.v1{
					h3{
						margin-top: 2.5rem;
					}
				}
				.v2{
					margin-top: 5rem;
				}
			}
		}
		.box{
			height: 5rem;
			.ccc{
				justify-content: space-between;
				align-items: center;
				.select_what{
					width: 6rem;
					/deep/.el-select-dropdown__wrap{
						margin-bottom: 0!important;
					}
					/deep/.el-input__inner{
						border: 1px solid #324b9b!important;
						padding-left: 1rem!important;
						box-sizing: border-box;
						background: #324b9b!important;
						color: #fff;
					}
					/deep/.el-input__icon{
						&::before{
							color: #fff;
						}
					}
				}
			}
		}
	}
	.creation .box .ccc h1{
		margin-top: 0;
	}
}
</style>
