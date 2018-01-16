import api from '@/api'

class Data {
    constructor () {
        this.data = null
    }
}

class Store {
    constructor () {
        this._decks = new Data()
    }

    get decks () {
        if (this._decks.data === null) {
            api.getDecks().then(response => {
                this._decks.data = response.data
            })
        }
        return this._decks
    }
}

export default new Store()
