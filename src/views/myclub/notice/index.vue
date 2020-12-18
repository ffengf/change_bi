<template>
    <div>
		<List v-if="is_list" />
		<Info v-else />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import List from "./list.vue"
import Info from "./info.vue"
@Component({
	components:{
		List,
		Info,
	}
})
export default class extends Vue {

	get is_list(){
		return this.$route.query.id === undefined
	}


}
</script>



<style lang='less' scoped>
div{
	width: 100%;
}
</style>
