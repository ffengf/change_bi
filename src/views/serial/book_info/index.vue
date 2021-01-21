<template>
    <div id="book_info" v-loading='_loading'>
        <Bread :new_list="bread" />
        <div class="box_line"></div>
		<div class="warpper">
			<!-- <div class="left inner" v-html="info.detail"></div> -->
			<Inner class="left" :val="info.detail" />
			<div class="right">
				<div class="name_box">
					<h1>{{ info.title }}</h1>
					<h2>
						<span>{{ info.author_name }} 작가</span>
						<span class="lines">|</span>
						<span v-if="info.status === 0" class="status_0">연재 중</span>
                        <span v-if="info.status === 1" class="status_1">완결</span>
					</h2>
				</div>
				<div class="author_box">
					<h1>작품 소개</h1>
					<h2>{{ info.book_desc }}</h2>
					<div class="line"></div>
					<img :src="info.author_img">
					<h1>작가 소개</h1>
					<h2 id="chapters_box">{{ info.author_desc }}</h2>
				</div>
				<div class="chapters_box">
					<h1>연재 읽기</h1>
					<ul>
						<li v-for="(ele) in list" :key="ele.id" @click="go_chapter(ele.id)">
							<el-tooltip placement="top">
								<div slot="content">
									{{ ele.number }}화 <br/>
									{{ ele.title }}
								</div>
								<div class="left">
									<div>{{ ele.number }}화</div>
									<div>|</div>
									<div>{{ ele.title }}</div>
								</div>
							</el-tooltip>
							<div class="right">{{ ele.create_time }}</div>
						</li>
					</ul>
					<el-button class="btn" type="success" @click="more" :disabled="disabled">더 보기</el-button>
					<el-button class="btn" type="primary" @click="winopen" v-if="info.link !== null">서점에서 확인하기</el-button>
				</div>
				<div class="zan">
					<div class="zan_left">
						<img v-if="info.is_like === 0" @click="is_like(1)" src="@/assets/img/un_zan.png" alt="" >
						<img v-else src="@/assets/img/is_zan.png" @click="is_like(0)" alt="">
						<span>{{ info.like_num }} 명이 좋아합니다.</span>
					</div>
					<div class="zan_right">
						<ShareNetwork
							network="Facebook"
							:title="info.book_desc"
							:url="share_url"
						>
							<img src="@/assets/img/fa.png" alt="">
						</ShareNetwork>
						<ShareNetwork
							network="Twitter"
							:title="info.book_desc"
							:url="share_url"
						>
							<img src="@/assets/img/tw.png" alt="">
						</ShareNetwork>
					</div>
				</div>
			</div>
		</div>
		<a class="look sm-up" href="#chapters_box">연재읽기</a>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";
import Inner from "@/components/inner/index.vue"
import { api_serial, book_info,chapter_list } from "@/api";
import { takeLast } from "ramda";

@Component({
    components: {
		Bread,
		Inner,
    },
})
export default class extends Vue {

	page = 1
	count = 0
	list:chapter_list[] = []

    info: book_info = {
        id: 0,
        title: "",
        author_img: "",
        status: 0,
        author_name: "",
		chapters: [],
		book_desc:"",
		detail:"",
		author_desc:"",
		link:null,
		like_num:0,
		is_like:0,
    };

    bread = [
        {
			title: "매일연재",
			to:'/serial',
        },
        {
			title: this.bread_date,
			to:'/serial',
        },
        {
			title: this.info.title,
        },
    ];

    get id() {
        return Number(this.$route.params.id);
    }

    get bread_date() {
        return this.$route.query.bread_date;
	}

	get share_url(){
		const base = 'https://api.changbi.com/book/detail'
		return `${base}/${this.info.id}`
	}

    async get_info() {
        this._loading = true;
        const info:book_info = await api_serial.get_info(this.id).finally(() => {
            this._loading = false;
		});
		this.info = info;
		this.bread.splice(2,1,{ title:this.info.title })
	}

	@Watch('page')
	async get_chapter_list(){
		if (this.list.length === this.count && this.list.length !== 0) {
            return this.$message.error("추가 내용이 없습니다.");
		}
		this._loading = true
		const { count,results } = await api_serial.get_chapter({ book_id:this.id,page:this.page }).finally(()=>{
			this._loading = false
		})
		this.count = count
		this.list = [...this.list,...results]
	}

	more(){
		this.page ++
	}

