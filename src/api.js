import axios from 'axios'

class Api {
    constructor (base) {
        this.base = base
    }

    getDecks () {
        return axios.get(this.base + '/decks')
    }

    getDeck (slug) {
        return axios.get(this.base + '/decks/' + slug)
    }

    getPronounceUrl (text) {
        return this.base + '/text-to-speech/' + btoa(text)
    }
}

export default new Api('http://127.0.0.1:9101')
