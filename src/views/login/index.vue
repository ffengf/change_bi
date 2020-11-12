<template>
    <div id="login" class="pd5">
		<div class="img_box hidden-md-and-down">
			<img src="@/assets/img/login.png" alt="" srcset="">
		</div>
		<div class="box">
			123
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {

}
</script>

<style lang='less' scoped>
#login{
	box-sizing: border-box;
	height: 35rem;
	width: 100vw;
	display: flex;
	padding-top: 2rem;
	padding-bottom: 2rem;
	.img_box{
		height: 100%;
		width: 50%;
		box-sizing: border-box;
		padding: 0 8rem;
		border-right: 1px solid #ebebeb;
		img{
			height: 100%;
			width: 100%;
		}
	}
	.box{
		width: 50%;
		height: 100%;
	}
}
</style>
