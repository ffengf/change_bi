<template>
    <div id="club" class="flexC">
		<div class="club w70vw min_width1000">
			<div class="bread_box">
				<Bread class="bread" />
			</div>
			<div class="line mt10 w70vw"></div>
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
#club{
	width: 100vw;
	margin-top: 3.75rem;
	.club{
		display: flex;
		flex-direction: column;
	}
	.line{
		background: #324b9b;
	}
	.body{
		margin-top: 2rem;
		width: 100%;
	}
}
</style>
