<template>
    <div>
        <ProgressCircular v-show="loading" />
        <form-dialog
        :propsDialog.sync="propsDialog"
        >
            <Button
                :classString="'success ml-1 mt-2'"
                slot="btn"
                @click="propsDialog=true"
            >
                学チカ編集
            </Button>
            <GakutikaUpdateCard slot="formCard" @uploaded="propsDialog=false" :gakutika="getGakutika" />
        </form-dialog>
        <GakutikaBasicShowCard :gakutika="getGakutika" v-show="!loading" />
    </div>
</template>
<script>
import Button from "@/components/atoms/Button.vue";
import GakutikaBasicShowCard from "@/components/organisms/GakutikaBasicShowCard";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";
import FormDialog from "@/components/organisms/FormDialog";
import GakutikaUpdateCard from "@/components/organisms/GakutikaUpdateCard";

export default {
    name: "GakutikaShowCard",
    components: {
        Button,
        GakutikaBasicShowCard,
        ProgressCircular,
        FormDialog,
        GakutikaUpdateCard,
    },
    data() {
        return {
            loading: false,
            propsDialog: false,
        }
    },
    created: function() {
        this.loading = true;
        this.$store.dispatch("gakutikas/fetchGakutika", {id: this.$route.params.id })
        .then(() => {
            console.log("更新完了");
            this.loading = false;
        })
    },
    computed: {
        getGakutika:  {
            get() {
                console.log(this.$store.state.gakutikas.gakutika);
                console.log("paro");
                return this.$store.state.gakutikas.gakutika;
            }
        }
    }

}
</script>