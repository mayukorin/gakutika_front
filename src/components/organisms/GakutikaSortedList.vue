<template>
    <div>
        <Button @click="startOrder" v-show="!orderFlag">並び替え開始</Button>
        <Button @click="setOrder" v-show="orderFlag">並び替え完了</Button>
        <v-expansion-panels accordion>
            <draggable :options="options" class="ww" v-model="gakutikas" :disabled="!orderFlag">
                <Gakutika v-for="gakutika in displayGakutikas" :key="gakutika.title" :gakutika="gakutika"/>
            </draggable>
        </v-expansion-panels>
        <v-pagination
        v-model="page"
        :length="length"
        @input="pageChange"
        color="success"
        v-show="!orderFlag"
        ></v-pagination>
    </div>
</template>
<script>
import Gakutika from "@/components/molecules/Gakutika";
import draggable from "vuedraggable";
import Button from "@/components/atoms/Button.vue";
export default {
    name: "GakutikaSortedList",
    components: {
        Gakutika,
        draggable,
        Button
    },
    props: {
        gakutikas: []
    },
    data() {
        return {
            options: {
                animation: 200
            },
            page: 1,
            length: 0,
            pageSize: 2,
            orderFlag : false,
            dragGakutikas: [],
        }
    },
    methods: {
        setOrder: function() {
            this.orderFlag = false;
            this.gakutikas.map((gakutika, index) => {
                gakutika.order = index + 1;
            });
            
        },
        pageChange: function(pageNumber) {
            this.page = pageNumber;
        },
        startOrder: function() {
            this.orderFlag = true;
            // this.displayGakutikas = this.gakutikas;
        },
        setLength: function(length) {
            this.length = length;
        }
    },
    computed: {
        displayGakutikas:function() {
            this.setLength(Math.ceil(this.gakutikas.length/this.pageSize));
            if (this.orderFlag) return this.gakutikas;
            else return this.gakutikas.slice(this.pageSize*(this.page-1), this.pageSize*(this.page));
        }
    }
}
</script>
<style scoped>
    .ww {
        width: 100%;
    }
</style>