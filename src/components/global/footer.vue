<template>
    <div id="footer">
		this is footer
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {

}
</script>

<style scoped>
#footer{
	height: 100%;
	width: 100%;
	background: #ccc;
}
</style>
