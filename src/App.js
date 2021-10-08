import React from "react";
import Home from './Home.js';
import JokeGame from './JokeGame.js';
import QuoteGame from "./QuoteGame";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: (<Home app={this}/>),
      jokeHighScore: 0,
      quoteHighScore: 0
    };
    this.startJokeGame = this.startJokeGame.bind(this);
    this.startQuoteGame = this.startQuoteGame.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  startJokeGame () {
    this.setState({screen: (<JokeGame app={this}/>)});
  }

  startQuoteGame () {
    this.setState({screen: (<QuoteGame app={this}/>)});
  }

  goHome () {
    this.setState({screen: (<Home app={this}/>)});
  }

  render() {
    return (
        <div>
          <nav className="navbar">
            <div className="navbar-brand">
              <button className="button navbar-item" onClick={this.goHome}>Home</button>
            </div>
          </nav>
          {this.state.screen}
        </div>
    );
  }
}

export default App;
