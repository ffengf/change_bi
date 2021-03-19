<template>
    <div id="index">
        <div class="carousel">
            <el-carousel arrow="always" height="23rem">
                <el-carousel-item class="items" v-for="ele in banner_list" :key="ele.id" @click="open(ele.link)">
                    <el-image class="img sm-down" :src="ele.image" @click="open(ele.link)" />
					<el-image class="img sm-up" :src="ele.h5_image" @click="open(ele.link)" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="flexC" v-if="notice_list.length !== 0">
			<div class="news w70vw min_width1000 flexBC">
				<div class="left sm-down">
					<div class="line"></div>
					<h1>새소식</h1>
					<div style="font-weight: 600;">一</div>
					<h2>
						<p>스위치의 새로운 소식을</p>
						<p>살펴보세요.</p>
					</h2>
				</div>
				<div class="right">
					<div class="sm-up color_success">새소식</div>
					<div class="position">
						<!-- <el-link icon="el-icon-plus" :underline="false" type="success"></el-link> -->
					</div>
					<div class="line"></div>
					<ul>
						<el-card class="item" shadow="none" v-for="(ele) in notice_list" :key="ele.id" @click.native="$router.push(`/other/notice/${ele.id}`)">
							<li>
								<img class="img" :src="ele.cover" />
								<h1>{{ ele.title }}</h1>
								<p>{{ ele.subtitle }}</p>
							</li>
						</el-card>
					</ul>
				</div>
			</div>
		</div>
		<div class="flexC" v-if="serial_list.length !== 0">
			<div class="serial w70vw min_width1000">
				<div class="top">
					<h1>오늘의 연재</h1>
					<el-link :underline="false" type="success" @click="$router.push('/serial/date')"><em>+</em>  <em style="color:#000">더 보기</em></el-link>
				</div>
				<ul class="bottom">
					<el-card class="item" shadow="hover" v-for="(ele) in serial_list" :key="ele.id" @click.native="go_serial(ele.id)">
						<img class="img" :src="ele.cover" />
						<h1>{{ ele.title }}</h1>
						<p class="kr-re">{{ ele.book_desc }}</p>
					</el-card>
				</ul>
			</div>
		</div>
        <div class="img_box flexC">
			<div class="bb w70vw min_width1000">
				<img src="@/assets/img/index1.png"/>
				<img class="sm-down" src="@/assets/img/index2.png"/>
				<img src="@/assets/img/index3.png"/>
				<el-button type="success" class="btn" @click="$router.push('/service/content')">스위치 알아보기</el-button>
			</div>
		</div>
		<div class="text_carousel">
            <el-carousel arrow="always" height="23rem">
                <el-carousel-item v-for="(ele,index) in evaluation_list" :key="index">
                    <div class="text_box na">
						<h1>
							<template v-for="(e,i) in ele.content" >
								<p :class="{ bold:e.is_bold === 1}" :key="i">{{ e.content }}</p>
							</template>
						</h1>
						<h2>{{ ele.service_name }} {{ ele.user_name }}</h2>
					</div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { banner, api_home, book_data, api_serial, api_customer, notice } from '@/api';
import { winopen } from "@/util/other"
@Component
export default class extends Vue {

	banner_list:banner[] = []

	evaluation_list:any[] = []

	serial_list:book_data[] = []

	notice_list:( notice & { cover:string } )[] = []


	async get_banner_list(){
		this.banner_list = await api_home.get_banner()
	}

	async get_evaluation_list(){
		this.evaluation_list = await api_home.get_evaluation()
	}

	async get_serial_list(){
		this.serial_list = await api_serial.get_today()
	}

	async get_notice_list(){
		const { results } = await api_customer.get_home()
		this.notice_list = results
	}


	async created(){
		await Promise.all([
			this.get_banner_list(),
			this.get_evaluation_list(),
			this.get_serial_list(),
			this.get_notice_list(),
		])
	}

	open(url:string|null){
		if(url === null){
			return
		}
		winopen(url)
	}

	go_serial(id:number){
		const day_string = ['월요연재','화요연재','수요연재','목요연재','금요연재'][new Date().getDay() - 1]
		this.$router.push(`/serial/book_info/${id}?bread_date=${day_string}`)
	}

}
</script>

