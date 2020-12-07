<template>
    <div id="header" class="flexC">
        <div class="w75vw min_width1100 flexBC sm-down ">
            <img
                src="@/assets/img/logo.png"
                class="logo"
                alt="logo"
				@click="$router.push('/')"
            />
            <div>
                <el-menu menu-trigger="click" mode="horizontal" class="tab" router text-color="#000" active-text-color="#3fa535">
                    <template v-for="(ele,index) in tab">
                        <el-submenu :key="index + ele.index" :index="ele.index" v-if="ele.children">
                            <template slot="title"><h1>{{ ele.name }}</h1></template>
                            <el-menu-item
                                v-for="(e,i) in ele.children"
                                :index="e.index"
                                :key="i + e.index"
                                >{{ e.name }}</el-menu-item
                            >
                        </el-submenu>
						<el-menu-item :index="ele.index" :key="index + ele.index"  v-else ><h1>{{ ele.name }}</h1></el-menu-item>
						<div class="lines" :key="ele.index"></div>
                    </template>
                </el-menu>
            </div>
            <div class="inp">
                <el-autocomplete
                    popper-class="my-autocomplete"
                    placeholder="독서모임을 검색해보세요."
                    v-model="input"
                >
                    <i class="el-input__icon el-icon-search" slot="suffix"></i>
                    <template slot-scope="props">
                        <div class="name">{{ props.item.value }}</div>
                        <span class="addr">{{ props.item.address }}</span>
                    </template>
                </el-autocomplete>
            </div>
            <div class="right">
                <div :class="['icon',active === 'customer' ? 'active':'']">
                    <el-dropdown trigger="click" @command="customer" placement="bottom" @visible-change="is_active($event,'customer')">
                        <span class="el-dropdown-link">
							<img src="@/assets/img/customer.png" alt="" srcset="">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="/customer/notice">공지사항</el-dropdown-item>
                            <el-dropdown-item command="/customer/problem">자주묻는질문</el-dropdown-item>
                            <el-dropdown-item command="/customer/answer">1:1문의</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
				<el-divider class="divider" direction="vertical"></el-divider>
                <template v-if="!is_login">
					<el-button class="btn" size="mini" type="success" @click="$router.push('/login/signin')">로그인</el-button>
					<el-button class="btn color_000" type="text" @click="$router.push('/login/signup')">회원가입</el-button>
				</template>
				<template v-else>
					<div :class="['icon',active === 'user' ? 'active':'']">
						<el-dropdown trigger="click" @command="user" placement="bottom" @visible-change="is_active($event,'user')">
							<span class="el-dropdown-link">
								<img src="@/assets/img/user.png" width="23px" alt="" srcset="">
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="logout">logout</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</template>
            </div>
            <el-drawer append-to-body :visible.sync="key" direction="ltr" :withHeader="false" :showClose="false" size="60%" class="drawer">
                <el-menu router>
                    <template v-for="ele in tab">
                        <el-submenu :key="ele.index" :index="ele.index" v-if="ele.children">
                            <template slot="title"><h1>{{ ele.name }}</h1></template>
                            <el-menu-item
                                v-for="e in ele.children"
                                :index="e.index"
                                :key="e.index"
                                >{{ e.name }}</el-menu-item
                            >
                        </el-submenu>
						<el-menu-item :index="ele.index" :key="ele.index"  v-else ><h1>{{ ele.name }}</h1></el-menu-item>
                    </template>
                </el-menu>
            </el-drawer>
        </div>
        <div class="w100vw flexBC sm-up">
            <div @click="key = true">
                <i class="el-icon-menu"></i>
            </div>
            <img
                src="@/assets/img/logo.png"
                class="logo_sm"
                alt="logo"
				@click="$router.push('/')"
            />
            <div class="right" v-if="!is_login">
                <el-button class="btn" size="mini" type="success" @click="$router.push('/login/signin')">로그인</el-button>
                <el-button class="btn" type="text" @click="$router.push('/login/signup')">회원가입</el-button>
            </div>
			<div class="right" v-else>
				success
			</div>
        </div>
    </div>
