import React from "react";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
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
                    <button className="button is-large level-item" onClick={this.props.app.startJokeGame}>Joke API Guessr</button>
                    <button className="button is-large level-item" onClick={this.props.app.startQuoteGame}>Famous Quote Guessr</button>
                </div>
            </section>
        );
    }
}
