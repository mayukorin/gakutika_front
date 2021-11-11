<template>
<div>
    <Button @click="startOrder" v-show="!orderFlag">並び替え開始</Button>
    <Button @click="setOrder" v-show="orderFlag">並び替え完了</Button>
    <v-expansion-panels accordion>
        <draggable :options="options" class="ww"  v-model="getGakutikas" :disabled="!orderFlag">
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
    name: "GakutikaList",
    components: {
        Gakutika,
        draggable,
        Button
    },
    data() {
        return {
            gakutikas: [],
            // displayGakutikas: [],
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
            // this.gakutikas = this.displayGakutikas;
            /*
            this.gakutikas.map((gakutika, index) => {
                gakutika.order = index + 1;
            });
            */
            // this.displayGakutikasChange();
        },
        pageChange: function(pageNumber) {
            this.page = pageNumber;
            // this.displayGakutikasChange();
        },
        /*
        displayGakutikasChange: function() {
            this.displayGakutikas = this.gakutikas.slice(this.pageSize*(this.page-1), this.pageSize*(this.page));
        },
        */
        startOrder: function() {
            this.orderFlag = true;
            // this.displayGakutikas = this.gakutikas;
        },
        setdragGakutikas: function(gakutikas) {
            this.dragGakutikas = gakutikas;
        }
    },
    /*
    mounted: function() {
        this.$store.dispatch("gakutikas/fetchGakutikaList")
        .then(() => {
            console.log(this.$store.state.gakutikas.gakutikas);
            // this.setGakutika(this.$store.state.gakutikas.gakutikas);
            this.length = Math.ceil(this.getGakutikas.length/this.pageSize);
        })
        // this.displayGakutikasChange();
    },
    */
    created: function() {
        this.$store.dispatch("gakutikas/fetchGakutikaList")
        .then(() => {
            console.log(this.$store.state.gakutikas.gakutikas);
            // this.setGakutika(this.$store.state.gakutikas.gakutikas);
            this.length = Math.ceil(this.getGakutikas.length/this.pageSize);
        })
        // this.displayGakutikasChange();
    },
    computed: {
        getGakutikas: {
            get() {
                return this.$store.state.gakutikas.gakutikas;
            },
            set(value) {
                this.$store.dispatch("gakutikas/setGakutikaList", { sortedGakutikas: value });
            }
        },
        displayGakutikas:function() {
            if (this.orderFlag) return this.getGakutikas;
            else return this.getGakutikas.slice(this.pageSize*(this.page-1), this.pageSize*(this.page));
        }
    }

}
</script>
<style scoped>
    .ww {
        width: 100%;
    }
</style>