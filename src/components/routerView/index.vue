<template>
    <div>
		<!-- <transition name="fade-page" mode="out-in"> -->
			<!-- <keep-alive>
				<router-view v-if="$route.meta.cache"></router-view>
			</keep-alive> -->
			<router-view></router-view>
		<!-- </transition> -->
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {}
</script>

<style scoped>
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
