<template>
    <div class="date" v-loading="_loading">
        <Bread :new_list="new_list" />


		<div class="box today" v-if="info.today.length !== 0">
            <div class="top">
                <h1>{{ today_title }}</h1>
            </div>
            <div class="bottom">
                <el-card class="card" shadow="never" @click.native="go_info(ele.id,today_title)" v-for="ele in info.today" :key="ele.id">
                    <img
                        :src="ele.cover"
                    />
                    <h1>{{ ele.title }}</h1>
                    <h2>
                        <span class="owner">{{ ele.author_name }} 작가</span>
                        <el-divider
                            direction="vertical"
                            class="lines_000"
                        ></el-divider>
						<span v-if="ele.status === 0" class="status_0">연재중</span>
                        <span v-if="ele.status === 1" class="status_1">완결</span>
                    </h2>
                    <h3>
                        <p v-for="e in ele.chapters.reverse()" :key="e.number" @click.stop="go_chapter(ele.id,e.id,today_title)">
                            {{ e.number }}화<el-divider direction="vertical"></el-divider
                            >{{ e.title }}
                        </p>
                    </h3>
                </el-card>
            </div>
        </div>

		<div class="box" v-if="new Date().getDay() !== 1 && info.o1.length !== 0">
            <div class="top">
                <h1>월요연재</h1>
                <div class="lines"></div>
            </div>
            <div class="bottom">
                <el-card class="card" shadow="never" @click.native="go_info(ele.id,'월요연재')" v-for="ele in info.o1" :key="ele.id">
                    <img
                        :src="ele.cover"
                    />
                    <h1>{{ ele.title }}</h1>
                    <h2>
                        <span class="owner">{{ ele.author_name }} 작가</span>
                        <el-divider
                            direction="vertical"
                            class="lines_000"
                        ></el-divider>
						<span v-if="ele.status === 0" class="status_0">연재중</span>
                        <span v-if="ele.status === 1" class="status_1">완결</span>
                    </h2>
                    <h3>
                        <p v-for="e in ele.chapters.reverse()" :key="e.number" @click.stop="go_chapter(ele.id,e.id,'월요연재')">
                            {{ e.number }}화<el-divider direction="vertical"></el-divider
                            >{{ e.title }}
                        </p>
                    </h3>
                </el-card>
            </div>
        </div>
		<div class="box" v-if="new Date().getDay() !== 2 && info.o2.length !== 0">
            <div class="top">
                <h1>화요연재</h1>
                <div class="lines"></div>
            </div>
            <div class="bottom">
                <el-card class="card" shadow="never" @click.native="go_info(ele.id,'화요연재')" v-for="ele in info.o2" :key="ele.id">
                    <img
                        :src="ele.cover"
                    />
                    <h1>{{ ele.title }}</h1>
                    <h2>
                        <span class="owner">{{ ele.author_name }} 작가</span>
                        <el-divider
                            direction="vertical"
                            class="lines_000"
                        ></el-divider>
						<span v-if="ele.status === 0" class="status_0">연재중</span>
                        <span v-if="ele.status === 1" class="status_1">완결</span>
                    </h2>
                    <h3>
                        <p v-for="e in ele.chapters.reverse()" :key="e.number" @click.stop="go_chapter(ele.id,e.id,'화요연재')">
                            {{ e.number }}화<el-divider direction="vertical"></el-divider
                            >{{ e.title }}
                        </p>
                    </h3>
                </el-card>
            </div>
        </div>
		<div class="box" v-if="new Date().getDay() !== 3 && info.o3.length !== 0">
            <div class="top">
                <h1>수요연재</h1>
                <div class="lines"></div>
            </div>
            <div class="bottom">
                <el-card class="card" shadow="never" @click.native="go_info(ele.id,'수요연재')" v-for="ele in info.o3" :key="ele.id">
                    <img
                        :src="ele.cover"
                    />
                    <h1>{{ ele.title }}</h1>
                    <h2>
                        <span class="owner">{{ ele.author_name }} 작가</span>
                        <el-divider
                            direction="vertical"
                            class="lines_000"
                        ></el-divider>
						<span v-if="ele.status === 0" class="status_0">연재중</span>
                        <span v-if="ele.status === 1" class="status_1">완결</span>
                    </h2>
                    <h3>
                        <p v-for="e in ele.chapters.reverse()" :key="e.number" @click.stop="go_chapter(ele.id,e.id,'수요연재')">
                            {{ e.number }}화<el-divider direction="vertical"></el-divider
                            >{{ e.title }}
                        </p>
                    </h3>
                </el-card>
            </div>
        </div>
		<div class="box" v-if="new Date().getDay() !== 4 && info.o4.length !== 0">
            <div class="top">
                <h1>목요연재</h1>
                <div class="lines"></div>
            </div>
            <div class="bottom">
                <el-card class="card" shadow="never" @click.native="go_info(ele.id,'목요연재')" v-for="ele in info.o4" :key="ele.id">
                    <img
                        :src="ele.cover"
                    />
                    <h1>{{ ele.title }}</h1>
                    <h2>
                        <span class="owner">{{ ele.author_name }} 작가</span>
                        <el-divider
                            direction="vertical"
                            class="lines_000"
                        ></el-divider>
						<span v-if="ele.status === 0" class="status_0">연재중</span>
                        <span v-if="ele.status === 1" class="status_1">완결</span>
                    </h2>
                    <h3>
                        <p v-for="e in ele.chapters.reverse()" :key="e.number" @click.stop="go_chapter(ele.id,e.id,'목요연재')">
                            {{ e.number }}화<el-divider direction="vertical"></el-divider
                            >{{ e.title }}
                        </p>
                    </h3>
                </el-card>
            </div>
        </div>
		<div class="box" v-if="new Date().getDay() !== 5 && info.o5.length !== 0">
            <div class="top">
                <h1>금요연재</h1>
                <div class="lines"></div>
            </div>
            <div class="bottom">
                <el-card class="card" shadow="never" @click.native="go_info(ele.id,'금요연재')" v-for="ele in info.o5" :key="ele.id">
                    <img
                        :src="ele.cover"
                    />
                    <h1>{{ ele.title }}</h1>
                    <h2>
                        <span class="owner">{{ ele.author_name }} 작가</span>
                        <el-divider
                            direction="vertical"
                            class="lines_000"
                        ></el-divider>
						<span v-if="ele.status === 0" class="status_0">연재중</span>
                        <span v-if="ele.status === 1" class="status_1">완결</span>
                    </h2>
                    <h3>
                        <p v-for="e in ele.chapters.reverse()" :key="e.number" @click.stop="go_chapter(ele.id,e.id,'금요연재')">
                            {{ e.number }}화<el-divider direction="vertical"></el-divider
                            >{{ e.title }}
                        </p>
                    </h3>
                </el-card>
            </div>
        </div>

		<div class="box on">
            <div class="top">
                <h1>스위치 ON</h1>
                <div class="lines"></div>
            </div>
            <div class="bottom">
                <el-card class="card" shadow="never" @click.native="go_info(ele.id,'스위치 ON')" v-for="ele in info.top" :key="ele.id">
                    <img
                        :src="ele.cover"
                    />
                    <h1>{{ ele.title }}</h1>
                    <h2>
                        <span class="owner">{{ ele.author_name }} 작가</span>
                        <el-divider
                            direction="vertical"
                            class="lines_000"
                        ></el-divider>
						<span v-if="ele.status === 0" class="status_0">연재중</span>
                        <span v-if="ele.status === 1" class="status_1">완결</span>
                    </h2>
                    <h3>
                        <p v-for="e in ele.chapters.reverse()" :key="e.number" @click.stop="go_chapter(ele.id,e.id,'스위치 ON')">
                            {{ e.number }}화<el-divider direction="vertical"></el-divider
                            >{{ e.title }}
                        </p>
                    </h3>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bread from "@/components/bread/index.vue";
