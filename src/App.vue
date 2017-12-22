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

<style>
    /* fill in the missing media based width classes */
    @media (min-width: 576px) {
        .w-sm-50 {
            width: 50% !important;
        }
    }
    
    @media (min-width: 768px) {
        .w-md-25 {
            width: 25% !important;
        }
    }
    
    /* pointer cursor */
    .pointer {
        cursor: pointer;
    }

    /* center bottom popovee arrow */
    .popover.bs-popover-bottom .arrow::before,
    .popover.bs-popover-bottom .arrow::after {
        margin-left: -50% !important;
    }
</style>