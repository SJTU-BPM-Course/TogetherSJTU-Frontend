// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import VueQrcode from '@chenfengyuan/vue-qrcode';

Vue.component(VueQrcode.name, VueQrcode);
var axios = require('axios')
axios.defaults.baseURL = 'http://47.103.222.155:8443/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://47.103.222.155:3000', //options object is Optional
  })
);
Vue.use(Vuex)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: {App},
  template: '<App/>'
})


// el 属性提供一个在页面上已存在的 DOM 元素作为 Vue 对象的挂载目标
// router 代表该对象包含 Vue Router， 并使用项目中定义的路由
// components 表示该对象包含的 Vue 组件
// template 是用一个字符串模板作为 Vue 实例的标识使用，类似于定义一个 html 标签。