	go_chapter(info_id:number){
		this.$router.push(`/serial/chapter_info/${this.id}/${info_id}?bread_date=${this.bread_date}`)
	}

	get disabled():boolean{
		return this.count <= this.list.length
	}

	winopen(){
		window.open(this.info.link as string)
	}

	async is_like(action:0|1){
		this._loading = true
		await api_serial.post_like(this.info.id,action).finally(()=>{
			this._loading = false
		})
		this.info = {
			...this.info,
			like_num:action === 0 ? this.info.like_num - 1 : this.info.like_num + 1,
			is_like:action
		}
	}

    created() {
		this.get_info();
		this.get_chapter_list()
    }
}
</script>

<style lang="less" scoped>
#book_info{
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 6rem;
	.box_line{
		margin-bottom: 1.5rem;
	}
	.warpper{
		width: 100%;
		display: flex;
		justify-content: space-between;
		.left{
			width: 31rem;
		}
		.right{
			width: 16rem;
			.name_box{
				height: 5.25rem;
				background: #324b9b;
				color: #fff;
				h1{
					font-size: 22px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -1.1px;
					text-align: left;
					margin: 0 0 0.5rem 1.4rem;
					padding-top: 1rem;
				}
				h2{
					font-size: 14px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.7px;
					text-align: left;
					margin-left: 1.4rem;
					.lines{
						margin: 0 0.4rem;
					}
				}
			}
			.author_box{
				padding: 1.5rem ;
				border: 1px solid #dfdfdf;
				border-bottom: none;
				border-top: none;
				display: flex;
				flex-direction: column;
				h1{
					margin-bottom: 1rem;
					font-size: 16px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.8px;
				}
				h2{
					font-size: 13px;
					font-weight: normal;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.65px;

				}
				.line{
					height: 1px;
					margin: 1.5rem 0 1rem 0;
					background: #dfdfdf;
				}
				img{
					height: 13rem;
					width: 13rem;
					margin-bottom: 1.5rem;
				}
			}
			.chapters_box{
				border: 3px solid #3fa535;
				padding: 1.5rem;
				h1{
					font-size: 20px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -1px;
					color: #3fa535;
				}
				ul{
					margin: 1.5rem 0;
					li{
						display: flex;
						justify-content: space-between;
						height: 2rem;
						cursor: pointer;
						border-bottom: 1px solid #3fa535;
						align-items: center;
					}
					.left{
						display: flex;
						div{
							font-family: NotoSansKR;
							font-size: 13px;
							font-weight: 500;
							font-stretch: normal;
							font-style: normal;
							letter-spacing: -0.7px;
						}
						div:nth-of-type(1){
							width: 30px;
							color: #324b9b;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							text-align: right;
						}
						div:nth-of-type(2){
							margin: 0 0.3rem;
						}
						div:nth-of-type(3){
							display: block;
							width: 130px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
					.right{
						font-family: NotoSansKR;
						font-size: 13px;
						font-weight: 500;
						font-stretch: normal;
						font-style: normal;
						letter-spacing: -0.7px;
						text-align: right;
						color: #858585;
					}
				}
				.btn{
					width: 100%;
					&:nth-of-type(2){
						margin-left: 0;
						margin-top: 1rem;
					}
				}
			}
			.zan{
				display: flex;
				justify-content: space-between;
				margin-top: 0.5rem;
				img{
					width: 1.7rem;
					height: 1.7rem;
					cursor: pointer;
				}
				.zan_left{
					display: flex;
					align-items: center;
					span{
						font-size: 14px;
						margin-left: 0.5rem;
					}
				}
				.zan_right{
					> * {
						margin: 0 0.2rem;
					}
				}
			}
		}
	}
}
.status_0{
	color: #3fa535;
}
.status_1{
	color: #fff;
}
@media only screen and (max-width: 1024px){
	#book_info{
		.warpper{
			flex-wrap: wrap;
			.left,.right{
				width: 90vw!important;
			}
			> .left{
				margin-top: 3rem;
				order: 1;
			}
			> .right{
				order: 0;
				img{
					align-self: center;
				}
			}
		}
		.look{
			position: fixed;
			z-index: 1000;
			bottom: 2vh;
			width: 90vw;
			height: 2.2rem;
			display: block;
			text-align: center;
			line-height: 2.2rem;
			border-color:#3fa535;
			background: #3fa535;
			color: #fff;
			text-decoration:none;
			font-size: 14px;
		}
	}
}
</style>
