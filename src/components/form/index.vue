<template>
	<el-input v-bind="ele" v-on="ele" />
    <!-- <el-form>
        <template v-for="ele in data.element">
            <el-form-item
                v-if="ele.show ? ele.show(data.info) : true"
                :key="ele.prop"
                :prop="ele.prop"
            >
                <template v-if="ele.type === 1">
                    <el-radio-group v-model="data.info[ele.prop]">
                        <el-radio-button
                            v-for="e in ele.values"
                            :label="e.value"
                            :key="e.value"
                            >{{ e.label }}</el-radio-button
                        >
                    </el-radio-group>
                </template>
                <template v-if="ele.type === 2">
                    <el-input  v-model="data.info[ele.prop]" :disable="ele.disable" />
                </template>
            </el-form-item>
        </template>
    </el-form> -->
</template>

<script lang="ts">
type a = []
interface element<T>{
	prop:string
	type:number
	show?:((T:T) => boolean) | boolean
	[propName:string]:any
}

interface data<T> {
	info: T;
	element:element<T>[]
}

interface info {
	radio:number
	input:string
	aaa:string
}

const data:data<info> = {



    info: {
        radio: 1,
		input: "",
		aaa:""
    },
    element: [
        {
            prop: "radio",
            type: 1,
            values: [
                {
                    label: "男111",
                    value: 1,
                },
                {
                    label: "女222",
                    value: 0,
                },
			],
			show:true
		},
		{
            prop: "aaa",
			type: 2,
			show:true
        },
        {
            prop: "input",
            type: 2,
            // show({ radio,input }) {
			// 	return radio === 0 ? true : false;
			// },
			disable:true
        },
    ],
};

import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {

	ele = {
		disabled:false,
		placeholder:'hello wolrd',
		value:"123123",
		input:(e)=>{
			console.log(e)
			this.ele.value = e
		}
	}

    data = {
        info: {
            radio: 1,
			input: "",
			aaa:""
        },
        element: [
            {
                prop: "radio",
                type: 1,
                values: [
                    {
                        label: "男111",
                        value: 1,
                    },
                    {
                        label: "女222",
                        value: 0,
                    },
                ],
			},
            {
                prop: "input",
                type: 2,
                // show({ radio }: any) {
                //     return radio === 0 ? true : false;
				// },
				"show-password":true,
				disabled:true
            },
        ],
    };
}
</script>

<style lang="less" scoped>
