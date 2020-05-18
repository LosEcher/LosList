<!-- @format -->

<template>
    <div class="the-list-tree">
        <div class="paper-bg">
            <los-tree
                class="lostree"
                :propsitem="listItemData"
                @hit-input="inputContent"
            ></los-tree>
        </div>
    </div>
</template>

<script>
import LosTree from "./losTree.vue";
import * as util from "../../utils/util.js";
export default {
    name: "LosTreeNode",
    components: { LosTree },
    props: ["nodeid"],
    data() {
        return {
            listItemData: [],
            rootItem: { name: "Untitled" },
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            const tmp = util.getLocalStorage(this.nodeid);
            this.listItemData = tmp;
        },
        inputContent() {
            console.log("node > input", this);
            util.setLocalStorage(this.nodeid, this.listItemData);
        },
    },
};
</script>

<style scoped>
.the-list-tree {
    padding: 20px;
    width: 100%;
}
.paper-bg {
    min-height: 800px;
    padding: 10px;
}
</style>

<style>
.the-list-tree {
    background-color: var(--main-bg-color);
}
.paper-bg {
    background-color: var(--main-paper-color);
    box-shadow: var(--block-shadow);
}
</style>
