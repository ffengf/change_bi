<template>
    <div id="serial" class="flexC">
		<div class="w70vw min_width1000 serial_box">
			<Rview />
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
@Component({
    components: {
		Rview,
	},
})
export default class extends Vue {

}
</script>



<style lang='less' scoped>
#serial{
	margin-top: 3.75rem;
	.serial_box{
		/deep/.box_line{
			background: #324b9b;
			height: 4px;
		}
		/deep/.bread{
			margin-bottom: 0.75rem;
		}
	}
}
</style>
