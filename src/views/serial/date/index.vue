<template>
    <div>
		<Bread :new_list="new_list" />
		<div class="box_line"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue"
@Component({
    components: {
		Bread,
	},
})
export default class extends Vue {
	new_list = [{ title:'123' }]
}
</script>



<style lang='less' scoped>

</style>
