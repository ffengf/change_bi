<template>
	<div class="inner" v-html="value"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
	@Prop({ required:true })
	val !:string | null

	get value():string{
		if(typeof this.val === 'string'){
			return this.val
		}
		return ''
	}
}
</script>

<style lang="less" scoped>
.inner{
	width: 100%;
	word-break: break-all;
	line-height: 1.5rem;
	/deep/p{
		word-break: break-all;
		font-size: 14px;
	}
	/deep/img{
		max-width: 100%!important;
	}
	/deep/ *{
		max-width: 100%;
	}
}
</style>
