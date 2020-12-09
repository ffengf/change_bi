<template>
    <div class="warpper">
		<button>123</button>
		<div class="box">heelo wolrd</div>
		<div class="box">heelo wolrd</div>
		<div class="box">heelo wolrd</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue"
@Component({
    components: {
		Rview,
		Bread,
	},
})
export default class extends Vue {

}
</script>



<style lang='less' scoped>

button{
	position: absolute;
	right: 0;
	top: -2.0rem;
}
</style>