</template>

<script lang="ts">
import { UserModule } from "@/store/user";
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
    key = false;

    input = "";

    tab = [
		{
            name: '모임신청',
            index: "/club",
            children: [
                {
                    name: '클럽 창작과비평',
                    index: "/club/creation",
                },
                {
                    name: '북클럽 필라멘트',
                    index: "/club/apply",
                },
            ],
        },
        {
            name: '매일연재',
            index: "/serial",
		},
		{
            name: '이벤트',
            index: "/read",
		},
    ];

	active:'customer'|''|'user' = ''

	is_active(type:boolean,active:'customer'|'user'){
		if(type){
			this.active = active
		}else{
			this.active = ''
		}
	}

	get is_login(){
		return UserModule.token !== '' && UserModule.token !== null
	}


	customer(link:string){
		this.$router.push(link)
	}

	user(type:string){
		if(type === 'logout'){
			UserModule.logout()
			this.$message.success('logout success')
			this.$router.push('/')
		}else{
			this.$router.push(type)
		}
	}

    created() {}
}
</script>

<style lang="less" scoped>
#header {
	/deep/.el-menu--horizontal > .el-submenu.is-active .el-submenu__title{
		border-width: 6px!important;
	}
	/deep/.el-menu--horizontal > .el-menu-item.is-active{
		border-width: 6px!important;
	}
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
	align-items: center;
	/deep/.el-submenu__title{
		font-size: 16px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		// line-height: 1.88;
		letter-spacing: -1.2px;
		font-family: NotoSansKR-Medium;
	}
	/deep/.el-icon-arrow-down:before{
		content: '';
	}
	.inp{
		/deep/.el-input__inner{
			width: 10rem;
			font-size: 13px;
			border-width: 2px !important;
		}
		.el-icon-search{
			font-size: 28px;
			font-weight: 900;
		}
	}
    .el-icon-menu {
        font-size: 30px;
    }
    .tab {
        border: none !important;
        flex-wrap: nowrap;
		display: flex;
		width: 25rem;
		justify-content: space-between;
		align-items: center;
		h1{
			font-size: 16px;
			font-weight: 500;
			font-stretch: normal;
			font-style: normal;
			letter-spacing: -1.2px;
			font-family: NotoSansKR-Medium;
		}
		.lines{
			height: 13px;
			width: 1px;
			background: #000;
			margin: 10px;
			&:nth-last-of-type(1){
				display: none;
			}
		}
    }
    .right {
        display: flex;
        align-items: center;
        overflow: hidden;
        .icon i {
            cursor: pointer;
		}
		.divider{
			margin: 0 1.5rem;
			background: #000;
		}
		/deep/.el-dropdown-menu{
			border: 1px solid red!important;
		}
	}
}
.logo_sm{
    height:35px;width:auto
}
.sm-up{
    padding:0 10px;
}
img{
	cursor: pointer;
}
.active /deep/ .el-dropdown{
	&::after{
		content: '';
		position: absolute;
		display: block;
		height: 7px;
		width: 20px;
		background: #3fa535;
		bottom: -5px;
		z-index: 1000;
	}
}

</style>
<style lang="less">
.el-dropdown-menu{
	border: 1px solid #3fa535;
	// margin-top: -7px;
	top: 39px!important;
	border-radius: 0!important;
	.popper__arrow{
		display: none;
	}
}
.el-menu--popup{
	position: absolute!important;
	top: -6px!important;
	left: -50px!important;
	border: 1px solid #3fa535!important;
	border-radius: 0;
	li{
		text-align: center;
		&:hover{
			background: rgb(217,237,215)!important;
			color: rgb(91,111,175) !important;
		}
	}
	&::after{
		content: '';
		display: block;
		position: absolute;
		top: -6px;
		left: 50%;
		transform: translateX(-50%);
		height: 6px;
		width: 86px;
		background: #3fa535;
	}
}
</style>
