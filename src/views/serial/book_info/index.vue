<template>
    <div>
		bokk
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

}
</script>

<style lang="less" scoped>
