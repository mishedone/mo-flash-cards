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
                                <b-form-input type="text" ref="guessInput" v-model="guess"
                                              placeholder="Type in translation"></b-form-input>
                                <b-input-group-button>
                                    <b-button @click="showHint">?</b-button>
                                </b-input-group-button>
                            </b-input-group>

                            <b-popover :show.sync="hint" target="show-hint" placement="bottom"
                                       triggers="" no-fade="true">
                                {{ answer }}
                            </b-popover>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-12 align-content-stretch flex-wrap">
            <dl class="float-left w-100 w-sm-50 w-md-25 pr-3"
                v-for="qa in answered" :key="qa.question">
                <dt>{{ qa.question }}</dt>
                <dd>{{ qa.answer }}</dd>
            </dl>
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
            const deck = decks.find((deck) => deck.slug === this.$route.params.deckSlug)

            return {
                deck: deck,
                cards: deck.cards.slice(),
                guess: '',
                hint: false,
                answered: []
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
                    this.answered.unshift({
                        question: this.question,
                        answer: this.answer
                    })
                    this.cards.splice(0, 1)
                    this.guess = ''
                    this.hint = false
                }
            },
            showHint () {
                this.hint = true
                this.$refs.guessInput.$el.focus()
            }
        }
    }
</script>