import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import {sync} from "vuex-router-sync";
import mavonEditor from 'mavon-editor'

Vue.use(mavonEditor);

Vue.use(ViewUI);
import './assets/css/reset.scss'
import 'mavon-editor/dist/css/index.css'
import 'view-design/dist/styles/iview.css';


Vue.config.productionTip = false


sync(store,router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')