<template>
    <div id="discuss" v-loading="_loading">
        <div class="user_inp">
            <img :src="user_info && user_info.avatar" alt="" />
            <div id="inp" @click="$refs['inp'].focus()">
                <div class="name">{{ user_info && user_info.real_name }}</div>
                <el-input
                    ref="inp"
                    v-model="submit_info.content"
                    placeholder="내용을 작성해 보세요."
                ></el-input>
                <div class="btn_box">
                    <span @click.stop="submit">확인</span>
                    <span>|</span>
                    <span @click.stop="submit_info.content = ''">취소</span>
                </div>
            </div>
        </div>
		<ul>
			<Item v-for="ele in list" :key="ele.id" :info="ele" @submit="children_submit" @remove="children_remove" @edit="children_submit" />
		</ul>
		<el-button class="more" type="success" @click="more" :disabled="disabled">더 보기</el-button>
    </div>
</template>

<script lang="ts">
import { api_myclub, discuss_list } from "@/api";
import { More } from "@/mixin/more";
import { UserModule } from "@/store/user";
import { Vue, Component } from "vue-property-decorator";
import Item from "./item.vue"


@Component({
	components:{ Item }
})
export default class extends More(api_myclub.get_discuss_list) {
    submit_info = {
		content: "",
		club_id: this.club_id,
    };

    filter = {
        club_id: this.club_id,
    };

    get club_id() {
        return +this.$route.params.id;
    }

    get user_info() {
        return UserModule.info;
	}

	async submit(){
		if(this.submit_info.content === ''){
			return this.$message.error('inner')
		}
		this._loading = true
		const new_discuss = await api_myclub.add_discuss({ ...this.submit_info }).finally(()=>{
			this._loading = false
		})
		this.submit_info.content = ''
		this.list = [new_discuss,...this.list]
		this.$message.success('success')
	}


	children_submit(data:discuss_list){
		this.list = this.list.map(x => x.id === data.id ? data : x)
	}

	children_remove(data:{ id:number,parent_id:number | null }){
		this.list = this.list.map(x =>{
			if(data.parent_id !== null && data.parent_id === x.id){
				const new_reply_list = x.reply_list.map(y => {
					if(y.id === data.id){
						return { ...y,delete:1 }
					}
					return y
				})
				return { ...x,reply_list:new_reply_list }
			}
			if(data.parent_id === null){
				if(x.id === data.id){
					return { ...x,delete:1 }
				}
			}
			return x
		}) as discuss_list[]
	}

}
</script>



<style lang='less' scoped>
#discuss {
	display: flex;
	flex-direction: column;
	align-items: center;
    .user_inp {
		width: 100%;
        box-sizing: border-box;
        padding: 1rem 0;
        border-top: 1px solid #324b9b;
        border-bottom: 1px solid #324b9b;
        margin-top: 0.75rem;
        display: flex;
        justify-content: space-between;
        height: 7.5rem;
        img {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 50%;
            overflow: hidden;
            margin-top: 0.5rem;
        }
        #inp {
            width: 90%;
            position: relative;
            border: 1px solid #ccc;
            /deep/.el-input__inner {
                margin-top: 1.2rem;
                border: none !important;
                font-family: NotoSansKR;
                font-size: 13.5px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.68px;
                padding-left: 0.7rem !important;
            }
            .name {
                position: absolute;
                top: 0.4rem;
                left: 0.7rem;
                z-index: 100;
                font-family: NotoSansKR;
                font-size: 13.5px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.68px;
                text-align: left;
                color: #000000;
            }
            .btn_box {
                cursor: pointer;
                position: absolute;
                right: 0.75rem;
                bottom: 0.5rem;
                display: flex;
                align-items: center;
                span {
                    font-family: NotoSansKR;
                    font-size: 13.5px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.68px;
                    color: #858585;
                }
                span:nth-of-type(2) {
                    margin: 0 0.3rem;
                }
            }
        }
	}
	ul{
		width: 100%;
	}
}
</style>
