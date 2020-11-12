<template>
    <div id="index">
        <div class="carousel">
            <el-carousel arrow="always">
                <el-carousel-item v-for="item in img_list" :key="item">
                    <img class="img" :src="item" />
                </el-carousel-item>
            </el-carousel>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
    img_list = [
        "https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png",
        "https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png?",
        "https://cdn.zeplin.io/5fa0b6fe5d3b993d0a750c0e/assets/9A44DF96-CC49-4875-B4BD-25AD8F57AA83.png?a=1",
    ];
}
</script>

<style lang="less" scoped>
#index {
    height: 200vh;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
