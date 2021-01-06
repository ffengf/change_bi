<template>
    <div id="user" class="flexC">
        <div class="user w70vw min_width1000">
            <Bread class="bread" />
            <div class="line mt10"></div>
            <div class="body">
                <div class="user_information" v-loading="_loading">
                    <div class="bg_color_primary">마이페이지</div>
                    <div>
						<el-upload
							:action="'http://13.125.137.129:8000' + '/file_upload'"
							class="upload"
							accept="image/jpeg,image/gif,image/jpg,image/png"
							:before-upload="beforeUpload"
							:on-success="success"
							:on-error="error"
						>
							<div class="user_avatar">
								<img :src="info.avatar" alt="" />
								<img src="@/assets/img/user/2.png" alt="" />
							</div>
						</el-upload>
                        <p class="user_name kr-bo">{{ info.real_name }} 님</p>
                        <p class="color_success b mt30 fs16 pb10 user_line">참여 관리</p>
                        <p class="mt10 fs14 pointer" @click="$router.push('/user/club')">나의 모임</p>
                        <p class="mt10 fs14 pointer" @click="$router.push('/user/active')">나의 이벤트</p>
                    </div>
                    <div class="kr-re">
                        <p class="pb10 user_line color_primary fs16">회원정보</p>
                        <p class="fs14 mt10 pointer" @click="$router.push('/other/setting')">개인정보 수정</p>
						<p class="fs14 mt10 pointer" @click="$refs['edit_pass'].key = true">비밀번호 수정</p>
                        <p class="pb10 user_line color_primary fs16 mt20">서비스 이용내역</p>
                        <p class="mt10 fs14 pointer" @click="$router.push('/user/collect')">찜</p>
                        <p class="mt10 fs14 pointer" @click="$router.push('/user/club')">나의 모임</p>
                        <p class="mt10 fs14 pointer" @click="$router.push('/user/active')">나의 이벤트</p>
                        <p class="mt10 fs14 pointer" @click="$router.push('/user/pay')">결제내역</p>
                        <p class="mt10 fs14 pointer" @click="$router.push('/user/coupon')">쿠폰조회</p>
                        <p class="mt10 fs14 pointer" @click="logout">로그아웃</p>
						<br>
						<p class="mt10 fs14 pointer ccc" @click="unregister">회원탈퇴</p>
                    </div>
                </div>
                <div class="content">
					<div class="party_title">{{ title }}</div>
					<div class="line bg_color_success"></div>
					<Rview />
				</div>
            </div>
        </div>

		<EditPass ref="edit_pass" />

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import Bread from "@/components/bread/index.vue";
import EditPass from "./component/editpass.vue"
import { UserModule } from "@/store/user";
import { api_login, api_user } from "@/api";
import { ElForm } from "element-ui/types/form";
import { mapObjIndexed } from "ramda";
@Component({
    components: {
        Rview,
		Bread,
		EditPass
    },
})
export default class extends Vue {

	async unregister(){
		await this.$confirm('탈퇴후 모든 정보가 삭제될것 입니다. 정말 탈퇴 하시겠습니까?', '알림', {
			confirmButtonText: '탈퇴',
			cancelButtonText: '취소',
		})
		await api_user.unregister()
		this.logout('탈퇴 완료되었습니다.')
	}

	logout(str = '로그아웃 되었습니다.'){
		UserModule.logout()
		this.$message.success(str)
		this.$router.push('/')
	}

	get info(){
		return UserModule.info === null ? {} : UserModule.info
	}

	get title():string{
		return this.$route.meta.title
	}

	beforeUpload(file:any){
		const file_type = ["image/jpeg","image/gif","image/jpg","image/png"]
       if(!file_type.includes(file.type)){
		   return this.$message.error('jpeg, gif, jpg, png로된 이미지를 업로드 해주세요.')
	   }
	   this._loading = true
	   return true
	}

	async success(_,file){
		const url = file.response.url
		const info = await api_login.edit_cover(url).finally(()=>{
			this._loading = false
		})
		UserModule.set_info(info)
		this.$message.success('수정 되었습니다.')
	}

