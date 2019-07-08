// 入口文件
// 在webpack中使用vue
// 注： 在webpack中使用import导入的Vue构造函数，功能不完全，只提供了runtime-only的方式，并没有提供向往也那样的使用方式
// import Vue from  'vue'
import Vue from 'vue'

import VueRouter from 'vue-router'
import app from './app'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueRouter)
Vue.prototype.$http = axios
var vm = new Vue({
    el: '#app',
    data: {
        message: 123
    },
    // components: {
    //     login
    // }
    // render: function (createElements) {
    //     return createElements(login);
    // }
    // 简写
    render: c => c(app),
    router // 挂在路由对象
})
