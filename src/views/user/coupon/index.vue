<template>
    <div class="warpper" v-loading="_loading">
        <el-button class="exchange" @click="key = true">쿠폰 등록하기</el-button>

        <template v-if="list.length !== 0">
			<div class="box" v-for="ele in list" :key="ele.id">
				<div class="box_left">
					<h2>
						<span class="color_success" v-if="ele.status === 0" >사용가능</span>
						<span class="color_primary" v-if="ele.status === 1" >사용완료</span>
						<span class="color_primary" v-if="ele.status === 2" >기한만료</span>
						<span>|</span>
						<span>
							{{ ele.create_time }} 등록
							<br class="sm-up" />
							(유효기간 : {{ ele.coupon.start_time }} ~ {{ ele.coupon.end_time }})
							<span v-if="ele.use_time !== null"> | {{ ele.use_time }}사용</span>
						</span>
					</h2>
					<h1>{{ ele.coupon.title }} <span class="small">({{ numFormat(ele.coupon.amount) }}원)</span> </h1>
				</div>
				<div class="text" v-if="ele.status !== 2">{{ ele.coupon.redeem_code }}</div>
				<el-button v-else type="danger" class="right_btn" @click="del(ele.id)">삭제</el-button>
			</div>
			<el-button class="more" type="success" @click="more" :disabled="disabled">더 보기</el-button>
		</template>
		<div class="none" v-else>
			등록하신 쿠폰이 없습니다.
		</div>




		<el-dialog title="쿠폰 등록하기" :visible="key" width="25%" :before-close="close">
				<div class="dialog" v-loading="dialog_loading">
					<h1>쿠폰번호를 입력해주세요.</h1>
					<el-input
						class="inp"
						v-model="code"
						placeholder="0000000"
					></el-input>
					<div class="dialog_btn_box">
						<el-button type="success" @click="submit">등록하기</el-button>
						<el-button @click="close">취소</el-button>
					</div>
				</div>
			</el-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue";
import { More } from "@/mixin/more";
import { api_user, user_coupon } from "@/api";
import { numFormat } from "@/util/string";
import { ElForm } from "element-ui/types/form";
@Component({
    components: {
        Rview,
        Bread,
    },
})
export default class extends More(api_user.get_coupon) {
    key = false;
	code = "";
	dialog_loading = false
	numFormat = numFormat

	async del(id:number){
		await this.$confirm('정말 삭제 하시겠습니까?', {
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
		})
		this._loading = true
		await api_user.del_coupon(id).finally(()=>{
			this._loading = false
		})
		this.$message.success('삭제 되었습니다.')
		this.clear_list()
	}

	async submit(){
		if(this.code === ''){
			return this.$message.error('쿠폰번호를 입력해 주세요.')
		}
		this.dialog_loading = true
		await api_user.exchange_coupon(this.code).finally(()=>{
			this.dialog_loading = false
		})
		this.$message.success('등록 되었습니다.')
		this.close()
		this.clear_list()
	}

	close(){
		this.code = ''
		this.key = false;
	}
}
</script>



<style lang='less' scoped>
.exchange {
    position: absolute;
    right: 0;
    width: 6.8rem;
    height: 1.7rem;
    top: -2.6rem;
    padding: 0;
}
.warpper {
    /deep/.el-dialog__wrapper {
        border-radius: 0;
        .el-dialog__header {
            background: #324b9b;
            padding: 0.7rem;
            .el-dialog__headerbtn {
                i {
                    color: #fff;
                    font-size: 20px;
                }
            }
            .el-dialog__title {
                color: #fff;
            }
        }
        .el-dialog {
            border-radius: 0;
        }
    }
    .dialog {
        h1 {
            font-family: NotoSansKR;
            font-size: 17px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.43px;
            margin-bottom: 0.5rem;
        }
        .inp {
            /deep/.el-input__inner {
                border: 1px solid #000 !important;
                padding: 0.75rem 0.5rem !important;
            }
        }
        .dialog_btn_box {
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
            > * {
                width: 49.5%;
                height: 2.2rem;
            }
        }
    }
}
</style>
