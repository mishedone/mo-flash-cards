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
                        <a className="navbar-brand w-100 text-center" href="/">Flash Cards</a>
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
            deck: null
        }
    }

    render() {
        const decks = this.props.decks.map((deck) => (
            <div id={deck.slug} className="col-sm-4 col-lg-2">
                <div className="card mb-3">
                    <div className="card-body text-center">
                        <h4 className="card-title">{deck.name}</h4>
                        <a href="#" role="button" className="btn btn-success btn-sm">Front</a>
                        <a href="#" role="button" className="btn btn-dark btn-sm ml-1">Back</a>
                    </div>
                </div>
            </div>
        ));

        const learn = this.state.deck ? <DeckLearn deck={this.state.deck} /> : '';

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
        return (
            <div className="row">
                <div className="col-12 text-center mb-3">
                    <h2 className="h2">Learning ...</h2>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
