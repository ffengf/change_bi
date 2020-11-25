<template>
    <div class="problem">
		<ul>
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
		</ul>
		<el-button type="success" class="btn">{{ $t('更多') }}</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Item from "./item.vue"
@Component({
	components:{
		Item,
	}
})
export default class extends Vue {

}
</script>



<style lang='less' scoped>
.problem{
	width: 100%;
	display: flex;
	flex-direction: column;
	.btn{
		width: 10rem;
		align-self: center;
		margin-top: 2.5rem;
		margin-bottom: 6rem;
	}
}
</style>
