<template>
    <div id="service" class="flexC">
		<div class="w70vw min_width1000 service" v-loading="_loading">
			<el-menu class="menu" :default-active="type" mode="horizontal" @select="select">
				<el-menu-item index="content">서비스소개</el-menu-item>
				<el-menu-item index="use">서비스이용약관</el-menu-item>
				<el-menu-item index="privacy">개인정보취급방침</el-menu-item>
			</el-menu>
			<div class="mt20 inner" v-html="inner"></div>
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { api_service } from "@/api"

type route_type = "content" | "use" | "privacy"

@Component
export default class extends Vue {

	info = {
		content:'',
		use:'',
		privacy:''
	}

    get type(): route_type {
        if (["content", "use", "privacy"].includes(this.$route.params.type)) {
            return this.$route.params.type as route_type;
        }
		this.$router.replace("/service/content");
		return "content"
    }

    select(router: route_type) {
        this.$router.push(`/service/${router}`);
	}

	get inner(){
		return this.info[this.type]
	}

	async get_info(){
		this._loading = true
		this.info = await api_service.get_all().finally(()=>{
			this._loading = false
		})
	}

	created(){
		this.get_info()
	}
}
</script>



<style lang='less' scoped>
#service {
	margin: 2rem 0;
	.menu{
		display: flex;
	}
	/deep/img{
		width: 100%!important;
	}
}
</style>
