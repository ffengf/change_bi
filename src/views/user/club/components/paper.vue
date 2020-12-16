<template>
    <div id="paper">
		<el-dialog
			title="수료증 발급"
			:visible.sync="key"
			width="25%"
		>
			<div class="body">
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

@Component
export default class extends Vue {
	key = true

	open(...arg){
		this.key = true
	}

	save(){

	}
}
</script>

<style lang="less" scoped>
#paper{
	.body{
		img{
			height: 20%;
			width: 100%;
		}
	}
	/deep/.el-dialog{
		margin-top: 3vh!important;
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
@media only screen and (max-width: 1024px) {
	.dialog-footer{
		>*{
			width: 5rem!important;
		}
	}
}
</style>
