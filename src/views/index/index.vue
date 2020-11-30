<template>
    <div id="index">
        <div class="carousel">
            <el-carousel arrow="always" height="23rem">
                <el-carousel-item v-for="item in img_list" :key="item">
                    <el-image class="img" :src="item" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="flexC">
			<div class="news w70vw min_width1000 flexBC">
				<div class="left sm-down">
					<div class="line"></div>
					<h1>{{ $t('咨询') }}</h1>
					<div style="font-weight: 600;">一</div>
					<h2>{{ $t('查看最新资讯') }}</h2>
				</div>
				<div class="right">
					<div class="sm-up color_success">{{ $t('查看最新资讯') }}</div>
					<div class="position">
						<el-link icon="el-icon-plus" :underline="false" type="success">{{ $t('更多') }}</el-link>
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
					<h1>{{ $t('今日连载') }}</h1>
					<el-link icon="el-icon-plus" :underline="false" type="success">{{ $t('更多') }}</el-link>
				</div>
				<ul class="bottom">
					<el-card class="item" shadow="hover" v-for="(ele,index) in items" :key="index">
						<img class="img" :src="ele.url" />
						<h1>{{ ele.title }}</h1>
						<p>{{ ele.info }}</p>
					</el-card>
				</ul>
			</div>
		</div>
        <div class="img_box sm-down">
			<img class="img" src="@/assets/img/index_img.png"  />
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
@Component
export default class extends Vue {
    img_list = [
        "https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png",
        "https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png?",
        "https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png?a=1",
	];

	item = [
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"你好你好",
			info:"클럽 창작과비평 독서모임 1기 모집"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"你好你好",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"你好你好",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"你好你好",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		}
	]


	items = [
		{
			url:'http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png',
			title:"你好你好",
			info:"클럽 창작과비평 독서모임 1기 모집"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"你好你好",
			info:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好"
		},
		{
			url:'https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png',
			title:"你好你好",
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
        .img {
            width: 100%;
            height: 100%;
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
				width: 61px;
				height: 22px;
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
				font-size: 16px;
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
					margin-top: 0.5rem;
					font-size: 24px;
					font-weight: 550;
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
        .img {
            height: 6rem;
            object-fit: cover;
        }
    }
}

.img {
    width: 100%;
    height: 100%;
}


@media only screen and (max-width: 769px){

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
