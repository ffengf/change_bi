<template>
    <div id="app">
        <Rview />
    </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue"
@Component({
	components:{
		Rview
	}
})
export default class extends Vue {

}
</script>

<style lang="less" scoped>
#app {
	overflow: hidden;
	.div{
		position: absolute;
		top: 0;
		z-index: 10000;
	}
}
.slide-fade-enter-active {
    transition: all 0.1s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
