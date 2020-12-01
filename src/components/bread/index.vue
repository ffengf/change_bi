<template>
    <el-breadcrumb>
        <el-breadcrumb-item to="/"
            ><i class="el-icon-s-home"></i
        ></el-breadcrumb-item>
        <template v-for="(item, index) in list">
            <el-breadcrumb-item
                :key="index"
                v-if="item.meta.title !== '' && item.meta.title !== undefined"
            >
				<span>{{ item.meta.title }}</span>
			</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { RouteRecord } from "vue-router";

@Component
export default class extends Vue {
    list: RouteRecord[] = [];

    @Watch("$route")
    getRouterList() {
        this.list = this.$route.matched.slice(1);
    }

    created() {
        this.getRouterList();
    }
}
</script>

<style scoped>
span {
    color: #000;
}
</style>
