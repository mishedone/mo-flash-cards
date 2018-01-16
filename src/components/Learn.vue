<template>
    <div class="row justify-content-center">
        <div class="col-12">
            <h1 class="h2 text-center mb-3">Learning {{ deck.name }}</h1>
            
            <h2 v-if="done" class="h4 text-center mb-3">
                Congratulations! You've answered all the cards.
            </h2>
            
            <h2 v-else-if="!cards.length" class="h4 text-center mb-3">
                There are now cards in this deck...
            </h2>

            <div v-else class="row justify-content-center">
                <div class="col-12 col-sm-6 col-md-4 mb-3">
                    <div class="card h-100 text-white" :class="[questionClass]">
                        <div class="card-body position-relative d-flex align-items-center justify-content-center">
                            {{ question }}
                            
                            <button type="button"
                                    class="btn btn-light btn-sm position-absolute pointer"
                                    style="right: 5px; bottom: 5px;"
                                    @click="pronounce">
                                <span class="oi oi-volume-high" title="Pronounce" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
            
                <div class="col-12 col-sm-6 col-md-4 mb-3">
                    <div class="card text-white" :class="[answerClass]">
                        <div class="card-body">
                            <b-input-group id="show-hint">
                                <b-form-input type="text" ref="guessInput" v-model="guess"
                                              placeholder="Type in translation"></b-form-input>
                                <b-input-group-button>
                                    <b-button @click="showHint" variant="light" class="pointer">?</b-button>
                                </b-input-group-button>
                            </b-input-group>

                            <b-popover :show.sync="hint" target="show-hint" placement="bottom"
                                       triggers="" :no-fade="true">
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
        
        <div class="col-12 pb-3">
            <router-link :to="{ name: 'decks' }" role="button"
                         class="btn btn-primary w-100">
                Back to Decks
            </router-link>
        </div>
    </div>
</template>

<script>
    import api from '@/api'

    export default {
        name: 'Learn',
        data () {
            const forward = this.$route.params.direction !== 'back'

            return {
                deck: {},
                cards: [],
                questionProp: forward ? 'front' : 'back',
                questionClass: forward ? 'bg-success' : 'bg-dark',
                answerProp: forward ? 'back' : 'front',
                answerClass: forward ? 'bg-dark' : 'bg-success',
                guess: '',
                hint: false,
                answered: [],
                done: false
            }
        },
        created () {
            api.getDeck(this.$route.params.deckSlug).then(response => {
                this.deck = response.data
                this.cards = this.deck.cards.slice()
            })
        },
        watch: {
            guess () {
                this.checkGuess()
            }
        },
        computed: {
            current () {
                return this.cards[0]
            },
            question () {
                return this.current[this.questionProp].trim()
            },
            answer () {
                return this.current[this.answerProp].trim()
            }
        },
        methods: {
            checkGuess () {
                if (this.cards.length && this.answer.toLowerCase() === this.guess.toLowerCase()) {
                    this.answered.unshift({
                        question: this.question,
                        answer: this.answer
                    })
                    this.cards.splice(0, 1)
                    this.guess = ''
                    this.hint = false
                    if (this.cards.length === 0) {
                        this.done = true
                    }
                }
            },
            showHint () {
                this.hint = true
                this.$refs.guessInput.$el.focus()
            },
            pronounce () {
                const audio = new Audio(api.getPronounceUrl(this.question))
                audio.play()
            }
        }
    }
</script>