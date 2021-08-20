import React from "react";
import Home from './Home.js';
import JokeGame from './JokeGame.js';
import Quote from './Quote.js';

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
    this.setState({screen: (<Quote app={this}/>)});
  }

  goHome () {
    this.setState({screen: (<Home app={this}/>)});
  }

  render() {
    return this.state.screen;
  }
}

export default App;
