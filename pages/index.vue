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
            患者番号：
            <input
              type="text"
              v-model="karte"
            >
          </p>
          <p v-if = "karte == '1234'">
            氏名:吉田　憲司
          </p>
          <p v-else-if = "karte == '1428'">
            氏名:山田　太郎
          </p>
          <p v-else>
            氏名:
          </p>
          <v-text-field
            label="支払金額"
            v-model="billing"
            outlined
          ></v-text-field>
           <input
              type="text"
              v-model="billing"
            >円
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="sendBilling">
            送信
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">患者のクレジット情報が登録されていません。</v-card-title>
        <v-card-text>
          SMSでクレジットカードによる請求情報を送信します。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            キャンセル
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="sendSMS"
          >
            送信
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-dialog
      v-model="dialogConfirm"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">患者情報の確認ができました。</v-card-title>
        <v-card-text>
          以下の内容で請求いたします。
        </v-card-text>
        <p>
          患者番号： 
          <input
              type="text"
              v-model="karte"
            ></p>
          <p v-if = "karte == '1234'">
            氏名:吉田　憲司
          </p>
          <p v-else-if = "karte == '1428'">
            氏名:山田　太郎
          </p>
          <p>
          請求金額： 
          <input
              type="text"
              v-model="billing"
            >円</p>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialogConfirm = false"
          >
            キャンセル
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="sendSMS"
          >
            送信
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogSuccess"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">完了しました。</v-card-title>
        <v-card-text>
          患者様への請求が完了しました。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            キャンセル
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="sendSMS"
          >
            送信
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogError"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">送信エラー</v-card-title>
        <v-card-text>
          不具合により請求を行えませんでした。
        </v-card-text>
          <v-text-field
            label="電話番号"
            v-model="tel"
            outlined
          ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            キャンセル
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="sendSMS"
          >
            送信
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-flex>
    <div class="bg" />
  </v-layout>
</template>

<script>
import config from '../store/config';

export default {
  data () {
    return {
      dialog: false,//ダイアログを初期状態では表示させないためfalseにする
      dialogConfirm: false,
      dialogSuccess: false,
      dialogError: false,
      karte: '',
      billing: '',
      tel:''
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
    sendBilling () {
      const payload = { karte: this.karte, billing:this.billing, target:config.TARGET_API1}
      this.$store.commit('searchPatient', payload)
      // 送信先で新患かチェック
      // 新患の場合は以下のダイアログを表示
      if(this.$store['state']['clientId'] ==''){
        //新患確認ダイアログ表示(dialogをtrueにするだけ)
        this.dialog = true
      }else {
        this.dialogConfirm = true
      }
    },
    sendSMS () {
      const payload = { karte: this.karte, tel:this.tel, target:config.TARGET_API1}
      this.$store.commit('sendSMS', payload)
      console.log(this.$store['state']['smsResult'])
    }
  }
}
</script>
