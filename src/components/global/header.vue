<template>
    <div id="header">
        <img
            src="@/assets/img/logo.png"
            class="logo"
            alt="logo"
			v-if="isPc"
        />
		<div @click="key = true" v-if="isPhone">
			<i class="el-icon-menu"></i>
		</div>
        <div v-if="isPc">
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
        <div class="inp" v-if="isPc">
            <el-autocomplete
                popper-class="my-autocomplete"
                :placeholder="$t('请输入内容')"
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
            <div class="line"></div>
            <el-button class="btn" size="mini" type="success">{{ $t('登录') }}</el-button>
            <el-button class="btn" type="text">{{ $t('注册') }}</el-button>
        </div>
        <el-drawer :visible.sync="key" direction="ltr" :withHeader="false" :showClose="false" size="60%" class="drawer">
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
		// this.$i18n.locale = e
	}

    created() {}
}
</script>

<style lang="less" scoped>
#header {
    box-sizing: border-box;
    width: 100vw;
    height: 7vh;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding: 0 10vw;
    align-items: center;
    .el-icon-menu {
        font-size: 30px;
    }
    .tab {
        border: none !important;
    }
    .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        width: 16rem;
        .line {
            width: 1px;
            height: 2vh;
            background: #000000;
        }
        .icon i {
            font-size: 20px;
            cursor: pointer;
        }
    }
}

@media screen and (max-width: 1080px) {
    #header {
        padding: 0;
        justify-content: space-around;
    }
}
// @media screen and (max-width: 768px) {
//     #header {
//         padding: 0 10px;
// 		justify-content: space-between;
//     }
// }
</style>
