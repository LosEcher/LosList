<!-- @format -->

<template>
    <div class="item">
        <div v-for="(item, index) in treeData" :key="index">
            <los-tree-item
                :key="index"
                ref="treeitem"
                :item="item"
                @hit-enter="enterItem"
                @hit-tab="tabItem"
                @hit-delete="deleteItem"
                @hit-input="inputContent"
            >
            </los-tree-item>
            <div
                class="childrenitems"
                v-show="isOpen"
                v-if="item.children && item.children.length"
            >
                <los-tree
                    :propsitem="item.children"
                    @hit-input="inputContent"
                ></los-tree>
            </div>
        </div>
    </div>
</template>

<script>
console.log("LosTree >>>");
import LosTreeItem from "../losTree/losTreeItem.vue";
export default {
    name: "LosTree",
    components: { LosTreeItem },
    props: ["propsitem"],
    data() {
        return {
            isOpen: true,
            treeData: [{ id: 1, name: "Untitled" }],
        };
    },
    beforeMount() {
        if (this.propsitem && this.propsitem.length) {
            this.treeData = this.propsitem;
        } else {
            this.treeData = [{ id: 1, name: "Untitled" }];
            // this.propsitem = [{ id: 1, name: "Untitled" }];
        }
    },
    watch: {
        propsitem: function (newVal, oldVal) {
            // watch it
            console.log("Prop changed: ", newVal, " | was: ", oldVal);
            this.treeData = this.propsitem;
        },
    },
    methods: {
        toggle: function () {
            console.log("child > toggle");
            this.isOpen = !this.isOpen;
        },
        enterItem: function (item) {
            console.log("child > enterItem", this);
            const itemindex = item.$vnode.key;
            const itemscount = item.$parent.treeData.length;
            const newitem = itemindex + 1;
            this.treeData.splice(newitem, 0, {
                id: itemscount,
                name: "",
                children: [],
            });
            this.$nextTick(() =>
                this.$refs.treeitem[
                    newitem
                ].$refs.inputitem.$refs.inputelement.focus()
            );
        },
        addSubitem: function () {
            console.log("child > addSubitem", this.treeData);
            // this.$emit("new-line", this.treeData);
            this.$emit("add-subitem", this.treeData);
            this.isOpen = true;
        },
        tabItem: function (item) {
            console.log("child > tabItem", item);
            const itemkey = item.$vnode.key;
            if (itemkey) {
                const indexitem = item.$vnode.key - 1;
                const target = item.$parent.treeData[indexitem];
                if (!target.children) {
                    target.children = [];
                }
                target.children.push(item.value);
                item.$parent.treeData.splice(itemkey, 1);
                this.$emit("hit-input");
            }
        },
        deleteItem: function (item) {
            console.log("child > deleteItem", this.treeData);
            const itemkey = item.$vnode.key;
            item.$parent.treeData.splice(itemkey, 1);
        },
        inputContent: function () {
            console.log("child > inputContent", this);
            this.$emit("hit-input");
        },
    },
};
</script>
<style>
.childrenitems {
    position: relative;
    padding-left: 20px;
}
</style>
