<template>
	<div id="other" class="flexC">
		<div class="other w70vw min_width1000 flexC">
			<Rview />
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue"
@Component({
	components:{
		Rview
	}
})
export default class extends Vue {
}
</script>



<style lang='less' scoped>

</style>
