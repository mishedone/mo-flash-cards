import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const decks = [
    {
        name: 'Marketing',
        slug: 'marketing',
        cards: [
            {
                front: 'John',
                back: 'Doe'
            }
        ]
    },
    {
        name: 'Developers',
        slug: 'development',
        cards: []
    },
    {
        name: 'Sales',
        slug: 'sales',
        cards: []
    },
    {
        name: 'Support',
        slug: 'support',
        cards: []
    }
];

class App extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark mb-3">
                    <div className="container-fluid">
                        <a className="navbar-brand w-100 text-center" href="/">
                            Flash Cards
                        </a>
                    </div>
                </nav>
                <div className="container-fluid">
                    <DeckList decks={decks} />
                </div>
            </div>
        );
    }
}

class DeckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            direction: ''
        }
    }
    
    learn(deck, direction) {
        this.setState({
            deck: deck,
            direction: direction
        });
    }

    render() {
        const decks = this.props.decks.map((deck) => (
            <div id={deck.slug} className="col-sm-4 col-lg-2">
                <div className="card mb-3">
                    <div className="card-body text-center">
                        <h4 className="card-title">{deck.name}</h4>
                        
                        <button type="button" className="btn btn-success btn-sm"
                                onClick={() => this.learn(deck, 'front')}>
                            Front
                        </button>
                        
                        <button type="button" className="btn btn-dark btn-sm ml-1"
                                onClick={() => this.learn(deck, 'back')}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        ));

        const learn = this.state.deck ? <DeckLearn deck={this.state.deck}
                                                   direction={this.state.direction} /> : '';

        return (
            <div>
                <div className="row">
                    <div className="col-12 text-center mb-3">
                        <h1 className="h2">Choose your deck</h1>
                    </div>
                    {decks}
                </div>

                {learn}
            </div>
        );
    }
}

class DeckLearn extends React.Component {
    render() {
        const title = `Learning ${this.props.deck.name} (${this.props.direction})`;
        const cards = this.props.deck.cards.map((card) => (
            <li>{card.front} => {card.back}</li>
        ));
        
        return (
            <div className="row">
                <div className="col-12 text-center mb-3">
                    <h2 className="h2">{title}</h2>
                </div>
                
                <ul className="list-unstyled">
                    {cards}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
