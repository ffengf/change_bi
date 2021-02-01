<template>
    <div class="login_warpper kr-re" id="sign_up" v-if="type === 0" v-loading="_loading">
        <h1>회원가입</h1>
        <div class="flex_column">
            <el-form
                ref="form"
                label-position="top"
                :model="info"
                :rules="rules"
                label-width="80px"
            >
                <el-form-item prop="username" label="아이디(이메일)">
                    <div class="flex">
                        <el-input
                            class="inp"
                            v-model="info.username"
                            placeholder="example@switch.com"
                        ></el-input>
                        <el-button
                            class="btn"
                            @click="check_mail"
                            :loading="btn_loadding.mail"
                            >중복확인</el-button
                        >
                    </div>
                </el-form-item>
                <el-form-item prop="password" label="비밀번호">
                    <el-input
                        v-model="info.password"
                        placeholder="영문, 숫자, 특수문자(! 또는 @) 포함 8자 이상 입력"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item prop="again_pass" label="비밀번호확인">
                    <el-input
                        v-model="info.again_pass"
                        placeholder="비밀번호를 한번 더 입력해주세요."
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item prop="real_name" label="이름">
                    <div class="flex name_sex">
                        <el-input
                            class="inp"
                            v-model="info.real_name"
                            placeholder="이름을 입력해주세요."
                        ></el-input>
                        <el-radio-group v-model="info.gender" class="radio_group">
                            <el-radio-button label="0">남자</el-radio-button>
                            <el-radio-button label="1">여자</el-radio-button>
                            <el-radio-button label="2">기타</el-radio-button>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item prop="birth" label="태어난 년도">
					<el-date-picker
						v-model="info.birth"
						align="right"
						type="year"
						placeholder="YYYY"
						class="date_picker"
						value-format="yyyy"
						:pickerOptions="pickerOptions"
					>
					</el-date-picker>
                </el-form-item>
                <el-form-item prop="phone" label="휴대폰번호">
                    <div class="flex">
                        <el-input
                            class="inp"
                            v-model="info.phone"
                            placeholder="‘-’를 제외하고 입력해주세요."
                        ></el-input>
						<PhoneSend :phone="info.phone" class="btn" size="default" content="인증" />
                    </div>
                </el-form-item>
                <el-form-item prop="code" label="인증번호" v-if="info.phone !== older.phone || info.phone.length === 0">
                    <div class="flex">
                        <el-input
                            class="inp"
                            v-model="info.code"
                            placeholder="000000"
                        ></el-input>
                        <el-button
                            class="btn"
                            @click="check_tel_pass"
                            :loading="btn_loadding.check_sms"
                            >확인</el-button
                        >
                    </div>
                </el-form-item>
                <el-form-item prop="address" label="주소">
                    <div class="flex">
                        <el-input
                            class="inp"
                            v-model="info.address_code"
                            placeholder="우편번호를 검색해주세요."
                            disabled
                        ></el-input>
                        <el-button
                            class="btn"
                            @click="searchAds"
                            >검색하기</el-button
                        >
                    </div>
                    <el-input
                        v-model="info.address"
                        placeholder="주소"
                        disabled
                    ></el-input>
                    <el-input
                        ref="address_detail"
                        v-model="info.address_detail"
                        placeholder="상세주소"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="favorite_category"
                    label="선호 독서 분야 (중복 선택 가능)"
                >
                    <el-checkbox-group v-model="info.favorite_category">
                        <div class="sm-down">
							<div class="flex checkbox">
								<el-checkbox :label="0">문학</el-checkbox>
								<el-checkbox :label="1">인문교양</el-checkbox>
								<el-checkbox :label="2">역사</el-checkbox>
								<el-checkbox :label="3">과학</el-checkbox>
								<el-checkbox :label="4">어린이</el-checkbox>
							</div>
							<div class="flex checkbox">
								<el-checkbox :label="5">청소년</el-checkbox>
								<el-checkbox :label="6">그림책</el-checkbox>
								<el-checkbox :label="7">영어덜트</el-checkbox>
								<el-checkbox :label="8">만화</el-checkbox>
								<el-checkbox :label="9">기타</el-checkbox>
							</div>
						</div>
						<div class="sm-up">
							<el-checkbox :label="0">문학</el-checkbox>
							<el-checkbox :label="1">인문교양</el-checkbox>
							<el-checkbox :label="2">역사</el-checkbox>
							<el-checkbox :label="3">과학</el-checkbox>
							<el-checkbox :label="4">어린이</el-checkbox>
							<el-checkbox :label="5">청소년</el-checkbox>
							<el-checkbox :label="6">그림책</el-checkbox>
							<el-checkbox :label="7">영어덜트</el-checkbox>
							<el-checkbox :label="8">만화</el-checkbox>
							<el-checkbox :label="9">기타</el-checkbox>
						</div>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    prop="is_library"
                    label="학교 또는 독서 지도 등 교육 관련 업계에 종사 중이신가요?"
                >
                    <el-radio-group v-model="info.is_library">
                        <el-radio :label="1">예</el-radio>
                        <el-radio :label="0">아니오</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    prop="is_publish"
                    label="향후 출판계 취업을 희망하시나요?"
                >
                    <el-radio-group v-model="info.is_publish">
                        <el-radio :label="1">예</el-radio>
                        <el-radio :label="0">아니오</el-radio>
                    </el-radio-group>
                </el-form-item>
				<el-form-item
                    prop="project"
                    label="클럽 창작과비평 활동 이력이 있으신가요?"
                >
                    <el-checkbox-group v-model="info.project">
                        <el-checkbox :disabled="info.project.includes(3)" :label="0">프롤로그</el-checkbox>
						<el-checkbox :disabled="info.project.includes(3)" :label="1">제1장</el-checkbox>
						<el-checkbox :disabled="info.project.includes(3)" :label="2">제2장</el-checkbox>
						<el-checkbox :label="3">없음</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="이용약관동의" prop="all">
                    <el-checkbox v-model="info.all" @change="all_change">이용약관동의</el-checkbox>
                    <div style="
						display: flex;
						flex-direction: column;
						margin-left: 1rem;
					">
						<el-checkbox v-model="all_1">
                            <span>서비스이용약관(필수)</span>
                            <el-button
                                type="text"
                                class="look"
                                style="margin-left: 1rem"
								@click="key_1 = true"
                                >자세히보기</el-button
                            >
                        </el-checkbox>
                        <el-checkbox v-model="all_2">
                            <span>개인정보 수집·이용 동의 (필수)</span>
                            <el-button
                                type="text"
                                class="look"
                                style="margin-left: 1rem"
								@click="key_2 = true"
                                >자세히보기</el-button
                            >
                        </el-checkbox>
					</div>
                    <el-checkbox v-model="is" @change="is_change">마케팅정보 수신동의</el-checkbox>
					<div style="
						display: flex;
						flex-direction: column;
						margin-left: 1rem;
                    ">
						<el-checkbox v-model="info.is_email"
                            >이메일 수신동의 (선택)</el-checkbox
                        >
                        <el-checkbox v-model="info.is_sms"
                            >SMS(카카오톡) 수신동의 (선택)</el-checkbox
                        >
					</div>

                </el-form-item>
            </el-form>
            <el-button type="success" @click="submit">가입하기</el-button>
        </div>

        <el-dialog class="dialogDaum" :visible.sync="key">
            <div ref="daumBox"></div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="key = false"
                    >확인</el-button
                >
            </span>
        </el-dialog>

		<el-dialog
			title="서비스이용약관"
			:visible.sync="key_1"
			width="50%"
		>
			<!-- <span v-html="content.use"></span> -->
			<Inner :val="content.use" />
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="key_1 = false">확인</el-button>
			</span>
		</el-dialog>

		<el-dialog
			title="개인정보 취급방침"
			:visible.sync="key_2"
			width="50%"
		>
			<!-- <span v-html="content.privacy"></span> -->
			<Inner :val="content.privacy" />
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="key_2 = false">확인</el-button>
			</span>
		</el-dialog>
    </div>
	<div class="login_warpper success" v-else v-loading="_loading">
		<img src="@/assets/img/success.png" alt="">
		<h2>
			<p class="kr-li">스위치 홈페이지</p>
			<p>회원가입이 완료 되었습니다.</p>
		</h2>
		<!-- <p class="mid kr-re">안내사항입니다.</p> -->
		<h3 class="kr-re">
			<p>내일의 나를 성장시키는 이야기</p>
			<p>지금 스위치에서 만나보세요!</p>
		</h3>
		<div class="btn_box">
			<el-button
				@click="$router.push('/')"
				>홈으로 이동</el-button
			>
			<el-button type="success" @click="$router.push('/login/signin')"
				>로그인하기</el-button
			>
		</div>
	</div>
