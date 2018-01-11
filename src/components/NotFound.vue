<template>
    <div class="row justify-content-center">
        <div class="col-12 pb-3">
            <h1 class="h2 text-center mb-3">Oops... Nothing to show here.</h1>

            <router-link :to="{ name: 'decks' }" role="button"
                         class="btn btn-primary w-100">
                Explore Decks
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>