
import VueRouter from 'vue-router'

import accout from './main/accout.vue'
import goodsList from './main/goodsList.vue'
import login1 from './subcom/login.vue'
import register from './subcom/register.vue'
import login from './main/login.vue'

var router = new VueRouter({
    routes: [
        // accout goodsList
        {
            path: '/accout', 
            component: accout,
            children: [
                { path: 'login1', component: login1 },
                { path: 'register', component: register },
            ]
        },
        {
            path: '/goodsList', 
            component: goodsList
        },
        {
            path: '/login', 
            component: login
        }
    ]
})

export default router