</template>

<script lang="ts">
import { api_login, sign_up,api_service } from "@/api";
import { ElForm } from "element-ui/types/form";
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapObjIndexed } from "ramda"
import PhoneSend from "../components/phoneSend.vue"
import Inner from "@/components/inner/index.vue"
@Component({
	components:{
		PhoneSend,
		Inner,
	}
})
export default class extends Vue {
	type = 0

    older = {
        username: "",
        phone: "",
    };

    btn_loadding = {
        mail: false,
        check_sms: false,
    };


	validatePass_8(rules, value, callback){
		const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
		if(reg.test(value)){
			(this.$refs["form"] as ElForm).validateField("again_pass")
			callback()
		}else{
			callback(new Error("영문, 숫자, 특수문자(! 또는 @) 포함 8자 이상 입력"));
		}
	}

    validatePass(rules, value, callback) {
        if (this.info.password !== this.info.again_pass) {
            callback(new Error("비밀번호와 비밀번호 확인이 일치하지 않습니다."));
        } else {
            callback();
        }
    }

    async check_mail() {
		this.btn_loadding.mail = true;
		(this.$refs["form"] as ElForm).validateField("username",async (err_str)=>{
			if(err_str === '이메일 중복확인을 해주세요.' || err_str === ''){
				const data = await api_login.check_username({
					username: this.info.username,
				}).finally(()=>{
					this.btn_loadding.mail = false;
				})
				this.older.username = this.info.username;
				await (this.$refs["form"] as ElForm).validateField("username");
				this.$message.success("중복된 아이디가 없습니다.");
			}else{
				this.$message.error(err_str)
				this.btn_loadding.mail = false;
			}
		})
	}

