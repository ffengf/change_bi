<template>
    <div class="answer">
		<el-button type="success" class="top_btn">{{ $t('提问') }}</el-button>
		<div class="box">
			<div class="top">
				<span class="color_success">#3fa535</span>
				<span class="lines">2020.05.01</span>
			</div>
			<h1>xxxxxxxxxxxxxxxxxxxxxxxxx</h1>
		</div>
		<div class="box">
			<div class="top">
				<span class="color_success">#3fa535</span>
				<span class="lines">2020.05.01</span>
			</div>
			<h1>xxxxxxxxxxxxxxxxxxxxxxxxx</h1>
		</div>
		<div class="box">
			<div class="top">
				<span class="color_success">#3fa535</span>
				<span class="lines">2020.05.01</span>
			</div>
			<h1>xxxxxxxxxxxxxxxxxxxxxxxxx</h1>
		</div>
		<div class="box">
			<div class="top">
				<span class="color_success">#3fa535</span>
				<span class="lines">2020.05.01</span>
			</div>
			<h1>xxxxxxxxxxxxxxxxxxxxxxxxx</h1>
		</div>
		<div class="box">
			<div class="top">
				<span class="color_primary">#324b9b</span>
				<span class="lines">2020.05.01</span>
			</div>
			<h1>xxxxxxxxxxxxxxxxxxxxxxxxx</h1>
		</div>
		<div class="box">
			<div class="top">
				<span class="color_primary">#324b9b</span>
				<span class="lines">2020.05.01</span>
			</div>
			<h1>xxxxxxxxxxxxxxxxxxxxxxxxx</h1>
		</div>
		<div class="box">
			<div class="top">
				<span class="color_primary">#324b9b</span>
				<span class="lines">2020.05.01</span>
			</div>
			<h1>xxxxxxxxxxxxxxxxxxxxxxxxx</h1>
		</div>
		<el-button type="success" class="btn">{{ $t('更多') }}</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {

}
</script>



<style lang='less' scoped>
.answer{
	width: 100%;
	display: flex;
	flex-direction: column;
	.top_btn{
		align-self: flex-end;
		height: 2rem;
		width: 7rem;
	}
	.box{
		width: 100%;
		height: 3rem;
		border-bottom: 1px solid #324b9b;
		margin-top: 0.5rem;
		cursor: pointer;
		.top{
			span{
				font-size: 11.5px;
			}
			.lines{
				border-left: 1px solid #000;
				margin-left: 0.3rem;
				padding-left: 0.3rem;
			}
		}
		h1{
			font-size: 16.5px;
			font-weight: 500;
			margin-top: 0.01rem;
		}
	}
	.btn{
		width: 10rem;
		align-self: center;
		margin-top: 2.5rem;
		margin-bottom: 6rem;
	}
}
</style>