<style lang="less" scoped>
#index {
    > div {
        margin: 2rem 0;
    }
    > div:nth-of-type(1) {
        margin-top: 0;
    }
    > div:nth-last-of-type(1) {
        margin-bottom: 0;
    }
    .carousel {
		/deep/.el-carousel__arrow--left{
			left: 15rem ;
		}
		/deep/.el-carousel__arrow--right{
			right: 15rem ;
		}
		/deep/.el-carousel__indicators--horizontal{
			top: 60%;
			left: 22rem;
		}
		/deep/.el-carousel__button{
			height: 0.5rem;
			width: 0.5rem;
			border-radius: 50%;
		}
        .items{
			cursor: pointer;
			/deep/.title{
				position: absolute;
				top: 30%;
				left: 20%;
				z-index: 10;
				color: #fff;
				font-size: 50px;
			}
			.img {
				width: 100%;
				height: 100%;
			}
		}
    }
    .news {
		align-items: flex-start;
        .left{
			width: 10rem;
			margin-right: 1rem;
			height: 10rem;
			.line{
				background: #324b9b;
			}
			h1{
				margin: 32px 129px 45px 1px;
				font-size: 24px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1;
				letter-spacing: -1.2px;
				text-align: left;
				color: #3fa535;
			}
			h2{
				width: 127px;
				height: 34px;
				margin: 21px 64px 144px 0;
				font-size: 14px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.43;
				letter-spacing: -0.7px;
				text-align: left;
				color: #010101;
			}
		}
		.right{
			flex: 1;
			width: 100%;
			position: relative;
			.position{
				position: absolute;
				right: 0;
				transform: translateY(-110%);
			}
			.line{
				background: #3fa535;
			}
			ul{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.item{
					width: 49%;
					// height: 20rem;
					// margin-top: 1rem;
					cursor: pointer;
					display: flex;
					flex-direction: column;
					.img{
						width: 18rem;
						height: 10.5rem;
					}
					h1{
						margin-top: 0.7rem;
					}
					p{
						font-size: 14px;
						color: #858585;
						margin-top: 0.5rem;
					}
				}
			}
		}
	}
	.serial{
		.top{
			height: 2rem;
			border-bottom: 0.2rem solid #3fa535;
			display: flex;
			justify-content: space-between;
			h1{
				color: #3fa535;
			}
		}
		.bottom{
			margin-top: 2rem;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			&::after{
				content: '';
				width: 30%;
			}
			.item{
				width: 30%;
				height: 18rem;
				cursor: pointer;
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.img{
					width: 8rem;
					height: 8rem;
					border-radius: 50%;
				}
				h1{
					font-family: NotoSansKR;
					font-size: 19px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					line-height: 2.16;
					letter-spacing: -0.95px;
					text-align: center;
					color: #000000;
				}
				p{
					margin-top: 0.7rem;
					font-size: 13px;
					color: #858585;
				}
			}
		}
	}
    .img_box {
		width: 100vw;
		background: #f5f5f5;
		border: 1px solid #ebebeb;
		height: 6rem;
		box-sizing: border-box;
        .bb{
			position: relative;
			height: 100%;
			img{
				position: absolute;
				top: 50%;
				transform: translate(-50%,-50%);
				&:nth-of-type(1){
					left: 3rem;
				}
				&:nth-of-type(2){
					left: 14rem;
				}
				&:nth-of-type(3){
					right: 10rem;
				}
			}
			.btn{
				position: absolute;
				top: 50%;
				right: 0;
				z-index: 1;
				transform: translateY(-50%);
				width: 11rem;
			}
		}
	}
	.text_carousel{
		.text_box{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			h1,h2{
				color: #3fa535;
				p{
					white-space:pre-wrap;
					font-family: NanumSquareRoundL_samll;
				}
			}
			h1{
				font-size: 50px;
				font-weight: 100;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: -3.75px;
			}
			.bold{
				font-family: NanumSquareRoundL;
			}
			h2{
				margin-top: 1rem;
				font-size: 16px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: -0.8px;
			}
		}
		/deep/.el-carousel__arrow--left{
			left: 15rem ;
		}
		/deep/.el-carousel__arrow--right{
			right: 15rem ;
		}
		/deep/.el-carousel__indicators--horizontal{
			top: 80%;
		}
		/deep/.el-carousel__button{
			height: 0.5rem;
			width: 0.5rem;
			border-radius: 50%;
			background: #fff;
			border: 1px solid #848484;
		}
		/deep/.is-active .el-carousel__button{
			background: #3fa535;
			border: 1px solid #3fa535;
		}
	}
}

.img {
    width: 100%;
    height: 100%;
}


@media only screen and (max-width: 1024px){
	.carousel {
		/deep/.el-carousel__container{
			height: 18rem!important;
		}
		/deep/.el-carousel__arrow--left{
			left: 1rem !important ;
		}
		/deep/.el-carousel__arrow--right{
			right: 1rem !important ;
		}
		/deep/.el-carousel__indicators--horizontal{
			top: 80% !important;
			left: 50% !important;
		}
		img{
			object-fit: fill;
		}
	}
	.text_carousel{
		margin: 0!important;
		/deep/.el-carousel__container{
			height: 26rem!important;
		}
		/deep/.el-carousel__arrow--left{
			left: 1rem !important ;
		}
		/deep/.el-carousel__arrow--right{
			right: 1rem !important ;
		}
		/deep/.el-carousel__indicators--horizontal{
			top: 90% !important;
			left: 50% !important;
		}
	}
	.right {
		width: 95vw !important;
		ul{
			li{
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}

	}
	.img_box{
		height: 16rem!important;
		margin: 0!important;
		.bb{
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			img,.btn{
				position: static!important;
				top: auto!important;
				transform:translate(0,0)!important;
			}
		}
	}
	.text_box{
		h1{
			font-size: 30px!important;
		}
		h2{
			font-size: 12px!important;
		}
	}
}

@media only screen and (max-width: 769px){
	.carousel {
		/deep/.el-carousel__container{
			height: 10rem!important;
		}
		/deep/.el-carousel__arrow--left{
			left: 1rem !important ;
		}
		/deep/.el-carousel__arrow--right{
			right: 1rem !important ;
		}
		/deep/.el-carousel__indicators--horizontal{
			top: 80% !important;
			left: 50% !important;
		}
		img{
			object-fit: fill;
		}
	}
	.text_carousel{
		/deep/.el-carousel__container{
			height: 17rem!important;
		}
		/deep/.el-carousel__arrow--left{
			left: 1rem !important ;
		}
		/deep/.el-carousel__arrow--right{
			right: 1rem !important ;
		}
		/deep/.el-carousel__indicators--horizontal{
			top: 90% !important;
			left: 50% !important;
		}
	}
	.right {
		width: 95vw !important;
		ul{
			justify-content: center !important;
			.item{
				width: 90vw !important;
				box-sizing: border-box;
				/deep/.el-card__body{
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.img{
					width: 90vw! important;
				}
			}
		}

	}
	.serial{
		width: 95vw !important;
		.bottom{
			.item{
				width: 100vw!important;
				margin-top: 0.5rem;
			}
		}
	}
}

</style>