    validateEmail(rule, value, callback) {
        if (value === "") {
            callback(new Error("이메일을 입력해 주세요."));
        } else if (
            !value.match(/^[a-zA-Z0-9_-|.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
        ) {
            callback(new Error("정확한 이메일 주소를 이력해 주세요."));
        } else if (this.older.username !== value) {
            callback(new Error("이메일 중복확인을 해주세요."));
        } else {
            callback();
		}

    }

    validatePhone(rule, value: string, callback) {
        if (value.length !== 11) {
            callback(new Error("'-'를 빼고 입력해 주세요."));
        } else if (this.older.phone !== value) {
            callback(new Error("휴대폰 인증을 진행해 주세요."));
        } else {
            callback();
        }
    }
    async check_tel_pass() {
        (this.$refs["form"] as ElForm).validateField("phone", async (err_msg) => {
            if (err_msg === "휴대폰 인증을 진행해 주세요." || err_msg === "") {
				this.btn_loadding.check_sms = true;
				await api_login.check_sms({
					phone: this.info.phone,
					code: this.info.code,
				}).finally(()=>{
					this.btn_loadding.check_sms = false;
				})
				this.$message.success("인증 완료 되었습니다.");
				this.older.phone = this.info.phone;
				(this.$refs["form"] as ElForm).validateField("phone")
            }else{
				this.$message.error(err_msg);
				this.btn_loadding.check_sms = false;
			}
        });
    }

    rules = {
        username: [
            {
                required: true,
                validator: this.validateEmail,
                trigger: "change",
            },
        ],
        password: [
            {
				validator: this.validatePass_8,
                required: true,
                trigger: ["change"],
            },
        ],
        again_pass: [
            {
                required: true,
                validator: this.validatePass,
                trigger: ["change"],
            },
        ],
        real_name: [
			{ required: true, message:'이름을 입력해 주세요.' },
			{ max:10, message:'10자 이내로 작성해 주세요.' }
		],
        gender: [{ required: true }],
        birth: [{ required: true, message:'태어난 년도를 선택해 주세요.'  }],
        phone: [
            {
                required: true,
				trigger: ["change"],
				validator:this.validatePhone
            },
        ],
        address: [{ required: true, message:'주소를 검색해 주세요.' }],
        address_code: [{ required: true, message:'주소를 검색해 주세요.' }],
        address_detail: [{ required: true, message:'주소를 검색해 주세요.'}],
        favorite_category: [{ required: true, message:'1개 이상 분야를 선택해 주세요.' }],
        is_library: [{ required: true }],
        is_publish: [{ required: true }],
        is_email: [{ required: true }],
		is_sms: [{ required: true }],
		all:[{ required: true }],
		project:[{ required: true,message:'활동 이력을 선택해 주세요.' }]
    };
    info = {
        username: "",
        password: "",
        again_pass: "",
        real_name: "",
        gender: "0",
        birth: "",
        phone: "",
        code: "",
        address: "",
        address_code: "",
        address_detail: "",
		favorite_category: [0],
		project:[0],
        is_library: 1,
        is_publish: 1,
        is_email: true,
		is_sms: true,
		all:true
	};

	all_1 = true
	all_2 = true
	is = true

	@Watch('info.project',{deep:true})
	watch_project_disabled(type:number[]){
		if(type.includes(3) && type.length !== 1 ){
			this.info.project = [3]
		}
	}


	@Watch('all_1',{ immediate:true })
	@Watch('all_2',{ immediate:true })
	watch_all(){
		if(this.all_1 === true && this.all_2 === true){
			this.info.all = true
		}else{
			this.info.all = false
		}
	}
	all_change(type:boolean){
		this.all_2 = type
		this.all_1 = type
	}

	@Watch('info.is_email',{ immediate:true })
	@Watch('info.is_sms',{ immediate:true })
	watch_is(){
		if(this.info.is_email === true && this.info.is_sms === true){
			this.is = true
		}else{
			this.is = false
		}
	}
	is_change(type:boolean){
		this.info.is_email = type
		this.info.is_sms = type
	}

    key = false;

    async submit() {
		await (this.$refs['form'] as ElForm).validate()
		if(this.info.all === false){
			return this.$message.error('이용약관을 동의해 주세요.')
		}
		const info = mapObjIndexed((v,k)=>{
			if(typeof v === 'boolean'){
				// return Boolean(v)
				return v === true ? 1 : 0
			}else{
				return v
			}
		})({ ...this.info })
		this._loading = true
		await api_login.signup(info as any as sign_up).finally(()=>{
			this._loading = false
		})
		this.type = 1
    }

    searchAds() {
        this.key = true;
        setTimeout(() => {
            new daum.Postcode({
                width: "100%",
                onComplete: (data) => {
                    this.info.address_code = data.zonecode;
					if(data.userSelectedType === 'J'){
						this.info.address = data.jibunAddress
					}
					if(data.userSelectedType === 'R'){
						this.info.address = data.roadAddress
					}
                    this.key = false;
                    (this.$refs["address_detail"] as HTMLInputElement).focus();
                },
                onclose: () => {
                    this.key = false;
                },
            }).embed(this.$refs["daumBox"]);
        }, 100);
	}

	key_1 = false
	key_2 = false

	content = {
		use:"",
		privacy:""
	}

	async get_content(){
		const [use,privacy] = await Promise.all([
			api_service.get_use(),
			api_service.get_privacy()
		])
		this.content = {
			use:use.content,
			privacy:privacy.content,
		}
	}


	async created(){
		this.get_content()
	}


	pickerOptions = {
		disabledDate(time) {
            return time.getTime() > Date.now();
        }
	}
}
</script>

<style lang="less" scoped>
.success{
	display: flex;
	flex-direction: column;
	align-items: center;
	h2{
		margin-top: 1rem;
		text-align: center;
		letter-spacing: -1.99px;
		font-size: 26.5px;
	}
	.mid{
		margin-top: 1.75rem;
		margin-bottom: 1.5rem;
		font-size: 14.5px;
		letter-spacing: -0.36px;
	}
	h3{
		text-align: center;
		font-size: 14.5px;
		letter-spacing: -0.36px;
	}
	.btn_box{
		margin-top: 3rem;
		> *{
			height: 2.1rem;
			width: 7.5rem;
		}
	}
}


.name_sex {
    .inp {
        width: 38% !important;
    }
}
.flex {
	justify-content: space-between;
	align-items: flex-end;
    .inp {
        width: 70%;
    }
    .btn {
		min-width: 84px;
		width: 5rem;
    }
}


.look {
    color: #7a7a7a;
    text-decoration: underline;
}
.checkbox {
	justify-content: space-between!important;
	// > *{
		// width: 2rem !important;
	// }
}

.date_picker{
	width: 100%;
	/deep/.el-input__inner{
		padding-left: 1.5rem!important;
	}
}

.radio_group{
	display: flex;
	flex-wrap: nowrap;
}

@media only screen and (max-width: 1024px) {
	.login_warpper{
		width: 90vw;
	}
	.name_sex{
		flex-wrap: wrap;
		.inp{
			width: 100%!important;
		}
		.radio_group{
			width: 100%;
			margin-top: 1rem;
		}
	}
}
</style>