import { api_serial, date_info } from "@/api";
@Component({
    components: {
        Bread,
    },
})
export default class extends Vue {
    new_list = [{ title: "매일연재" }];

    info: date_info = {
        o1: [],
        o2: [],
        o3: [],
        o4: [],
        o5: [],
        today: [],
        top: [],
	};

    async get_info() {
		this._loading = true
        const info = await api_serial.date_list().finally(()=>{
			this._loading = false
		});
		this.info = info
	}

	go_chapter(book_id:number,info_id:number,bread_date:string){
		this.$router.push(`/serial/chapter_info/${book_id}/${info_id}?bread_date=${bread_date}`)
	}

	go_info(id:number,bread_date:string){
		this.$router.push(`/serial/book_info/${id}?bread_date=${bread_date}`)
	}

    created() {
        this.get_info();
	}

	get today_title(){
		return ['월요연재','화요연재','수요연재','목요연재','금요연재'][new Date().getDay() - 1]
	}
}
</script>



<style lang='less' scoped>
.date {
    * {
        box-sizing: border-box;
    }
    .box {
        width: 100%;
        margin-bottom: 5.65rem;
        .top {
            height: 5.75rem;
            border: 1px solid #3fa535;
            margin-bottom: 1.25rem;
            h1 {
                padding: 1rem 0 0 1.5rem;
                font-size: 30px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
				letter-spacing: -1.5px;
				color: #3fa535;
            }
            .lines {
                margin: 1rem 0 0 1.5rem;
                width: 0.8rem;
                height: 2px;
                background: #324b9b;
            }
        }
        .bottom {
            display: flex;
            width: 100%;
            .card {
                margin-left: 1.25rem;
                border-radius: 0;
				cursor: pointer;
				width: 33%;
                &:nth-of-type(1) {
                    margin: 0;
                }
                /deep/.el-card__body {
                    padding: 0 !important;
                }
                img {
                    height: 11rem;
                    width: 16rem;
                }
                h1 {
                    margin-top: 1.25rem;
                    // font-family: NotoSansKR;
                    font-size: 19px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.95px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 16rem;
                }
                h2 {
                    margin: 0.65rem 0 0.76rem 0;
                    font-family: NotoSansKR-Medium;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.3px;
                }
                h3 {
                    font-family: NotoSansKR-Regular;
                    font-size: 13px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
					letter-spacing: -0.33px;
					color: #858585;
                    p {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 16rem;
                    }
                }
            }
        }
    }
}
.on {
    .top {
        background: #324b9b;
        border: none !important;
        h1{
			color: #fff !important;
		}
        .lines {
            background: #7eec73 !important;
        }
    }
}

.today{
	.top {
        background: #3fa535;
        border: none !important;
        h1{
			color: #fff !important;
		}
        .lines {
            background: #ffdb7b !important;
        }
    }
}
.lines_000 {
    background: #000 !important;
}


.status_0{
	color: #3fa535;
}
.status_1{
	color: #324b9b;
}

@media only screen and (max-width: 1024px) {
    .date{
		.box{
			margin-bottom: 3rem!important;
			.bottom{
				flex-wrap: wrap!important;
				.card{
					width: 100%;
					margin: 1rem 0;
				}
				/deep/.el-card__body {
					display: flex;
					flex-direction: column;
					// align-items: center;
				}
				h1,h2,h3{
					width: auto!important;
				}
				h3{
					width: 100%!important;
					// text-align: center;
					display: flex!important;
					flex-direction: column!important;
					// align-items: center;
					p{
						width: 85%!important;
						// width: auto!important;
					}
				}
				img {
                    width: 90vw!important;
                }
			}
		}
	}
}
</style>
