import Vue from 'vue'
import App from './App.vue'
import store from './store'
import registerDirectives from './directives'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import initRoutes from './router/routes'

// Init routes
initRoutes()

// Init ElementUI
Vue.use(ElementUI)

//Init Directives
registerDirectives(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
