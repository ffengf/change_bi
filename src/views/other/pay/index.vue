<template>
    <div id="pay" class="flexC">
		{{ pay_type }}
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {

	get pay_type():string{
		return this.$route.params.type
	}
}
</script>



<style lang='less' scoped>
#pay {
	width: 100%;
}
</style>
