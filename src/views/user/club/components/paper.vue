<template>
    <div id="paper">
		<el-dialog
			title="수료증 발급"
			:visible.sync="key"
			:width="`${width}%`"
		>
			<div class="body" ref="body">
				<div class="postion" :id="width === 90 && is_phone === false ? 'print' : ''">
					<h1 class="na">클럽창작과비평제장장장</h1>
					<h2 class="na">수료증</h2>
					<h3>name</h3>
					<img class="paper_line" src="@/assets/img/paper_line.jpg" alt="">
					<p>활동기간 2020. 03. - 2020. 08.</p>
					<h4>
						<p>위 사람은 창비에서 주관하는</p>
						<p>'클럽 창작과비평 제1장'에 참여하여</p>
						<p>모든 활동을 성실히 수행하였기에</p>
						<p>이 증서를 드립니다.</p>
					</h4>
				</div>
				<img src="@/assets/img/paper.jpg" alt="">
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="save">인쇄하기</el-button>
				<el-button @click="key = false">닫기</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Loading } from "element-ui"
@Component
export default class extends Vue {
	key = false
	width = 27

	open(...arg){
		this.key = true
	}

	async save(){
		const close = this.load()
		const { url,canvas } = await this.to_img_url()
		if(this.is_phone){
			this.save_img(url)
		}else{
			this.save_pdf(url,canvas)
		}
		close()
	}

	save_img(url){
		const a = document.createElement('a')
		const event = new MouseEvent('click')
		a.download = 'output.jpeg'
		a.href = url
		a.dispatchEvent(event)
	}

	save_pdf(url:string,canvas:HTMLCanvasElement){
		const doc = new jsPDF('p', 'pt', 'a4');
		doc.addImage(url, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );
		doc.save('output.pdf')
	}


	to_img_url():Promise<{ url:string,canvas:HTMLCanvasElement }>{
		return new Promise((resolve,reject)=>{
			this.$nextTick(()=>{
				html2canvas(this.$refs['body'] as HTMLElement).then((canvas)=>{
					const url = canvas.toDataURL('image/jpeg', 1.0);
					resolve({
						url,
						canvas
					})
				})
			})
		})
	}

	load(){
		this.key = false
		this.width = 90
		const loading = Loading.service({
			lock: true,
			text: 'wait......',
			background: 'rgba(0, 0, 0, 0.7)'
		});
		return () =>{
			this.width = 27
			this.key = true
			loading.close()
		}
	}



	get is_phone(){
		const sUserAgent = navigator.userAgent;
		if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
			return true
		}
		return false
	}
}
</script>

<style lang="less" scoped>
#paper{
	.body{
		position: relative;
		img{
			height: 20%;
			width: 100%;
		}
		.postion{
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			h1{
				width: 12rem;
				margin-top: 4rem;
				font-size: 1.5rem;
				color: #2b8e6d;
				font-weight: 700;
				text-align: center;
			}
			h2{
				margin-top: 0.5rem;
				font-size: 1.5rem;
				color: #2b8e6d;
				font-weight: 500;
				text-align: center;
			}
			h3{
				margin-top: 1.5rem;
			}
			.paper_line{
				width: 11rem;
				height: 1rem;
				object-fit: contain;
			}
			h4{
				margin-top: 1rem;
				text-align: center;
				line-height: 1.15rem;
			}
		}
	}
	/deep/.el-dialog{
		margin-top: 3vh!important;
		// min-width: 300px !important;
		// width: 300px!important;
	}
	/deep/.el-dialog__header{
		padding-top: 18px;
		padding-bottom: 16px;
		padding-left: 25px;
		background: #324b9b;
		.el-dialog__title{
			color: #fff;
		}
		.el-dialog__close{
			font-size: 23px;
			color: #fff;
		}
	}
	.dialog-footer{
		>*{
			height: 2.2rem;
			width: 7rem;
		}
	}
}


#paper{
	#print{
		h1{
			width: 24rem;
			margin-top: 16rem;
			font-size: 4.5rem;
		}
		h2{
			margin-top: 1.5rem;
			font-size: 4.5rem;
			color: #2b8e6d;
			font-weight: 500;
			text-align: center;
		}
		h3{
			font-size: 28px;
			margin-top: 1.5rem;
		}
		.paper_line{
			width: 24rem;
			height: 3rem;
			object-fit: contain;
		}
		>p{
			font-size: 18px;
		}
		h4{
			margin-top: 5rem;
			text-align: center;
			line-height: 1.5rem;
			font-size: 20px;
		}
	}
}



@media only screen and (max-width: 1024px) {
	.dialog-footer{
		>*{
			width: 5rem!important;
		}
	}
}
@media only screen and (max-width: 1024px) {
	.dialog-footer{
		>*{
			width: 5rem!important;
		}
	}
}
@media only screen and (max-width: 550px) {
	.postion{
		h1{
			font-size: 20px!important;
			margin-top: 1rem!important;
		}
		h2{
			font-size: 20px!important;
			margin-top: 0.5rem!important;
		}
		h3{
			margin-top: 0.5rem!important;
		}
		.paper_line{
			width: 11rem;
			height: 1rem;
			object-fit: contain;
		}
		h4{
			margin-top: 1rem;
			// line-height: 0.7rem!important;
		}
	}
}
@media only screen and (max-width: 350px) {
	.postion{
		h4{
			line-height: 0.7rem!important;
		}
	}
}
</style>
