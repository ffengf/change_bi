<template>
    <div class="login_warpper">
        <h1>{{ $t("登录") }}</h1>
        <div>
            <el-form ref="form" :model="info">
                <el-form-item prop="name">
                    <el-input v-model="info.name"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
    info = {
		name:''
	};
}
</script>

<style lang="less" scoped>
