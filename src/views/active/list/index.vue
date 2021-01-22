<template>
    <div id="active_list" v-loading="_loading">
		<BoxHeader :new_list="bread" />
		<ul class="warpper">
			<li class="item" v-for="(ele,index) in list" :key="index" @click="move(ele.id)">
				<img :src="ele.cover">
				<div class="top">
					<h2>
						<span class="green" v-if="ele.status === 0">모집 중</span>
						<span class="blue" v-if="ele.status === 3">마감임박</span>
						<span class="orange" v-if="ele.status === 5">모집마감</span>
						<span v-if="ele.status !== 5" style="margin:0 0.3rem">|</span>
						<span v-if="ele.status !== 5">{{ ele.start_time }} ~ {{ ele.end_time }}</span>
					</h2>
					<h1>{{ ele.title }}</h1>
				</div>
				<div class="bottom">
					<div class="left">
						<img src="@/assets/img/active.png">
						<p>스위치</p>
					</div>
					<div class="right">{{ ele.create_time }} 작성</div>
				</div>
			</li>

		</ul>
		<el-button type="success" class="more" @click="more" :disabled="disabled">더 보기</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";
import BoxHeader from "../header.vue"
import { More } from "@/mixin/more";
import { api_active } from "@/api";
@Component({
	components:{
		Bread,
		BoxHeader,
	}
})
export default class extends More(api_active.get_list,false) {
	bread = [
		{
			to:'/active/1/list',
			title:'이벤트'
		},
		{
			title:''
		}
	]

	filter = {
		type: '0'
	}

	@Watch("active_type",{ immediate:true })
    watch_route() {
		this.filter.type = this.active_type
		this.clear_list()
        this.bread.splice(1,1,{
			title:this.active_type === '1' ? '서평단 신청': '강연 초대'
		})
    }

    get active_type() {
		if(!/^\/active\/\d{1}\/list$/.test(this.$route.path)){
			return this.filter.type
		}
		const type: string = this.$route.params.active_type;
        if (type === "1" || type === "2") {
            return type;
        } else {
            return this.filter.type;
		}
    }

	move(id:number){
		this.$router.push(`/active/${this.active_type}/info/${id}`)
	}

}
</script>



<style lang='less' scoped>
#active_list{
	display: flex;
	flex-direction: column;
	.warpper{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		&::after{
			content: '';
			width: 15.85rem;
			display: block;
		}
		.item{
			cursor: pointer;
			width: 15.85rem;
			height: 18rem;
			box-sizing: border-box;
			margin-bottom: 3.8rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			>img{
				width: 100%;
				height: 11rem;
				object-fit: cover;
			}
			.top{
				h2{
					// color: #3fa535;
					font-family: NotoSansKR;
					font-size: 12px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.3px;
				}
				h1{
					margin-top: 0.7rem;
					font-family: NotoSansKR;
					font-size: 19px;
					font-weight: 500;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: -0.95px;
					height: 2.4rem;
				}
			}
			.bottom{
				margin-top: 0.5rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left{
					display: flex;
					align-items: center;
					img{
						height: 1.2rem;
						width: 1.2rem;
					}
					p{
						margin-left: 0.25rem;
						font-family: NotoSansKR;
						font-size: 13px;
						font-weight: normal;
						font-stretch: normal;
						font-style: normal;
						letter-spacing: -0.33px;
						color: #858585;
					}
				}
				.right{
					font-family: NotoSansKR;
					font-size: 13px;
					font-weight: normal;
					font-stretch: normal;
					font-style: normal;
					letter-spacing: normal;
					color: #858585;
				}
			}
		}
	}
	.more{
		margin-top: 4.25rem;
		margin-bottom: 7rem;
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
@media only screen and (max-width: 1024px){
	.item{
		width: 45%!important;
	}
}
@media only screen and (max-width: 768px){
	.item{
		width: 100%!important;
	}
}

</style>
