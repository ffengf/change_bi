<template>
    <div id="header" class="flexC">
        <div class="w75vw min_width1100 flexBC sm-down ">
            <img
                src="@/assets/img/logo.png"
                class="logo"
                alt="logo"
            />
            <div>
                <el-menu mode="horizontal" class="tab" router>
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
                    :placeholder="$t('搜索读书会')"
                    v-model="input"
                >
                    <i class="el-input__icon el-icon-search" slot="suffix"> </i>
                    <template slot-scope="props">
                        <div class="name">{{ props.item.value }}</div>
                        <span class="addr">{{ props.item.address }}</span>
                    </template>
                </el-autocomplete>
            </div>
            <div class="right">
                <div class="icon">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-service"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>{{ $t('公告') }}</el-dropdown-item>
                            <el-dropdown-item>{{ $t('常见问题') }}</el-dropdown-item>
                            <el-dropdown-item>{{ $t('1：1问题与反馈') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="icon">
                    <el-dropdown trigger="click" @command="language">
                        <span class="el-dropdown-link">
                            <i class="iconfont icon-diqiu"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="zh">Chinese</el-dropdown-item>
                            <el-dropdown-item command="ko">韩语</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-button class="btn" size="mini" type="success">{{ $t('登录') }}</el-button>
                <el-button class="btn" type="text">{{ $t('注册') }}</el-button>
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
            />
            <div class="right">
                <el-button class="btn" size="mini" type="success">{{ $t('登录') }}</el-button>
                <el-button class="btn" type="text">{{ $t('注册') }}</el-button>
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
            name: this.$t("读书会申请"),
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
		{
            name: this.$t("读书会申请"),
            index: "/a",
            children: [
                {
                    name: this.$t("创造与批评俱乐部"),
                    index: "/a/1",
                },
                {
                    name: this.$t("xxx读书会"),
                    index: "/a/2",
                },
            ],
        },
        {
            name: this.$t("读书会申请"),
            index: "/c",
            children: [
                {
                    name: this.$t("创造与批评俱乐部"),
                    index: "/c/1",
                },
                {
                    name: this.$t("xxx读书会"),
                    index: "/c/2",
                },
            ],
        },
        {
            name: this.$t("每日连载"),
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
    ];

	language(e:string){
		this.$i18n.locale = e
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
</style>
