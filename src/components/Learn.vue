<template>
    <div class="row">
        <div class="col-12 text-center mb-3">
            <h1 class="h2">Learning {{ deck.name }}</h1>
        </div>

        <div class="col-12">
            <router-link :to="{ name: 'decks' }" role="button"
                         class="btn btn-primary w-100">
                Back to Decks
            </router-link>
        </div>
    </div>
</template>

<script>
    import decks from './data'

    export default {
        name: 'Learn',
        data () {
            return {
                deck: decks.find((deck) => deck.slug === this.$route.params.deckSlug)
            }
        }
    }
</script>