<template>
    <div class="notice">
		<List :keys.sync="key" v-if="key" />
		<Info :keys.sync="key" v-else />
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
	key = true

	@Watch('key')
	watch_key(key:boolean){
		const tabs = document.getElementById('customer_tab') as HTMLElement
		if(key){
			tabs.style.display = 'flex'
		}else{
			tabs.style.display = 'none'
		}
	}
}
</script>



<style lang='less' scoped>

</style>
