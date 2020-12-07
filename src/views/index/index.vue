<template>
    <div id="index">
        <div class="carousel">
            <el-carousel arrow="always" height="23rem">
                <el-carousel-item class="items" v-for="ele in banner_list" :key="ele.id" @click="window.open(ele.link)">
					<!-- <p class="title">{{ ele.title }}</p> -->
                    <el-image class="img" :src="ele.image" @click="window.open(ele.link)" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="flexC">
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
						<!-- <el-link icon="el-icon-plus" :underline="false" type="success">{{ $t('更多') }}</el-link> -->
					</div>
					<div class="line"></div>
					<ul>
						<el-card class="item" shadow="hover" v-for="(ele,index) in item" :key="index">
							<li>
								<img class="img" :src="ele.url" />
								<h1>{{ ele.title }}</h1>
								<p>{{ ele.info }}</p>
							</li>
						</el-card>
					</ul>
				</div>
			</div>
		</div>
		<div class="flexC">
			<div class="serial w70vw min_width1000">
				<div class="top">
					<h1>오늘의 연재</h1>
					<el-link :underline="false" type="success"><em>+</em>  <em style="color:#000">더 보기</em></el-link>
				</div>
				<ul class="bottom">
					<el-card class="item" shadow="hover" v-for="(ele,index) in items" :key="index">
						<img class="img" :src="ele.url" />
						<h1>{{ ele.title }}</h1>
						<p class="kr-re">{{ ele.info }}</p>
					</el-card>
				</ul>
			</div>
		</div>
        <div class="img_box flexC">
			<div class="bb w70vw min_width1000">
				<img src="@/assets/img/index1.png"/>
				<img src="@/assets/img/index2.png"/>
				<img class="sm-down" src="@/assets/img/index3.png"/>
				<el-button type="success" class="btn">스위치 알아보기</el-button>
			</div>
		</div>
		<div class="carousel">
            <el-carousel arrow="always" height="23rem">
                <el-carousel-item v-for="(i,key) in item" :key="key">
                    <el-image class="img" :src="i.url" />
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { banner, api_home } from '@/api';
@Component
export default class extends Vue {

	banner_list:banner[] = []


	async get_banner_list(){
		this.banner_list = await api_home.get_banner()
	}

	async get_evaluation_list(){
		const a = await api_home.get_evaluation()
		console.log(a)
	}


	async created(){
		await Promise.all([
			this.get_banner_list(),
			this.get_evaluation_list()
		])
	}


	item = [
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"김민수 장편소설 ‘함께’ 13화",
			info:"클럽 창작과비평 독서모임 1기 모집"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"김민수 장편소설 ‘함께’ 13화",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"김민수 장편소설 ‘함께’ 13화",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"김민수 장편소설 ‘함께’ 13화",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		}
	]


	items = [
		{
			url:'http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png',
			title:"김민수 장편소설 ‘함께’ 13화",
			info:"클럽 창작과비평 독서모임 1기 모집"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"김민수 장편소설 ‘함께’ 13화",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"김민수 장편소설 ‘함께’ 13화",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		},
	]
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
			width: 13rem;
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
					height: 14rem;
					margin-top: 1rem;
					cursor: pointer;
					display: flex;
					flex-direction: column;
					.img{
						width: 100%;
						height: 6.5rem;
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
}

.img {
    width: 100%;
    height: 100%;
}


@media only screen and (max-width: 769px){
	.carousel {
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
