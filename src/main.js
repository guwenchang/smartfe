import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import Filters from './filter/index'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Filters.install(Vue)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
