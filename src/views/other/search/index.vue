<template>
    <div style="width:100%;height:100%" v-loading="_loading">
		<div class="warpper" style="padding-bottom:0">
			<h1 class="top">총 {{ club_list.length }}개 모임이 검색되었습니다.</h1>
			<div class="line"></div>
			<ul class="box_list" v-if="club_list.length !==0">
				<el-card shadow="never" class="item" v-for="(ele) in club_list" :key="ele.id" @click.native="go_club(ele)">
					<img :src="ele.cover" alt="">
					<h1>{{ ele.title }}</h1>
					<h2>
						<span class="green" v-if="ele.status === 0">모집 중</span>
						<span class="blue" v-if="ele.status === 1">진행 중</span>
						<span class="orange" v-if="ele.status === 3">마감 임박</span>
						<span class="blue" v-if="ele.status === 4">모집대기</span>
						<span class="orange" v-if="ele.status === 5">모집 마감</span>
						<span>|</span>
						<span>{{ ele.start_time }} ~ {{ ele.end_time }}</span>
					</h2>
					<h3>{{ ele.subtitle }}</h3>
				</el-card>
			</ul>
			<div class="nones" v-else>
				<img src="@/assets/img/search.png" alt="">
				<h1>검색된 모임이 없습니다.</h1>
				<h2>모임명 또는 키워드를 확인하여 검색해 주세요.</h2>
			</div>
		</div>
		<div class="warpper" style="padding-top:2rem">
			<h1 class="top">총 {{ book_list.length }}개 작품이 검색되었습니다.</h1>
			<div class="line"></div>
			<ul class="box_list" v-if="book_list.length !==0">
				<el-card class="card" shadow="never" @click.native="go_info(ele.id,'search')" v-for="ele in book_list" :key="ele.id">
                    <img
                        :src="ele.cover"
                    />
                    <h1>{{ ele.title }}</h1>
                    <h2>
                        <span class="owner">{{ ele.author_name }} 작가</span>
                        <el-divider
                            direction="vertical"
                            class="lines_000"
                        ></el-divider>
						<span v-if="ele.status === 0" class="green">연재 중</span>
                        <span v-if="ele.status === 1" class="blue">완결</span>
                    </h2>
                </el-card>
			</ul>
			<div class="nones" v-else>
				<img src="@/assets/img/search.png" alt="">
				<h1>검색된 작품이 없습니다.</h1>
				<h2>작품명 또는 작가명을 확인하여 검색해 주세요.</h2>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { api_other, book_data, club_list } from "@/api";
import { More } from "@/mixin/more";
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class extends Vue{

	filter = {
		search:this.value
	}

	club_list:club_list[] = []
	book_list:book_data[] = []

	@Watch('value',{ immediate:true })
	watch_value(){
		this.filter.search = this.value
		this.clear_list()
	}

	clear_list(){
		this.club_list = []
		this.book_list = []
		this.get_list()
	}

	async get_list(){
		this._loading = true
		const { club_list,book_list } = await api_other.get_active(this.value).finally(()=>{
			this._loading = false
		})
		this.club_list = club_list
		this.book_list = book_list
	}

	go_club(ele:club_list){
		const type = ele.type === 0 ? 'creation' : 'apply'
		this.$router.push(`/club/${type}/info/${ele.id}`)
	}
	go_info(id:number,bread_date:string){
		this.$router.push(`/serial/book_info/${id}?bread_date=${bread_date}`)
	}

    get value() {
        return String(this.$route.query.value);
    }
}
</script>

<style lang="less" scoped>
.warpper{
	width: 100%;
	box-sizing: border-box;
	padding: 4rem 0 5rem 0;
	display: flex;
	flex-direction: column;
	.top{
		font-size: 16px;
	}
	.line{
		height: 4px;
		background: #324b9b;
	}
	.box_list{
		display: flex;
		flex-wrap: wrap;
		.item,.card{
			width: 33%;
			margin-top: 3.5rem;
			box-sizing: border-box;
			cursor: pointer;
			overflow: hidden;
			/deep/.el-card__body{
				padding: 0.5rem!important;
				box-sizing: border-box !important;
			}
			img{
				width: 15rem;
				height: 11rem;
			}
		}
		.item{

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
		.card {
			h1 {
				margin-top: 1.25rem;
				// font-family: NotoSansKR;
				font-size: 19px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.95px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 16rem;
			}
			h2 {
				margin: 0.65rem 0 0.76rem 0;
				font-family: NotoSansKR-Medium;
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.3px;
			}
			h3 {
				font-family: NotoSansKR-Regular;
				font-size: 13px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				letter-spacing: -0.33px;
				color: #858585;
				p {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: 16rem;
				}
			}
		}
	}
	.nones{
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 50vh;
		img{
			width: 8rem;
			height: 8rem;
			margin-top: 2rem;
		}
		h1{
			margin-top: 2rem;
			color: #324b9b;
			font-size: 24px;
		}
		h2{
			margin-top: 1rem;
			font-size: 14px;
		}
	}
	.more{
		margin-top: 2.5rem;
		margin-bottom: 6rem;
		width: 10rem;
		height: 2.2rem;
		align-self: center;
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
	.warpper{
		padding-top: 1rem;
	}
	.box_list{
		.item,.card{
			width: 100%!important;
			img{
				width: 100%!important;
				max-height: 20rem!important;
			}
		}
	}
}

</style>
