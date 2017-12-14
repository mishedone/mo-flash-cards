<template>
    <div class="row justify-content-center">
        <div class="col-12 text-center mb-3">
            <h1 class="h2">Choose your deck</h1>
        </div>
        
        <div v-for="deck in decks" class="col-sm-4 col-lg-2"
             :key="deck.slug">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <h4 class="card-title">{{ deck.name }}</h4>
                   
                    <router-link :to="{ name: 'learn', params: { deckSlug: deck.slug }}"
                                 role="button" class="btn btn-success btn-sm">
                        Front
                    </router-link>
                        
                    <router-link :to="{ name: 'learn', params: { deckSlug: deck.slug, direction: 'back' }}"
                                 role="button" class="btn btn-dark btn-sm ml-1">
                        Back
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import decks from './data'

    export default {
        name: 'Decks',
        data () {
            return {
                decks: decks
            }
        },
        created () {
            axios.get('http://127.0.0.1:9101/api/decks')
                .then(response => {
                    this.decks = response.data
                })
        }
    }
</script>