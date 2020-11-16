<template>
    <div class="login_warpper">
        <h1>注册</h1>
        <h2>
            <em>가입 아이디를</em>확인해 주세요.
        </h2>
        <div>
			<TsForm />
		</div>
    </div>
</template>

<script lang="ts">


import TsForm from "@/components/form/index.vue"
import { Vue, Component } from "vue-property-decorator";
@Component({
	components:{
		TsForm
	}
})
export default class extends Vue {

}
</script>

<style lang="less" scoped>
