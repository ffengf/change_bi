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
                <el-menu mode="horizontal" class="tab" router text-color="#000">
                    <template v-for="ele in tab">
                        <el-submenu :key="ele.index" :index="ele.index">
                            <template slot="title">{{ ele.name }}</template>
                            <el-menu-item
                                v-for="e in ele.children"
                                :index="e.index"
                                :key="e.index"
                                >{{ e.name }}</el-menu-item
                            >
                        </el-submenu>
                    </template>
                </el-menu>
            </div>
            <div class="inp">
                <el-autocomplete
                    popper-class="my-autocomplete"
                    placeholder="독서모임을검색해보세요."
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
                <div class="icon">
                    <el-dropdown trigger="click" @command="customer">
                        <span class="el-dropdown-link">
                            <!-- <i class="el-icon-service"></i> -->
							<img src="@/assets/img/customer.png" alt="" srcset="">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="/customer/notice">공지사항</el-dropdown-item>
                            <el-dropdown-item command="/customer/problem">자주묻는질문</el-dropdown-item>
                            <el-dropdown-item command="/customer/answer">1:1문의</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-button class="btn" size="mini" type="success" @click="$router.push('/login/signin')">{{ $t('登录') }}</el-button>
                <el-button class="btn color_000" type="text" @click="$router.push('/login/signup')">{{ $t('注册') }}</el-button>
            </div>
            <el-drawer append-to-body :visible.sync="key" direction="ltr" :withHeader="false" :showClose="false" size="60%" class="drawer">
                <el-menu router>
                    <template v-for="ele in tab">
                        <el-submenu :key="ele.index" :index="ele.index">
                            <template slot="title">{{ ele.name }}</template>
                            <el-menu-item
                                v-for="e in ele.children"
                                :index="e.index"
                                :key="e.index"
                                >{{ e.name }}</el-menu-item
                            >
                        </el-submenu>
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
            <div class="right">
                <el-button class="btn" size="mini" type="success" @click="$router.push('/login/signin')">{{ $t('登录') }}</el-button>
                <el-button class="btn" type="text" @click="$router.push('/login/signup')">{{ $t('注册') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
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
                    name: '클럽창작과비평',
                    index: "/club/creation",
                },
                {
                    name: '북클럽필라멘트',
                    index: "/club/apply",
                },
            ],
        },
        {
            name: '매일연재',
            index: "/lianzai",
            children: [
                {
                    name: this.$t("周一连载"),
                    index: "/lianzai/1",
                },
                {
                    name: this.$t("周二连载"),
                    index: "/lianzai/2",
                },
                {
                    name: this.$t("周三连载"),
                    index: "/lianzai/3",
                },
                {
                    name: this.$t("周四连载"),
                    index: "/lianzai/4",
                },
                {
                    name: this.$t("周五连载"),
                    index: "/lianzai/5",
                },
                {
                    name: this.$t("SWICH连载"),
                    index: "/lianzai/s",
                },
            ],
		},
		{
            name: '이벤트',
            index: "/read",
            children: [
                {
                    name: this.$t("创造与批评俱乐部"),
                    index: "/read/1",
                },
                {
                    name: this.$t("xxx读书会"),
                    index: "/read/2",
                },
            ],
		},
    ];

	language(e:string){
		this.$i18n.locale = e
	}

	customer(link:string){
		this.$router.push(link)
	}

    created() {}
}
</script>

<style lang="less" scoped>
#header {
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
    }
    .right {
        display: flex;
        align-items: center;
        overflow: hidden;
        .icon{
            padding:0 20px;
        }
        .icon+.icon{
            border-right:1px solid rgb(136,136,136);
            margin-right:20px;
        }
        .icon i {
            font-size: 20px;
            cursor: pointer;
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

</style>
