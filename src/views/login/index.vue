<template>
    <div id="login" class="flexC">
		<div class="w75vw min_width1100 login_div">
			<div class="img_box sm-down">
				<img src="@/assets/img/login.png" alt="" srcset="">
			</div>
			<div class="line sm-down"></div>
			<div class="box">
				
				1231111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
				123
				123
				123v123
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>
				<br>
				<br>

				<br>
				<br>
				<br>

				<br>
			</div>
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
	.login_div{
		display: flex;
		padding:2rem 0;
	}
	.img_box{
		height:600px;
		width:auto;
		box-sizing: border-box;
		img{
			height: 100%;
			object-fit: contain;
		}
	}
	.box{
		width: 50%;
		height: 100%;
	}
	.line{
		height:auto;
		width:1px;
		background:#ebebeb;
	}
}
@media only screen and (max-width: 768px){
	.min_width1100 {
		min-width:auto!important;
	}
	.w75vw{
		width:100vw;
	}
}
</style>
