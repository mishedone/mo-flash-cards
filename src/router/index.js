import Vue from 'vue'
import Router from 'vue-router'
import Decks from '@/components/Decks'
import Learn from '@/components/Learn'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'decks',
        component: Decks
    }, {
        path: '/learn/:deckSlug/:direction?',
        name: 'learn',
        component: Learn
    }, {
        path: '*',
        name: 'not-found',
        component: NotFound
    }],
    mode: 'history'
})
