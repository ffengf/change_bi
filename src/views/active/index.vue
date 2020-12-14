<template>
    <div id="active" class="flexC">
        <div class="active_box bread_box w70vw min_width1000">
            <Rview />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import BoxHeader from "./header.vue"
type active_type = "1" | "2"

@Component({
    components: {
		Rview,
		BoxHeader
    },
})

export default class extends Vue {
	@Watch("active_type", { immediate: true })
    watch_route() {

    }

    get active_type(): active_type {
        const type: string = this.$route.params.active_type;
        if (type === "1" || type === "2") {
            return type;
        } else {
			const { path } = this.$route
			const reg = new RegExp(`${type}`,"g")
			this.$router.replace(path.replace(reg,'1'))
            return "1";
		}
    }
}
</script>



<style lang='less' scoped>
#active{
	margin-top: 3.75rem;
	.active_box{
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
