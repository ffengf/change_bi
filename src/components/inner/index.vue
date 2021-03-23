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
	-webkit-user-select: none;
	-webkit-touch-callout: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	*{
		-webkit-user-select: none;
		-webkit-touch-callout: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	/deep/ *{
		-webkit-user-select: none;
		-webkit-touch-callout: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	/deep/ p{
		word-break: break-all;
    	font-size: 14px;
		span{
			font-family:'Nanum Gothic',sans-serif !important;
		}
	}
	/deep/ img{
		max-width: 100%!important;
	}
	/deep/ .table-bordered td, .table-bordered th{
		border: 1px solid #dee2e6;
	}
	/deep/ .table-bordered tr{
		width: 30rem;
		display: flex;
		justify-content: space-between;
		> * {
			flex: 1;
		}
	}
	/deep/ .table {
		width: 300px;
		margin-bottom: 1rem;
		color: #212529;
	}
}
</style>
