import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import '@/mock/mockServer' //引入加载
import 'swiper/css/swiper.min.css'
import Pagination from './components/Pagination'

// 不使用vuex去做，将接口请求函数挂载到vue原型对象上
// 引入api模块中的所有分别暴露的函数，封装到API对象中
import * as API from '@/api'

import './validate' 

// 注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

//将API对象保存到vue的原型对象上===>让所有的组件对象都直接可见（不用再引入API）
Vue.prototype.$API=API


Vue.config.productionTip = false

new Vue({
  
  render: h => h(App),
  router, //配置路由器 ==> 所有的组件都可以通过$router属性得到路由器对象
  store, //注册vuex的store  使所有的组件都可以通过$store来得到store对象

  
  beforeCreate () {// 尽量早些
    // 将全局事件总线对象(vm)保存到Vue原型对象上
    Vue.prototype.$bus = this
  },

}).$mount('#app')
