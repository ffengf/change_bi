<template>
    <div id="paper">
		<!-- <el-dialog
			title="수료증 발급"
			:visible.sync="key"
		>
			<div class="body" ref="body">
				<div class="postion">
					<h1 class="na">클럽창작과비평제장장장</h1>
					<h2 class="na">수료증</h2>
					<h3>name</h3>
					<img class="paper_line" src="@/assets/img/paper_line.jpg" alt="">
					<p>활동기간 2020. 03. 01 - 2021. 08. 022</p>
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
		</el-dialog> -->
		<el-dialog
			title="수료증 발급"
			:visible.sync="key"
			width="30%"
		>
			<div class="body" ref="body">
				<img :src="src" alt="">
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="save">인쇄하기</el-button>
				<el-button @click="key = false">닫기</el-button>
			</span>
		</el-dialog>
		<canvas id="canvas"></canvas>
		<!-- width="2128" height="3198" -->
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import jsPDF from "jspdf"
import { Loading } from "element-ui"
import { UserModule } from "@/store/user";

interface info {
	start_time:string
	end_time:string
	title:string
}

@Component
export default class extends Vue {
	key = false
	width = 27
	src = ''

	img_src():Promise<string[]>{
		return new Promise((resolve)=>{
			require(['@/assets/img/paper.jpg','@/assets/img/paper_line.jpg'],(...arg)=>{
				resolve(arg)
			})
		})
	}


	get user_name(){
		return UserModule.info?.real_name
	}

	async open(info:info){
		const load = this.load()
		const canvas = document.getElementById('canvas') as HTMLCanvasElement
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

		const img = new Image()
		const img_line = new Image()
		const [base,line] = await this.img_src()
		img.src = base
		img_line.src = line



		img.onload = ()=>{
			const width = img.width
			const height = img.height
			canvas.width = width
			canvas.height = height
			ctx.drawImage(img, 0, 0,2128,3198);

			ctx.font = '100px NotoSansKR'
			ctx.fillStyle = '#2b8e6d'
			ctx.textAlign = 'center';
			ctx.fillText(info.title,width/2,400)
			ctx.fillText('수료증',width/2,550)

			ctx.font = '60px NotoSansKR'
			ctx.fillStyle = '#2b8e6d'
			ctx.fillText(`${this.user_name}`,width/2,750)
			ctx.font = '60px NotoSansKR'
			ctx.fillStyle = '#2b8e6d'

			ctx.drawImage(img_line, width/2 - (img_line.width / 2), 770);

			ctx.font = '50px NotoSansKR'
			ctx.fillText('클럽 창작과비평제 1장',width/2,950)

			ctx.fillStyle = '#000'
			ctx.fillText(`활동기간 ${info.start_time} - ${info.end_time}`,width/2,1050)

			ctx.font = '60px NotoSansKR'
			ctx.fillText('위 사람은 창비에서 주관하는',width/2,1400)
			ctx.fillText(`'${info.title}'에 참여하여`,width/2,1500)
			ctx.fillText('모든 활동을 성실히 수행하였기에',width/2,1600)
			ctx.fillText('이 증서를 드립니다.',width/2,1700)


			const url = canvas.toDataURL('image/png', 1.0);
			this.key = true
			this.src = url
			load()
		}

	}


	save(){
		const close = this.load()
		if(this.is_phone){
			this.save_img(this.src)
		}else{
			this.save_pdf(this.src)
		}
		close()
	}


	save_img(url){
		const a = document.createElement('a')
		const event = new MouseEvent('click')
		a.download = 'output.png'
		a.href = url
		a.dispatchEvent(event)
	}

	save_pdf(url:string){
		const doc = new jsPDF('p', 'pt', 'a4');
		const canvas = document.getElementById('canvas') as HTMLCanvasElement
		doc.addImage(url, 'png', 0, 0, 595.28, 592.28/canvas.width * canvas.height - 50 );
		doc.save('output.pdf')
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
		}
	}
	/deep/.el-dialog{
		margin-top: 5vh!important;
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
		display: flex;
		justify-content: space-between;
		>*{
			height: 2.2rem;
			width: 45%;
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

#canvas{
	display: none;
}

</style>
<style>
.el-loading-mask{
	z-index: 10000!important;
}
</style>
