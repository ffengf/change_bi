<template>
    <div>
		<Bread />
		<div class="box_line"></div>
		<div>
			{{ book_id }}
		</div>
		<div>
			{{ info_id }}
		</div>
		<div>
			{{ bread_date }}
		</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";
import { api_serial, date_info } from "@/api";
@Component({
    components: {
        Bread,
    },
})
export default class extends Vue {

	get book_id():number{
		return Number(this.$route.params.book_id)
	}

	get info_id():number{
		return Number(this.$route.params.info_id)
	}

	get bread_date():string {
        return this.$route.query.bread_date as string;
    }
}
</script>

<style lang="less" scoped>
