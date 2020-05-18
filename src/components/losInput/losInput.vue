<!-- @format -->

<template>
    <input
        :class="{ isSelected }"
        ref="inputelement"
        autocomplete="false"
        spellcheck="false"
        @input="hitInput"
        @keydown.enter="hitEnter"
        @keydown.tab="hitTab"
        @keydown.delete="hitDelete"
        v-model="message.name"
        :placeholder=placeholderStr
        :style="styleObject"
    />
</template>

<script>
import i18n from "../../utils/I18n.js";
export default {
    name: "LsInput",
    props: {
        value: Object,
    },
    data() {
        return {
            isSelected: false,
            message: this.value,
            styleObject: { width: "200px" },
            placeholderStr: "new Item",
        };
    },
    watch: {
        value: function (newVal, oldVal) {
            console.log("Prop changed: ", newVal, " | was: ", oldVal);
            this.message = this.value;
        },
    },
    created() {
        this.setString();
    },
    mounted() {
        console.log("mounted input", this.value.name);
        this.checkWidth();
    },
    methods: {
        hitEnter: function () {
            console.log("input > hitEnter");
            this.$emit("hit-enter", this);
        },
        hitTab: function () {
            console.log("input > hitTab");
            this.$emit("hit-tab", this);
        },
        hitDelete: function () {
            console.log("input > hitDelete");
            if (this.value.name == "") {
                this.$emit("hit-delete", this);
            }
        },
        hitInput: function () {
            console.log("hitInput");
            this.checkWidth();
            this.$emit("hit-input", this.treeData);
        },
        checkWidth() {
            // 检查撤回操作
            if (this.$refs && this.$refs.inputelement) {
                const saveWidth = 6;
                let targetWidth = this.$refs.inputelement.offsetWidth;
                // scrollWidth
                const targetScrollWidth = this.$refs.inputelement.scrollWidth;
                if (targetScrollWidth > targetWidth) {
                    targetWidth = targetScrollWidth + saveWidth;
                }
                const diffWidth = window.innerWidth - targetWidth;
                console.log("diff width", diffWidth);
                if (diffWidth > 50) {
                    this.styleObject.width = targetWidth + "px";
                }
            }
        },
        setString() {
            this.placeholderStr = i18n.message.placeholderStr;
        },
    },
};
</script>

<style>
input {
    border: none;
    font-size: 1em;
}
input:focus {
    outline: none;
}
</style>
