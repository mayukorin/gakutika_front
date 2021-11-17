<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="7">
          <div class="caption grey--text">タイトル</div>
          <div>{{ gakutika.title }}</div>
        </v-col>
        <v-col cols="6" md="2" @click.stop="handleClick">
            <div class="caption grey--text">詳細</div>
            <v-icon>mdi-magnify-plus</v-icon>
        </v-col>
        <v-col cols="6" md="2">
          <div class="caption grey--text">削除</div>
          <v-icon>mdi-delete</v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      {{ gakutika.content }}
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  name: "Gakutika",
  props: {
    gakutika: {
      type: Object,
    },
    onFetchGakutika: {
      type: Function,
    },
  },
  methods: {
    handleClick: function () {
      this.onFetchGakutika({id: this.gakutika.id } );
    }
  }
};
</script>
