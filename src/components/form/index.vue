<template>
    <el-form>
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
                    <el-input v-model="data.info[ele.prop]" />
                </template>
            </el-form-item>
        </template>
    </el-form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
    data = {
        info: {
            radio: 1,
            input: "",
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
                show({ radio }: any) {
                    return radio === 0 ? true : false;
                },
            },
        ],
    };
}
</script>

<style lang="less" scoped>
