<template>
    <div class="notice" v-loading='loading'>
        <List :keys.sync="key" :list="list" :page.sync="page" v-if="key" :what.sync="what" :disabled="disabled" />
        <Info :keys.sync="key" :list="list" :page.sync="page" :what.sync="what" :count="count" v-else />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import List from "./list.vue";
import Info from "./info.vue";
import { api_customer, notice } from "../../../api/customer";
@Component({
    components: {
        List,
        Info
    }
})
export default class extends Vue {
    key = true;

    page = 1;
    count = 0;

	what = 0

	list: notice[] = [];

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
        const tabs = document.getElementById("customer_tab") as HTMLElement;
        tabs.style.display = "flex";
    }

    @Watch("page")
    async get_list() {
        if (this.list.length === this.count && this.list.length !== 0) {
            return this.$message.error("没有更多了");
		}
		this.loading = true
        const { results, count } = await api_customer.get_notice({
            page: this.page
        }).finally(()=>{
			this.loading = false
		})
        this.list = [...this.list, ...results];
        this.count = count;
	}

	@Watch('what')
	watch_what(what:number){
		if(what + 1 > this.list.length){
			this.page ++
		}
	}

    created() {
        this.get_list();
	}

	get disabled():boolean{
		return this.count <= this.list.length
	}
}
</script>



<style lang='less' scoped>
</style>
