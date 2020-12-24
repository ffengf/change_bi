<template>
    <div id="collect" v-loading="_loading">
        <ul>
            <li
                class="item"
                v-for="ele in list"
                :key="ele.id"
                @click="go_info(ele)"
            >
                <img class="img" :src="ele.club.cover" alt="" />
                <h2>{{ ele.club.type === 0 ? '클럽 창작과 비평' : '북클럽 필라멘트' }}</h2>
                <h1>{{ ele.club.title }}</h1>
                <h3>
                    <span v-if="ele.club.status === 0">모집 중</span>
					<span v-if="ele.club.status === 1">진행 중</span>
					<span v-if="ele.club.status === 3">마감 임박</span>
					<span v-if="ele.club.status === 4">모집대기</span>
					<span v-if="ele.club.status === 5">모집마감</span>
                    <span>|</span>
                    <span
                        >{{ ele.club.start_time }} ~
                        {{ ele.club.end_time }}</span
                    >
                </h3>
                <h4>{{ ele.club.subtitle }}</h4>
                <img
                    class="icon"
                    src="@/assets/img/collect.png"
                    alt=""
                    @click.stop="un_collect(ele.club.id,ele.id)"
                />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { More } from "@/mixin/more";
import { api_club, api_user, user_collect } from "@/api";
@Component
export default class extends More(api_user.get_collect) {
    go_info(ele: user_collect) {
        const uri = ele.club.type === 0 ? "creation" : "apply";
        this.$router.push(`/club/${uri}/info/${ele.club.id}`);
    }

    async un_collect(club_id: number,id:number) {
        this._loading = true;
        await api_club.collect(club_id, 0).finally(() => {
            this._loading = false;
		});
		this.list = this.list.filter(x => x.id !== id)
		this.count --
        this.$message.success("찜 취소");
    }
}
</script>



<style lang='less' scoped>
#collect {
    width: 100%;
    display: flex;
    flex-direction: column;
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
		margin-top: 2rem;
		min-height: 10rem;
        &::after {
            content: "";
            width: 15.85rem;
            display: block;
        }
        .item {
            cursor: pointer;
            width: 48%;
            min-height: 16rem;
            box-sizing: border-box;
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
            position: relative;
            > .img {
                width: 100%;
                height: 11rem;
                object-fit: cover;
            }
            h2 {
                color: #3fa535;
                font-family: NotoSansKR;
                font-size: 12px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.3px;
                margin-top: 0.5rem;
            }
            h1 {
                font-family: NotoSansKR;
                font-size: 19px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.95px;
                margin-top: 0.3rem;
            }
            h3 {
                font-size: 11px;
				margin-top: 0.3rem;
				span:nth-of-type(1) {
                    color: #324b9b;
                }
                span:nth-of-type(2) {
                    margin: 0 0.3rem;
                }
            }
            h4 {
                font-size: 11px;
                margin-top: 0.7rem;
                color: #8f8f8f;
            }
            .icon {
                position: absolute;
                width: 1rem;
                height: 1rem;
                right: 0.2rem;
                top: 11.7rem;
            }
        }
    }
    .more {
        margin-top: 1.5rem;
        width: 10rem;
        height: 2.2rem;
        align-self: center;
    }
}
</style>
