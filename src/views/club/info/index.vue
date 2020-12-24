<template>
    <div id="info" v-loading="_loading">
		<div class="left">
			<img :src="info.cover">
			<div class="title">상세설명</div>
			<div class="line"></div>
			<div class="box inner" v-html="info.content"></div>
			<div class="title mt">환불규정</div>
			<div class="line"></div>
			<div class="box inner" v-html="info.refund_desc"></div>
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
				<div class="line"></div>
				<div class="money" v-if="info.price === 0">무료</div>
				<div class="money" v-else>{{ numFormat(info.price) }} 원</div>
			</div>
			<div class="bottom">
				<div class="pay" v-if="info.price !== 0">
					<h1>결제하기</h1>
					<div class="how">
						<div>결제방법</div>
						<el-select v-model="pay_type" placeholder="결제 방법 선택">
							<el-option value="card" label="신용카드"></el-option>
							<el-option value="trans" label="계좌이체"></el-option>
							<el-option value="phone" label="휴대폰결제"></el-option>
						</el-select>
					</div>
					<div class="line"></div>
					<div class="how">
						<div>쿠폰 선택</div>
						<el-select v-model="coupon" placeholder="쿠폰을 선택">
							<el-option value="" label="쿠폰 없음">
								<span style="float: left">쿠폰 없음</span>
								<span style="float: right; color: #8492a6; font-size: 13px">0</span>
							</el-option>
							<el-option v-for="ele in coupon_list" :key="ele.id" :value="ele.id" :label="ele.coupon.title">
								<span style="float: left">{{ ele.coupon.title }}</span>
								<span style="float: right; color: #8492a6; font-size: 13px">-{{ ele.coupon.amount }}</span>
							</el-option>
						</el-select>
					</div>
					<div class="info_money">
						<div class="left">결제금액</div>
						<div class="right">{{ numFormat(price) }} 원</div>
					</div>
				</div>
				<el-button v-if="info.price === 0" type="success" class="btn" @click="free">신청하기</el-button>
				<el-button v-else type="success" class="btn" @click="check_coupon">결제하기</el-button>

				<el-button type="primary" class="btn" v-if="info.is_collect === 0" @click="collect(1)">收藏</el-button>
				<el-button type="danger" class="btn" v-else @click="collect(0)">取消收藏</el-button>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import { api_club, api_user, club_info, user_coupon } from "@/api";
import { Vue, Component, Watch, Emit } from "vue-property-decorator";
import { numFormat } from "@/util/string"
import { pay, pay_type } from "@/util/pay";
@Component
export default class extends Vue {

	numFormat = numFormat

	coupon_list:user_coupon[] = []

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
		type:0,
		other_title:'',
		other_content:'',
	}
	pay_type:pay_type | '' = ''

	coupon:number|string = ''

	get id():number{
		return Number(this.$route.params.id)
	}

	@Watch('id')
	async get_info(){
		this._loading = true
		const info = await api_club.get_info(this.id).finally(()=>{
			this._loading = false
		})
		this.info = info
		this.get_coupon_list(info.type)
		this.$route.meta.title = info.title
	}

	get price(){
		if(this.choose_coupon === undefined){
			return this.info.price
		}
		return this.info.price - this.choose_coupon.coupon.amount < 149 ? 150 : this.info.price - this.choose_coupon.coupon.amount
	}

	get choose_coupon(){
		return this.coupon_list.find(x => x.id === this.coupon)
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

	async pay(){
		const coupon_id = this.choose_coupon?.id
		const club_id = this.info.id
		if(this.pay_type === ''){
			return this.$message.error('결제 방법 선택')
		}
		this._loading = true
		pay(this.price,this.pay_type)
			.then((res:any)=>{
				console.log('success',res)
				const merchant_uid:string = res.merchant_uid
				api_club.pay_join({ merchant_uid,coupon_id,club_id }).then(()=>{
					this.$router.push({
						path: '/other/pay/success',
						query:{
							go_1:'/user/club',
							go_2:'/user/pay',
						}
					})
				})
			})
			.catch((e)=>{
				console.log('fail',e)
				this.$router.push({
					path: '/other/pay/fail',
					query:{
						go_1:this.$route.path,
						go_2:'/user/pay',
					}
				})
			}).finally(()=>{
				this._loading = false
			})
	}

	async check_coupon(){
		this._loading = true
		await api_club.pay_check(this.info.id,this.choose_coupon?.id).finally(()=>{
			this._loading = false
		})
		this.pay()
	}

	async get_coupon_list(type:0|1){
		this.coupon_list = await api_user.get_pay_coupon(type)
	}

	async collect(is_collect:0|1){
		this._loading = true
		await api_club.collect(this.info.id,is_collect).finally(()=>{
			this._loading = false
		})
		this.info = {
			...this.info,
			is_collect
		}
		this.$message.success('success')
	}

	created(){
		this.get_info()
	}
}
</script>



<style lang='less' scoped>
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
		.title{
			font-family: NotoSansKR;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.71;
			letter-spacing: -0.7px;
			font-size: 14px;
			font-weight: 500;
			color: #324b9b;
			margin-top: 2rem;
		}
		.mt{
			margin-top: 2.6rem;
		}
		.line{
			background: #324b9b;
			height: 1px;
			margin: 0.5rem 0 1.5rem 0;
		}
		.box{
			font-family: NotoSansKR;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.71;
			letter-spacing: -0.7px;
		}
	}
	.right{
		width: 16rem;
		.top{
			width: 100%;
			min-height: 5.25rem;
			background: #324b9b;
			box-sizing: border-box;
			padding-top: 1.5rem;
			padding-left: 1.4rem;
			padding-bottom: 1.5rem;
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
			min-height: 11rem;
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
				// margin-bottom: 1.5rem;
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
					margin-top: 1rem;
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
				margin-left: 0;
				&:nth-of-type(2){
					margin-top: 1rem;
				}
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
	}
}

</style>
