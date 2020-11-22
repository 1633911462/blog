import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.mixin({
  data () {
    return {
      ip: 'http://175.24.126.252:8888'
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
