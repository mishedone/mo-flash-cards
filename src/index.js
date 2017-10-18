import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const decks = [
    {
        name: 'Marketing',
        slug: 'marketing'
    },
    {
        name: 'Developers',
        slug: 'development'
    }
];

class App extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid text-center">
                        <a className="navbar-brand" href="/">Flash Cards</a>
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
    render() {
        const decks = this.props.decks.map((deck) => (
            <div id={deck.slug} className="col-2">
                <div className="card">
                    <div className="card-body text-center">
                        <h4 className="card-title">{deck.name}</h4>
                        <a href="#" role="button" className="btn btn-success btn-sm">Front</a>
                        <a href="#" role="button" className="btn btn-dark btn-sm ml-1">Back</a>
                    </div>
                </div>
            </div>
        ));
        return (
            <div className="row">
                <div className="col-12 text-center">
                    <h1 className="h2">Choose your deck</h1>
                </div>
                {decks}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
