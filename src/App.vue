<template>
    <div id="app">
        <nav class="navbar navbar-dark bg-dark mb-3">
            <div class="container-fluid">
                <a class="navbar-brand w-100 text-center" href="/">
                    Flash Cards
                </a>
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
