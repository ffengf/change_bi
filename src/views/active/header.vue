<template>
    <div id="box_header">
        <Bread :new_list="new_list" />
        <div class="box_line"></div>
        <template v-if="!$route.path.includes('info')">
			<!-- <h2>이벤트</h2> -->
			<h1>오직 스위치에서만 제공하는 이벤트</h1>
			<div class="line sm-up"></div>
			<div class="line sm-down"></div>
		</template>
        <div class="tab">
            <div :class="['item',active('1') ? 'active' :'']" @click="move('1')">서평단·강연</div>
            <div :class="['item',active('2') ? 'active' :'']" @click="move('2')">스페셜 이벤트</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";

@Component({
    components: {
        Bread,
    },
})
export default class extends Vue {
    @Prop({ required: true })
    new_list!: {
        to: string;
        title: string;
	}[];

	active(type:string){
		return this.$route.params.active_type === type
	}

	move(type:string){
		this.$router.push(`/active/${type}/list`)
	}

}
</script>



<style lang='less' scoped>
#box_header {
	position: relative;
    h2 {
        margin-top: 1.15rem;
        font-family: NotoSansKR;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -0.7px;
        text-align: left;
        color: #010101;
    }
    .line {
        background-color: #000000;
        width: 1rem;
        height: 2px;
        margin: 1.25rem 0;
    }
    h1 {
        font-family: NotoSansKR;
        font-size: 30px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -1.5px;
		color: #3fa535;
		margin-top: 1.25rem;
    }
    .tab {
        margin-top: 1.4rem;
        margin-bottom: 1.25rem;
        width: 100%;
        border: 1px solid #324b9b;
        height: 3.25rem;
		display: flex;
		box-sizing: border-box;
		background: #fff;
        > .item {
            width: 50%;
            line-height: 3.25rem;
            text-align: center;
            color: #324b9b;
            font-family: NotoSansKR;
            font-size: 20px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -1px;
            cursor: pointer;
            height: 100%;
        }
        .active {
            background: #324b9b;
            color: #fff;
        }
    }
}
@media only screen and (max-width: 1024px){
	.box_line{
		margin: 1.25rem 0;
	}
	h1{
		font-size: 20px!important;
		margin-top: 1rem!important;
	}
	.tab {
		position: fixed;
		width: 90vw!important;
		top: 4.2vh;
		z-index: 2000;
		height: 2.5rem!important;
		> .item {
            line-height: 2.5rem!important;
        }
	}
}
</style>
