import axios from 'axios';
import config from './config';

export const strict = false

export const state = () => (
  {
    auth: {},
    accessToken:'',
    loggedIn: false,
    smsResult:false,
    clientId: '',
  }
)

export const getters = {
  authHeader (state:any) {
    return {
      'accesstoken': state.auth.accessToken,
      'client': state.auth.client,
      'uid': state.auth.uid,
    }
  }
}

export const mutations = {
  //APIを切り替えてデータを取得
  getListAPI(state:any, target:string){
    console.log('callListAPI START : ' + target)
    switch (target) {
      case config.TARGET_API1:
        axios.get(process.env.API_URI + '/v1/companies').then(res => {
          const items = res.data;
          state.clients = items.companies
        }).catch(error => {
          console.log('callListAPI ERROR!')
        });
        break;
      case config.TARGET_API2:
        axios.get(process.env.API_URI + '/v1/students').then(res => {
          const items = res.data;
          console.log(items)
          state.students = items
        }).catch(error => {
          console.log('callListAPI ERROR!')
        });
        break;
      case config.TARGET_API3:
        axios.get(process.env.API_URI + '/v1/matters').then(res => {
          const items = res.data;
          state.matters = items.matters
          console.log(items.matters)
        }).catch(error => {
          console.log('callListAPI ERROR!')
        });
        break;
      default:
        console.log('callListAPI ERROR!')
        break;
    }
  },
  searchPatient (state:any, payload:any) {
    console.log('send : ' + payload.karte + ' ' + payload.billing);
    // TODO APIコール
    if(payload.karte = '1234'){
      state.clientId = '1111'
    }else{
      state.clientId = '';
    }
  },
  sendSMS (state:any, payload:any) {
    console.log('send : ' + payload.karte + ' ' + payload.tel);
    // TODO SMSの送信処理
    state.smsResult = true;
  },
  setAuth (state:any, auth:any) {
    state.accessToken = auth.accessToken;
  },
  deleteAuth (state:any) {
    state.auth = {}
  },
}