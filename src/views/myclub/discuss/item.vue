<template>
    <li class="item">
        <div class="show">
            <img :src="info.from_user.avatar" alt="" />
            <div class="content">
                <div class="h2">
                    <span>{{ info.create_time }}</span>
                    <span>|</span>
                    <span v-if="info.delete === 0">{{
                        info.from_user.real_name
                    }}</span>
                    <span v-else>ㅇㅇㅇ님</span>
                </div>
                <div class="h1" v-if="info.delete === 0">
                    {{ info.content }}
                </div>
                <div class="h1" v-else>삭제된 게시글입니다.</div>
                <div class="reapply">댓글쓰기</div>
                <div
                    class="btn_box"
                    v-if="info.from_user.id === user_id && info.delete === 0"
                >
                    <span @click="edit(ele)">수정</span>
                    <span>|</span>
                    <span @click="remove(info.id)">삭제</span>
                </div>
            </div>
        </div>
        <div class="children_box" v-if="info.reply_list.length !== 0">
			<div class="children" v-for="e in info.reply_list" :key="e.id">
				<img :src="e.from_user.avatar" alt="" />
				<div class="content">
					<div class="h2">
						<span>{{ e.create_time }}</span>
						<span>|</span>
						<span v-if="e.delete === 0">{{
							e.from_user.real_name
						}}</span>
						<span v-else>ㅇㅇㅇ님</span>
					</div>
					<div class="h1" v-if="e.delete === 0">
						{{ e.content }}
					</div>
					<div class="h1" v-else>삭제된 게시글입니다.</div>
					<div
						class="btn_box"
						v-if="e.from_user.id === user_id && e.delete === 0"
					>
						<span @click="edit(e)">수정</span>
						<span>|</span>
						<span @click="remove(e.id)">삭제</span>
					</div>
				</div>
			</div>
		</div>
    </li>
</template>

<script lang="ts">
import { api_myclub, discuss_list } from "@/api";
import { UserModule } from "@/store/user";
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
    key = false;

    @Prop({ required: true })
    info!: discuss_list;

    // info: discuss_list = {
    //     id: 0,
    //     create_time: "",
    //     content: "",
    //     delete: 0,
    //     from_user: {
    //         id: 0,
    //         username: "",
    //         avatar: "",
    //         real_name: "1111",
    //     },
    //     reply_list: [],
    // };

    get user_id() {
        return UserModule.info?.id;
    }

    edit() {}

    remove() {}
}
</script>



<style lang='less' scoped>
.item {
    width: 100%;
    padding: 0.7rem 0;
    border-bottom: 1px solid #324b9b;
    .show {
        display: flex;
    }
    img {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .content {
        margin-left: 0.75rem;
        flex: 1;
		position: relative;
        .h2 {
            font-family: NotoSansKR;
            font-size: 11.5px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.29px;
            text-align: left;
            span:nth-of-type(1) {
                color: #324b9b;
            }
            span:nth-of-type(2) {
                margin: 0 0.3rem;
            }
            span:nth-of-type(3) {
                color: #3fa535;
            }
        }
        .h1 {
            margin-top: 0.25rem;
            font-family: NotoSansKR;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.35px;
            text-align: left;
            color: #000000;
        }
        .reapply {
            cursor: pointer;
            margin-top: 1.1rem;
            font-family: NotoSansKR;
            font-size: 13.5px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.68px;
            text-align: left;
            color: #858585;
        }
        .btn_box {
            position: absolute;
            top: 0;
            right: 0;
            font-family: NotoSansKR;
            font-size: 13.5px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.68px;
            text-align: left;
            color: #858585;
            span {
                cursor: pointer;
            }
            span:nth-of-type(2) {
                margin: 0 0.3rem;
            }
        }
	}
	.children_box{
		margin-top: 1rem;
		.children {
			box-sizing: border-box;
			padding: 1.1rem 0 1.1rem 2.95rem;
			border-top: 1px solid #e5e5e5;
			display: flex;
		}
	}

}
</style>
