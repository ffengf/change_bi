<template>
    <div id="book_info" v-loading='loading'>
        <Bread :new_list="bread" />
        <div class="box_line"></div>
		<div class="warpper">
			<div class="left" v-html="info.detail"></div>
			<div class="right">
				<div class="name_box">
					<h1>{{ info.title }}</h1>
					<h2>
						<span>{{ info.author_name }} 작가</span>
						<span class="lines">|</span>
						<span v-if="info.status === 0" class="status_0">연재중</span>
                        <span v-if="info.status === 1" class="status_1">완결</span>
					</h2>
				</div>
				<div class="author_box">
					<h1>작품 소개</h1>
					<h2>{{ info.book_desc }}</h2>
					<div class="line"></div>
					<img :src="info.author_img">
					<h1>작가 소개</h1>
					<h2>{{ info.author_desc }}</h2>
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
					<el-button class="btn" type="success" @click="more">더 보기</el-button>
				</div>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";
import { api_serial, book_info,chapter_list } from "@/api";
import { takeLast } from "ramda";
@Component({
    components: {
        Bread,
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
		author_desc:""
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

    async get_info() {
        this.loading = true;
        this.info = await api_serial.get_info(this.id).finally(() => {
            this.loading = false;
        });
		this.bread.splice(2,1,{ title:this.info.title })
	}

	@Watch('page')
	async get_chapter_list(){
		if (this.list.length === this.count && this.list.length !== 0) {
            return this.$message.error("没有更多了");
		}
		this.loading = true
		const { count,results } = await api_serial.get_chapter({ book_id:this.id,page:this.page }).finally(()=>{
			this.loading = false
		})
		this.count = count
		this.list = results
	}

	more(){
		this.page ++
	}

	go_chapter(info_id:number){
		this.$router.push(`/serial/chapter_info/${this.id}/${info_id}?bread_date=${this.bread_date}`)
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
				height: 36.2rem;
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
					min-height: 6.5rem;
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
			> .right{
				margin-top: 3rem;
				img{
					align-self: center;
				}
			}
		}
	}
}
</style>
