import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld';
import Login from '../components/Login';
import DadJokes from '../components/DadJokes'
import Register from '../components/Register'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/login', 
            name: 'login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/register',
            component: Register, 
            meta: {
                guest: true
            }
        },
        {
            path: '/jokes',
            component: DadJokes,
            meta: {
                requiresAuth: true
            }
        }

    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(localStorage.getItem('jwt') == null){
            next({
                path: '/login', 
                params: {nextUrl: to.fullPath}
            })
        } else {
            next({name: 'dadjokes'})
        }
    }
})

export default router