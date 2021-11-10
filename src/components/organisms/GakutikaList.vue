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
    name: "GakutikaList",
    components: {
        Gakutika,
        draggable,
        Button
    },
    data() {
        return {
            gakutikas: [
                { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!', order: 1 },
                { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!', order: 2 },
                { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!', order: 3 },
                { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!', order: 4 },
            ],
            // displayGakutikas: [],
            options: {
                animation: 200
            },
            page: 1,
            length: 0,
            pageSize: 2,
            orderFlag : false,
        }
    },
    methods: {
        setOrder: function() {
            this.orderFlag = false;
            // this.gakutikas = this.displayGakutikas;
            this.gakutikas.map((gakutika, index) => {
                gakutika.order = index + 1;
            });
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
        }
    },
    mounted: function() {
        this.length = Math.ceil(this.gakutikas.length/this.pageSize);
        // this.displayGakutikasChange();
    },
    computed: {
        displayGakutikas:function() {
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