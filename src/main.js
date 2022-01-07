import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    errors:[],
    success:[]
  },
  mutations: {
    addNotification (state, notification){
      if(state[notification.type].length == 0){
        return state[notification.type].push(notification.message);
      }else{
        let errorExist = false;
        for (let i = 0; i < state[notification.type].length; i++) {
          if(state[notification.type][i] == notification.message){
            errorExist = true;
            break;
          }else{
            continue;
          }
        }

        if(errorExist){
          return false;
        }else{
          return state[notification.type].push(notification.message);
        }
      }
    },
    removeNotification(state, notification){
      let notificationExist = false, notificationIndex = 0;
      for (let i = 0; i < state[notification.type].length; i++) {
        if(state[notification.type][i] == notification.message){
          notificationExist = true;
          notificationIndex = i;
          break;
        }else{
          continue;
        }
      }

      if(notificationExist){
        return state[notification.type].splice(notificationIndex, 1);
      }else{
        return false;
      }
    }
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
