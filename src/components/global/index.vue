<template>
    <div id="page">
        <el-scrollbar ref="scrollbar" style="height: 100%">
            <el-container class="container">
                <el-header>
                    <Header />
                </el-header>
                <el-main>
                    <Rview />
                </el-main>
                <el-footer>
                    <Footer />
                </el-footer>
            </el-container>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Header from "./header.vue";
import Rview from "@/components/routerView/index.vue";
import Footer from "./footer.vue";
@Component({
    components: {
        Header,
        Rview,
        Footer,
    },
})
export default class extends Vue {
	@Watch('$route')
	watch(){
		(this.$refs['scrollbar'] as any).wrap.scrollTop = 0
	}
}
</script>

<style lang='less' scoped>
#page {
	width: 100vw;
	height: 100vh;
	.container{
		width: 100%;
		height: 100%;
	}
    .el-header {
        height: 3.5rem !important;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
		background: #ffffff;
		z-index: 101;
    }
    .el-main {
        margin-top: 3.5rem;
		width: 100vw;
    }
    .el-footer {
        width: 100%;
    }
}
</style>
<style lang="less">
#page {
	.el-scrollbar__bar{
		z-index: 1000;
	}
    .el-scrollbar /deep/ {
        .el-scrollbar__wrap {
            overflow-x: hidden !important;
        }
    }
}
</style>
