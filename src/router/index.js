import Vue from 'vue'
import Router from 'vue-router'
import Decks from '@/components/Decks'
import Learn from '@/components/Learn'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'decks',
        component: Decks
    }, {
        path: '/learn/:deckSlug',
        name: 'learn',
        component: Learn
    }],
    mode: 'history'
})
