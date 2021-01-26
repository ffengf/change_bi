<template>
    <div class="summernoteBox" v-if="true">
        <div :id="id"></div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: "",
        },
        id: {
            type: String,
            default: "summernote" + new Date().getTime(),
        },
    },
    watch: {
        id: {
            handler(newval) {
                //    console.log(newval)
            },
            immediate: true,
        },
    },
    data() {
        return {
            // id:'summerNOte'+ new Date().getTime(),
        };
    },
    created() {},
    mounted() {
        var self = this;
        self.summernoteInit().then(() => {
            $("#" + self.id).on(
                "summernote.change",
                function (we, contents, $editable) {
                    self.summerNoteChange();
                }
            );
            $("#" + self.id).summernote("code", this.value);
        });
    },
    methods: {
        summernoteInit() {
            var self = this;
            return new Promise((resolve) => {
                $("#" + self.id).summernote({
                    lang: "ko-KR",
                    placeholder: "",
                    height: 200,
                    width: "auto",
                    htmlMode: true,
                    toolbar: [
                        // ['style', ['style']],
                        ["font", ["bold", "italic", "underline", "clear"]],
                        ["color", ["color"]],
                        // ['font',['strikethrough','superscript','subscript']],
                        ["para", ["ul", "ol", "paragraph"]],
                        ["table", ["table"]],
                        ["fontsize", ["fontsize"]],
                        ["fontname", ["fontname"]],
                        ["insert", ["link", "picture", "video"]],
                        // ['view', ['fullscreen', 'codeview', 'help']]
                    ],
                    fontSizes: [
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "14",
                        "16",
                        "18",
                        "20",
                        "24",
                        "36",
                    ],
                    fontSizeUnits: ["px", "pt"],
                    fontNames: [
                        "NotoSansKR",
                        "NotoSansKR-Bold",
                        "Nanum Gothic",
                        "NanumMyeongjo",
                    ],
                    fontNamesIgnoreCheck: [
                        "NotoSansKR",
                        "NotoSansKR-Bold",
                        "Nanum Gothic",
                        "NanumMyeongjo",
                    ],
                    callbacks: {
                        onSubmit: function () {
                            // vm.richContent = $('#summernote').summernote('code')
                        },
                        onKeyup: function () {
                            //
                        },
                        onImageUpload: function (files) {
                            var formData = new FormData();
                            formData.append("file", files[0]);
                            $.ajax({
                                url: 'https://api.changbi.com' + "/file_upload",
                                type: "POST",
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    $("#" + self.id).summernote(
                                        "insertImage",
                                        data.url,
                                        "img"
                                    );
                                },
                            });
                        },
                    },
                });
                resolve();
            });
        },
        summerNoteChange() {
            var self = this;
            self.$emit("input", $("#" + self.id).summernote("code"));
        },
    },
};
</script>
<style lang='less' scoped>
.summernoteBox /deep/ .note-dropdown-menu {
    font-size: 15px;
}
.summernoteBox /deep/ .note-editable ul {
    padding: 0 20px;
}
.summernoteBox /deep/ .note-editable ul li {
    list-style: disc;
}
.summernoteBox /deep/ .note-editable ol li {
    list-style: decimal;
}
.summernoteBox /deep/ .note-editable ol {
    padding: 0 20px;
}
</style>

