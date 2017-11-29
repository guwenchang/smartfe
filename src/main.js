import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import Filters from './filter/index'

Vue.use(ElementUI)

Vue.config.productionTip = false
Filters.install(Vue)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
