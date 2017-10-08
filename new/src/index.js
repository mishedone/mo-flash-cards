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
        name: 'Development',
        slug: 'development'
    },
    {
        name: 'Crazy Department',
        slug: 'crazy-department'
    }
];

class App extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Flash Cards</a>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <DeckList decks={decks} />
                    </div>
                </div>
            </div>
        );
    }
}

class DeckList extends React.Component {
    render() {
        const decks = this.props.decks.map((deck) => (
            <tr>
                <td>
                    <a href="#/deck/learn/<%= deck.get('slug') %>" class="btn btn-default btn-xs" aria-label="Front to back">
                        <span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                    </a>
                    <a href="#/deck/learn/<%= deck.get('slug') %>/back-to-front"class="btn btn-default btn-xs" aria-label="Back to front">
                        <span class="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
                    </a>

                    {deck.name}
                </td>
            </tr>
        ));
        return (
            <div>
                <h1>Choose your deck</h1>
                <table className="table">
                    <tbody>
                        {decks}
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
