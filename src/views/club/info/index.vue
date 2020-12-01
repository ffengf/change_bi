<template>
    <div>
		info:{{ id }}
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {
	get id(){
		return this.$route.params.id
	}

	@Watch('id')
	async get_info(){
		console.log(this.id)
	}

	created(){

	}
}
</script>



<style lang='less' scoped>

</style>
