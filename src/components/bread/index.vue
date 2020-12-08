<template>
    <el-breadcrumb class="bread kr-re" separator=">">
        <el-breadcrumb-item to="/">
			<img src="@/assets/img/bread.png">
		</el-breadcrumb-item>
        <template v-if="new_list === null">
			<template v-for="(item, index) in list">
				<el-breadcrumb-item
					:key="index"
					:to="item.path"
					v-if="item.meta.title !== '' && item.meta.title !== undefined"
				>
					<span>{{ item.meta.title }}</span>
				</el-breadcrumb-item>
			</template>
		</template>
		<template v-else>
			<template v-for="(item, index) in new_list">
				<el-breadcrumb-item
					:key="index"
					:to="item.to"
				>
					<span>{{ item.title }}</span>
				</el-breadcrumb-item>
			</template>
		</template>
    </el-breadcrumb>
</template>

<script lang='ts'>
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RouteRecord } from "vue-router";

interface new_list {
	title:string
	to:string
}

@Component
export default class extends Vue {
    list: RouteRecord[] = [];

    @Watch("$route")
    getRouterList() {
        this.list = this.$route.matched.slice(1);
	}

	@Prop({ type:Array,required:false,default:null })
	new_list !: new_list[] | null

    created() {
        this.getRouterList();
	}
}
</script>

<style lang="less" scoped>
span {
    color: #000;
}
.bread{
	display: flex;
	align-items: flex-end;
	img{
		height: 18px;
		width: 18px;
		margin-bottom: -2px;
	}
	/deep/.el-breadcrumb__separator{
		color: #000!important;
		font-size: 15px !important;
	}
}
</style>
