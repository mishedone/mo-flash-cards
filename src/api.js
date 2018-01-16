import axios from 'axios'

class Api {
    constructor () {
        this.root = null
    }

    load () {
        return axios.get('http://127.0.0.1:9101')
            .then(response => {
                this.root = response.data._links
            })
    }

    getDecks () {
        return axios.get(this.root['decks'])
    }

    getDeck (slug) {
        return axios.get(this.root['decks'] + '/' + slug)
    }
}

export default new Api()
