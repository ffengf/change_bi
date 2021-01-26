<template>
    <div class="notice" v-loading='_loading'>
        <keep-alive>
			<List v-if="id === null" />
			<Info :id="id" v-else />
		</keep-alive>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import List from "./list.vue";
import Info from "./info.vue";
@Component({
    components: {
        List,
        Info
    }
})
export default class extends Vue {


    @Watch("key")
    watch_key(key: boolean) {
		const tabs = document.getElementById("customer_tab") as HTMLElement;
        if (key) {
            tabs.style.display = "flex";
        } else {
            tabs.style.display = "none";
        }
    }

    destroyed() {
		const tabs = document.getElementById("customer_tab") as HTMLElement | null;
		if(tabs === null){
			return
		}
        tabs.style.display = "flex";
	}

	get id(){
		return this.$route.query.id ?  +this.$route.query.id : null
	}
}
</script>



<style lang='less' scoped>
</style>
