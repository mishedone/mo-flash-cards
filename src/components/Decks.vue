<template>
    <div class="row">
        <div class="col-12 text-center mb-3">
            <h1 class="h2">Choose your deck</h1>
        </div>
        
        <div v-for="deck in decks" class="col-sm-4 col-lg-2"
             :key="deck.slug">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <h4 class="card-title">{{ deck.name }}</h4>
                   
                    <a href="#" role="button" class="btn btn-success btn-sm">
                        Front
                    </a>
                        
                    <a href="#" role="button" class="btn btn-dark btn-sm ml-1">
                        Back
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import decks from './data'

    export default {
        name: 'Decks',
        data () {
            return {
                decks: decks
            }
        }
    }
</script>