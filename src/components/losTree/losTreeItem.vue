<!-- @format -->

<template>
    <div class="line-item">
        <div class="bullet" :class="{ folder: !isFolder }" @click="toggle">
            <div class="dot"></div>
        </div>
        <los-input
            class="line-content"
            :value="value"
            @hit-enter="enterItem"
            @hit-tab="tabItem"
            @hit-delete="deleteItem"
            @hit-input="inputContent"
            ref="inputitem"
        ></los-input>
    </div>
</template>

<script>
console.log("LosTreeItem >>>");
import LosInput from "../losInput/losInput.vue";
export default {
    name: "LosTreeItem",
    components: { LosInput },
    props: ["item"],
    data() {
        return {
            isOpen: true,
            value: this.item,
        };
    },
    watch: {
        item: function (newVal, oldVal) {
            // watch it
            console.log("Prop changed: ", newVal, " | was: ", oldVal);
            this.value = this.item;
        },
    },
    computed: {
        isFolder: function () {
            return this.value.children && this.value.children.length;
        },
    },
    methods: {
        toggle: function () {
            console.log("item > toggle");
            this.isOpen = !this.isOpen;
        },
        enterItem: function (item) {
            console.log("item > enterItem", this, item);
            this.$emit("hit-enter", this);
        },
        tabItem: function () {
            console.log("item > tabItem");
            this.$emit("hit-tab", this);
        },
        deleteItem: function (item) {
            console.log("item > deleteItem", this, item);
            this.$emit("hit-delete", this);
        },
        inputContent: function () {
            console.log("item > inputContent", this);
            this.$emit("hit-input");
        },
    },
};
</script>

<style scoped>
.line-item {
    line-height: 24px;
    position: relative;
}

.line-item .bullet {
    display: block;
    position: absolute;
    left: 3px;
    top: 3px;
    height: 6px;
    width: 6px;
    cursor: pointer;
    border: 6px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
    transition: border 0.2s;
}

.notopened .line-item .bullet {
    border-color: #ccc;
}
.line-item .bullet:hover {
    border-color: #888;
}

.line-item .dot {
    border: 3px solid #444;
    border-radius: 3px;
}

.line-item .line-content {
    padding-left: 24px;
}
</style>
