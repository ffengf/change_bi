<template>
    <div id="active_list">
		<BoxHeader :new_list="bread" />
		<ul class="warpper">
			<li class="item">
				<img src="@/assets/img/club/1.png">
				<div class="top">
					<h2>강연 초대</h2>
					<h1>홍길순 작가의 스위치 독점 강연 문학 감성기르는 방법과 실전</h1>
				</div>
				<div class="bottom">
					<div class="left">
						<img src="@/assets/img/user_green.png">
						<p>스위치</p>
					</div>
					<div class="right">2020-05-01 작성</div>
				</div>
			</li>

		</ul>
		<el-button type="success" class="more" >더 보기</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";
import BoxHeader from "../header.vue"
import { More } from "@/mixin/more";
@Component({
	components:{
		Bread,
		BoxHeader,
	}
})
export default class extends Vue {
	bread = [
		{
			to:'/active/1/list',
			title:'이벤트'
		},
		{
			title:''
		}
	]

	@Watch("active_type", { immediate: true })
    watch_route() {
        this.bread.splice(1,1,{
			title:this.active_type === '1' ? '서평단 신청': '강연 초대'
		})
    }

    get active_type() {
        const type: string = this.$route.params.active_type;
        if (type === "1" || type === "2") {
            return type;
        } else {
            return "1";
		}
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
					color: #3fa535;
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