	error(){
		this._loading = false
		this.$message.error('업로드 실패되었습니다.')
	}

}
</script>



<style lang='less' scoped>
#user {
    width: 100%;
    margin-top: 3.75rem;
    .user {
        display: flex;
        flex-direction: column;
    }
    .line {
        background: #324b9b;
    }
    .body {
        margin-top: 2rem;
		width: 100%;
		display: flex;
		margin-bottom:4rem;
		justify-content: space-between;
		flex-wrap: wrap;
        .user_information {
            width: 16rem;
            div:first-child {
                padding: 31px;
                font-size: 22px;
                letter-spacing: -1.1px;
                color: #ffffff;
            }
            div:nth-child(2) {
                padding: 40px 31px;
                border: 1px solid #324b9b;
                border-bottom: transparent;
                .user_avatar {
                    margin: auto;
                    padding: 0;
                    width: 82px;
                    height: 82px;
					position: relative;
					cursor: pointer;
                    img:first-child {
                        width: 100%;
						height: 100%;
						border-radius: 50%;
                    }
                    img:last-child {
                        position: absolute;
                        bottom: 5px;
                        right: -5px;
                        width: 25px;
                        height: 25px;
                    }
                }
                .user_name {
                    font-size: 15px;
                    text-align: center;
                    margin-top: 5px;
                }
                .momenti {
                    font-size: 11.5px;
                    text-align: center;
                }
            }
            div:nth-child(3) {
                padding: 34px 29px 29px;
				border: 2px solid #3fa535;
				> p{
					letter-spacing: -0.35px;
					font-family: NotoSansKR;
				}
            }
		}
		.content{
			width: 30.5rem;
			padding-top: 2rem;
			.party_title{
				font-family: NotoSansKR;
				font-size: 22px;
				letter-spacing: -1.1px;
				color: #3fa535;
				border-left:3px solid #3fa535;
				padding-left:0.75rem;
				height: 1rem;
				line-height: 1rem;
			}
			.line{
				width:100%;
				height:2px;
				margin-top: 1rem;
			}
			/deep/.warpper{
				position: relative;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				.box{
					min-height: 4.5rem;
					width: 100%;
					border-bottom: 1px solid #324b9b;
					box-sizing: border-box;
					padding: 1.2rem 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.box_left{
						h2{
							font-family: NotoSansKR;
							font-size: 12px;
							font-weight: normal;
							font-stretch: normal;
							font-style: normal;
							letter-spacing: -0.3px;
							>span:nth-of-type(2){
								margin: 0 0.2rem;
							}
						}
						h1{
							margin-top: 0.2rem;
							font-size: 17px;
							font-weight: 500;
							font-stretch: normal;
							font-style: normal;
							letter-spacing: -0.85px;
							.small{
								font-size: 13.5px;
							}
						}
					}
					.right_btn{
						width: 6.8rem;
						height: 1.7rem;
						padding: 0!important;
						flex-shrink: 0;
					}
					.text{
						color: #3fa535;
						font-family: NotoSansKR;
						font-size: 17px;
						font-weight: 500;
						font-stretch: normal;
						font-style: normal;
						flex-shrink: 0;
					}
				}
				.more{
					margin-top: 1.5rem;
					width: 10rem;
					height: 2.2rem;
				}
			}
		}
	}
}
.user_line{
	border-bottom:1px solid #324b9b
}
.upload{
	/deep/.el-upload{
		display: block;
	}
	/deep/.el-upload-list {
		display: none!important;
	}
}
.ccc{
	color: #cccccc;
}
@media only screen and (max-width: 1024px) {
	.user_information,.content{
		width: 100%!important;
	}
	.content{
		margin-bottom: 2rem;
		order: -1!important;
	}
	.body{
		margin-top: 0!important;
	}
	#user{
		margin-top: 0!important;
	}
	/deep/.right_btn{
		width: 4rem!important;
	}
}
</style>
