import Vue from 'vue'
import Router from 'vue-router'
import Decks from '@/components/Decks'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Decks',
        component: Decks
    }]
})
