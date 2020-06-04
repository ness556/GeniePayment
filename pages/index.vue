<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          支払い情報入力
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="患者番号"
            v-model="karte"
            outlined
          ></v-text-field>
          <p>
            患者番号：1234
          </p>
          <p>
            氏名：吉田　憲司
          </p>
          <v-text-field
            label="支払金額"
            v-model="billing"
            outlined
          ></v-text-field>円
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="send">
            送信
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import config from '../store/config';

export default {
  data () {
    return {
      karte: '',
      billing: ''
    }
  },
  mounted() {
    // 子コンポーネントのロードを無視して実行
    this.$nextTick(() => {
      console.log('mounted START')
      // ビュー全体がレンダリングされた後に実行
      // APIからデータロード
      this.$store.commit('getListAPI', config.TARGET_API1)
    })
  },
  computed: {
  },
  methods: {
    send () {
      const payload = { karte: this.karte, billing:this.billing, target:config.TARGET_API1}
      this.$store.commit('send', payload)
  
    },
  }
}
</script>
