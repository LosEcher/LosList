<!-- @format -->

<template>
    <div class="TreeList">
        <h3>LosList</h3>
        <div class="msg" v-if="err">{{ msg }}</div>
        <div class="grid">
            <div class="addNewBtn" @click="addNew">
                <los-card
                    :itemTitle="addNewBtnStr"
                    :style="styleObj"
                ></los-card>
            </div>
            <div class="itemwrapper" v-if="itemList">
                <div
                    class="blockwrapper"
                    v-for="(item, index) in itemList"
                    :key="index"
                >
                    <router-link
                        class="block"
                        :to="{
                            name: 'LosTree',
                            params: { nodeid: item.id },
                        }"
                    >
                        <los-card
                            :itemTitle="item.name"
                            :itemContent="item.time.createAt"
                            :itemBtn="deleteBtnStr"
                            btnShowType="Hover"
                            @hit-click="deleteItem(item.id, index)"
                        ></los-card>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import util from "../../utils/util"
import i18n from "../../utils/I18n";
import losCard from "./losCard.vue";
@Component({
    components: {
        losCard,
    },
})
export default class LosTreeList extends Vue {
    @Prop(String) link: string | undefined;

    err = null;
    msg = "no data";
    itemList: any = [];
    addNewBtnStr = "+ Add new";
    deleteBtnStr = "delete";
    styleObj = "border-style: dashed;";

    created() {
        this.getData();
        this.setString();
    }

    addNew() {
        console.log("click add new");
        const newItemId = util.uuidv4();
        const createdAt = new Date();
        const newitem = {
            id: newItemId,
            name: "Untitled",
            time: {
                createAt: createdAt.toLocaleString(),
            },
        };
        this.itemList.push(newitem);
        util.setLocalStorage("losListItems", this.itemList);
        util.setLocalStorage(newItemId, [{ id: 1, name: "Untitled" }]);
        // open new node
        this.$router.push("/lostree/" + newItemId);
    }
    deleteItem(id: number, index: number) {
        console.log("delete item", this, id, index);
        this.itemList.splice(index, 1);
        util.setLocalStorage("losListItems", this.itemList);
        localStorage.removeItem(id.toString());
    }
    getData() {
        const localTmp = util.getLocalStorage("losListItems");
        console.log("index", localTmp, i18n.message.login);
        if (localTmp == null) {
            console.log("no local data \ncheck for cloud data");
            // axios
            //if no cloud data
        } else {
            this.itemList = localTmp;
            // set local data then check cloud data
        }
    }
    setString() {
        this.addNewBtnStr = i18n.message.addNewItem;
        this.deleteBtnStr = i18n.message.deleteBtn;
    }
}
</script>

<style scoped>
.TreeList {
    padding: 10px;
}
.grid {
    display: flex;
    flex-direction: row;
}
.itemwrapper,
.blockwrapper {
    display: flex;
    flex-direction: row;
}

a:-webkit-any-link {
    color: var(--block-title-color);
    text-decoration: none;
}
</style>
