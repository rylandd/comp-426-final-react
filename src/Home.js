import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.startJokeGame = this.startJokeGame.bind(this);
        this.startQuoteGame = this.startQuoteGame.bind(this);
    }

    startJokeGame () {
        alert("Start Joke Game!")
    }

    startQuoteGame () {
        alert("Start Quote Game!")
    }

    render() {
        return (
            <section className="section">
                <div className="container block has-text-centered">
                    <p className="title">
                        APIGuessr!
                    </p>
                    <p className="subtitle">
                        Fun guessing games involving silly REST APIs!
                    </p>
                </div>
                <div className="level">
                    <button className="button is-large level-item" onClick={this.startJokeGame}>Joke API Guessr</button>
                    <button className="button is-large level-item" onClick={this.startQuoteGame}>Famous Quote Guessr</button>
                </div>
            </section>
        );
    }
}

export default Home;
