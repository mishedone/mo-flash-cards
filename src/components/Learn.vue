<template>
    <div class="row justify-content-center">
        <div class="col-12">
            <h1 class="h2 text-center mb-3">Learning {{ deck.name }}</h1>

            <div class="row justify-content-center">
                <div class="col-12 col-sm-6 col-md-4 mb-3">
                    <div class="card h-100 text-white bg-success">
                        <div class="card-body d-flex align-items-center justify-content-center">
                            {{ question }}
                        </div>
                    </div>
                </div>
            
                <div class="col-12 col-sm-6 col-md-4 mb-3">
                    <div class="card text-white bg-dark">
                        <div class="card-body">
                            <b-input-group id="show-hint">
                                <b-form-input type="text" v-model="guess"
                                              placeholder="Type in translation"></b-form-input>
                                <b-input-group-button>
                                    <b-button @click="hint = true">?</b-button>
                                </b-input-group-button>
                            </b-input-group>

                            <b-popover :show.sync="hint" target="show-hint" placement="bottom">
                                {{ answer }}
                            </b-popover>
                        </div>
                    </div>
                </div>
            </div>

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
            const deck = decks.find((deck) => deck.slug === this.$route.params.deckSlug)

            return {
                deck: deck,
                cards: deck.cards.slice(),
                guess: '',
                hint: false
            }
        },
        watch: {
            guess () {
                this.checkGuess()
            }
        },
        computed: {
            question () {
                return this.cards[0].front
            },
            answer () {
                return this.cards[0].back
            }
        },
        methods: {
            checkGuess () {
                if (this.answer.toLowerCase() === this.guess.toLowerCase()) {
                    this.cards.splice(0, 1)
                    this.guess = ''
                    this.hint = false
                }
            }
        }
    }
</script>