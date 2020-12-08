<template>
    <div id="user" class="flexC">
		<div class="user">
			<div class="bread_box w70vw min_width1000">
				<Bread class="bread" />
			</div>
			<div class="line mt10"></div>
			<div class="body">
				<Rview />
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue"
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends Vue {

}
</script>



<style lang='less' scoped>
#user{
	width: 100vw;
	margin-top: 3.75rem;
	.user{
		display: flex;
		flex-direction: column;
		align-items: center;

	}
	.line{
		background: #324b9b;
		width: 50rem;
	}
	.body{
		margin-top: 2rem;
		width: 100%;
	}
}
@media only screen and (max-width: 1025px){
	#club{
		width:100%;
		.line{
			width:100%;
		}
	}
}
</style>
