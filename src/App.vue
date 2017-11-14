<template>
    <div id="app">
        <nav class="navbar navbar-dark bg-dark mb-3">
            <div class="container-fluid">
                <router-link :to="{ name: 'decks' }" class="navbar-brand w-100 text-center">
                    Flash Cards
                </router-link>
            </div>
        </nav>
        <div class="container-fluid">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>