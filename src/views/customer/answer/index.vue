<template>
    <div class="list" v-loading="loading">
        <List :list="list" :page.sync="page" :type.sync="type" :what.sync="what" v-if="type === 'list'" />
        <Info :list="list" :page.sync="page" :type.sync="type" :what.sync="what" :count="count" v-if="type === 'info'" />
        <Question v-if="type === 'question'" :type.sync="type" @clear="clear" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import List from "./list.vue";
import Info from "./info.vue";
import Question from "./question.vue";
import { qa,api_customer } from "@/api";
type type = "list" | "info" | "question";

@Component({
    components: {
        List,
        Info,
        Question,
    },
})
export default class extends Vue {
    type: type = "list";


	page = 1;
    count = 0;

	what = 0

	list: qa[] = [];

	@Watch("page")
    async get_list() {
        if (this.list.length === this.count && this.list.length !== 0) {
            return this.$message.error("没有更多了");
		}
		this.loading = true
        const { results, count } = await api_customer.get_qa({
            page: this.page
        }).finally(()=>{
			this.loading = false
		})
        this.list = [...this.list, ...results];
        this.count = count;
    }

    created() {
        this.get_list();
	}

	clear(){
		this.list = []
		this.page = 1
		this.get_list()
	}

	@Watch('what')
	watch_what(what:number){
		if(what + 1 > this.list.length){
			this.page ++
		}
	}


    @Watch("type")
    watch_type(type: type) {
        const tabs = document.getElementById("customer_tab") as HTMLElement;
        if (type === "list") {
            tabs.style.display = "flex";
        } else {
            tabs.style.display = "none";
        }
	}

	destroyed(){
		const tabs = document.getElementById("customer_tab") as HTMLElement;
		tabs.style.display = "flex";
	}
}
</script>



<style lang='less' scoped>
.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .top_btn {
        align-self: flex-end;
        height: 2rem;
        width: 7rem;
    }
    .box {
        width: 100%;
        height: 4.2rem;
        border-bottom: 1px solid #324b9b;
        margin-top: 1rem;
        .top {
            span {
                font-size: 11.5px;
            }
            .lines {
                display: inline-block;
                height: 0.5rem;
                width: 1px;
                background: #000;
                margin: 0 0.3rem;
            }
        }
        h1 {
            font-size: 16.5px;
            font-weight: 500;
            margin-top: 0.3rem;
            cursor: pointer;
        }
        h1:hover {
            color: #324b9b;
        }
    }
    .btn {
        width: 10rem;
        align-self: center;
        margin-top: 2.5rem;
        margin-bottom: 6rem;
    }
}
</style>
