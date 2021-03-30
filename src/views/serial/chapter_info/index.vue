<template>
    <div id="chapter_info" v-loading="_loading">
        <Bread :new_list="bread" />
        <div class="box_line"></div>
        <div class="top">
            <h2>
                <span>{{ info.number }} 화</span>
                <span>|</span>
                <span>{{ author_name }} 작가</span>
            </h2>
            <h1>{{ info.title }}</h1>
        </div>
        <!-- <div class="inner" v-html="info.content"></div> -->
		<Inner class="nocoyp" :val="info.content" />
        <div class="line"></div>
		<div class="share">
			<div class="left">
				<img v-if="info.is_like === 0" @click="is_like(1)" src="@/assets/img/un_zan.png" alt="" >
				<img v-else src="@/assets/img/is_zan.png" @click="is_like(0)" alt="">
				<span>{{ info.like_num }} 명이 좋아합니다.</span>
			</div>
			<div class="right">
				<ShareNetwork
					network="Facebook"
					:title="info.title"
					:url="share_url"
				>
					<img src="@/assets/img/fa.png" alt="">
				</ShareNetwork>
				<ShareNetwork
					network="Twitter"
					:title="info.title"
					:url="share_url"
				>
					<img src="@/assets/img/tw.png" alt="">
				</ShareNetwork>
			</div>
		</div>
        <div class="btn_box">
            <el-button
                class="btns aaa"
                type="default"
                :disabled="prev === null"
                @click="info_id = prev"
                >이전 글</el-button
            >
            <el-button class="btns" type="success" @click="ret_list"
                >목록으로</el-button
            >
            <el-button
                class="btns aaa"
                type="default"
                :disabled="next === null"
                @click="info_id = next"
                >다음 글</el-button
            >
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Inner from "@/components/inner/index.vue"
import Bread from "@/components/bread/index.vue";
import { Nocopy } from "@/mixin/nocopy"
import { api_serial, chapter_info, date_info } from "@/api";
import { Encryption } from '@/util/encryption';
import { UserModule } from '../../../store/user';
@Component({
    components: {
		Bread,
		Inner,
    },
})
export default class extends Nocopy {
    author_name = "";
    ids: number[] = [];
    bread = [
        {
            title: "매일연재",
            to: "/serial",
        },
        {
            title: this.bread_date,
            to: "/serial",
        },
        {
            title: "",
            to: "",
        },
        {
            title: "",
            to: "",
        },
    ];

    info: chapter_info = {
        id: 0,
        number: 0,
        title: "",
        create_time: "",
        content: "",
		show_time:'',
		is_like:0,
		like_num:0
    };

	async is_like(action:0|1){
		this._loading = true
		await api_serial.chapter_list(this.info.id,action).finally(()=>{
			this._loading = false
		})
		this.get_info()
	}

    get book_id(): number {
        return Number(this.$route.params.book_id);
    }

    get info_id(): number {
        return Number(this.$route.params.info_id);
    }

    set info_id(id: number) {
        this.$router.push(
            `/serial/chapter_info/${this.book_id}/${id}?bread_date=${this.bread_date}`
        );
    }

    get bread_date(): string {
        return this.$route.query.bread_date as string;
    }

	get share_url(){
		return `https://api.changbi.com/book/chapter/detail/${this.info_id}`
	}

    async get_id_name() {
		this._loading = true
        const { book_title, ids, author_name } = await api_serial.get_id_name(this.book_id).finally(()=>{
			this._loading = false
		});
        this.bread.splice(2, 1, {
            title: book_title,
            to: `/serial/book_info/${this.book_id}?bread_date=${this.bread_date}`,
        });
		this.ids = ids.reverse();
		this.author_name = author_name
    }

    @Watch("info_id", { immediate: true })
    async get_info() {
        this._loading = true;
        const info = await api_serial
            .get_chapter_info(this.info_id)
            .finally(() => {
                this._loading = false;
			});
		if(info.is_free === 0 && UserModule.token === null){
			this.$alert('로그인후 감상 가능합니다.',{
				confirmButtonText:'확인 ',
				callback:()=>{
					this.$router.push({
						path:"/login",
						query:{
							last:Encryption.base_enc(this.$route.fullPath)
						}
					})
				}
			})
			return
		}
        this.info = info;
        this.bread.splice(3, 1, { title: `${info.number} 화`, to: "" });
    }

    get prev(): null | number {
        if (this.id_for_index === 0 || this.id_for_index === -1) {
            return null;
        } else {
            return this.ids[this.id_for_index - 1] ;
        }
    }

    get next(): null | number {
        if (
            this.id_for_index === this.ids.length - 1 ||
            this.id_for_index === -1
        ) {
            return null;
        } else {
            return this.ids[this.id_for_index + 1] ;
        }
    }

    get id_for_index(): number {
        return this.ids.findIndex((x) => x === this.info_id);
    }

    created() {
        this.get_id_name();
    }

    ret_list() {
        this.$router.push(
            `/serial/book_info/${this.book_id}?bread_date=${this.bread_date}`
        );
	}
}
</script>

<style lang="less" scoped>
#chapter_info {
	max-width: 40rem;
    .top {
        min-height: 5rem;
        border-bottom: 1px solid #324b9b;
        box-sizing: border-box;
        margin-bottom: 2.5rem;
        h2 {
            padding: 1.25rem 0 0.5rem 0;
            font-family: NotoSansKR;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.7px;
            span:nth-of-type(1) {
                color: #324b9b;
            }
            span:nth-of-type(2) {
                margin: 0 0.3rem;
            }
        }
        h1 {
            font-family: NotoSansKR;
            font-size: 22px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -1.1px;
			color: #3fa535;
			padding-bottom: 1rem;
        }
    }
    .inner {
        min-height: 31rem;
    }
    .line {
        height: 1px;
        background: #324b9b;
        margin: 2.5rem 0;
    }
    .btn_box {
		margin-top: 1rem;
		margin-bottom: 4rem;
        display: flex;
        justify-content: space-between;
        > * {
            width: 10rem;
            height: 2.2rem;
        }
    }
	.share{
		display: flex;
		justify-content: space-between;
		margin-top: -2rem;
		img{
			width: 1.7rem;
			height: 1.7rem;
			cursor: pointer;
		}
		.left{
			display: flex;
			align-items: center;
			span{
				font-size: 14px;
				margin-left: 0.5rem;
			}
		}
		.right{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			img{
				margin-left: 0.3rem;
			}
		}
	}
}

</style>
