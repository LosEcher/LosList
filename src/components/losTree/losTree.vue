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

<script lang="ts">
console.log("LosTree >>>");
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import LosTreeItem from "../losTree/losTreeItem.vue";
import { TreeDataType } from "../../types/index";
@Component({
    components: {
        LosTreeItem,
    },
})
export default class LosTree extends Vue {
    @Prop({ default: [] }) propsitem!: Array<TreeDataType>;

    isOpen = true;
    treeData = [{ id: 1, name: "Untitled" }];

    beforeMount() {
        if (this.propsitem && this.propsitem.length) {
            this.treeData = this.propsitem;
        } else {
            this.treeData = [{ id: 1, name: "Untitled" }];
        }
    }
    @Watch("propsitem")
    onChange(newVal: TreeDataType, oldVal: TreeDataType) {
        // watch it
        console.log("Prop changed: ", newVal, " | was: ", oldVal);
        this.treeData = this.propsitem;
    }

    toggle() {
        console.log("child > toggle");
        this.isOpen = !this.isOpen;
    }

    enterItem(item: any) {
        console.log("child > enterItem", this);
        const itemindex = item.$vnode.key;
        const itemscount = item.$parent.treeData.length;
        const newitemindex = itemindex + 1;
        const newitem: TreeDataType = {
            id: itemscount,
            name: "",
            remark: "",
            children: [],
        };
        this.treeData.splice(newitemindex, 0, newitem);
        this.$nextTick(() =>
            this.$refs.treeitem[
                newitemindex
            ].$refs.inputitem.$refs.inputelement.focus()
        );
    }

    addSubitem() {
        console.log("child > addSubitem", this.treeData);
        this.$emit("add-subitem", this.treeData);
        this.isOpen = true;
    }

    tabItem(item: any) {
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
    }

    deleteItem(item: any) {
        console.log("child > deleteItem", this.treeData);
        const itemkey = item.$vnode.key;
        item.$parent.treeData.splice(itemkey, 1);
    }

    inputContent() {
        console.log("child > inputContent", this);
        this.$emit("hit-input");
    }
}
</script>
<style>
.childrenitems {
    position: relative;
    padding-left: 20px;
}
</style>
