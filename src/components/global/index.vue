<template>
    <div id="page">
        <el-scrollbar style="height: 100%">
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
import { Vue, Component } from "vue-property-decorator";
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
    fn() {}

    created() {}
}
</script>

<style lang='less'>
#page {
	width: 100vw;
	height: 100vh;
    .el-header {
        height: 3.5rem !important;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
		background: #ffffff;
		z-index: 10;
    }
    .el-main {
        margin-top: 3.5rem;
		width: 100vw;
    }
    .el-footer {
        // height: 30vh !important;
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
