import React from "react";
import AnswerChoice from './AnswerChoice'
import Pun from './Pun';
import axios from "axios";
import DadJoke from "./DadJoke";

export default class JokeGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            joke: {
                error: null,
                isLoaded: false,
                data: null,
                category: null
            },
            score: 0,
            canGuess: false,
            feedback: false,
            correct: null,
            dadJoke: false
        }
        this.categories = ["Programming","Misc","Dark","Pun","Spooky","Christmas"];
        this.fetchJoke = this.fetchJoke.bind(this);
        this.guess = this.guess.bind(this);
    }

    componentDidMount() {
        this.setState({
            score: 0,
        })
        this.fetchJoke();
    }

    guess(answer) {
        if (this.state.canGuess === false) {
            return;
        }
        this.setState({
            canGuess: false,
            feedback: true
        });
        if (answer === this.state.joke.category) {
            this.setState({
                score: this.state.score + 1,
                dadJoke: true
            });
        }
        else {
            if (this.state.score > this.props.app.state.jokeHighScore) {
                this.props.app.setState({jokeHighScore: this.state.score});
            }
            this.setState({score: 0});
        }
        //this.fetchJoke();
    }

    fetchJoke() {
        this.setState({
            joke: {
                error: null,
                isLoaded: false,
                data: null,
                category: null
            },
            feedback: false,
            correct: null,
            dadJoke: false
        })
        axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit", {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Ryland - rylandd@me.com'
            }
        }).then(
            result => {
                let jokeText;
                if (result.data.type === "single") {
                    jokeText = result.data.joke;
                }
                else jokeText = result.data.setup + " " + result.data.delivery;
                this.setState({
                    joke: {
                        isLoaded: true,
                        data: jokeText,
                        category: result.data.category
                    },
                    canGuess: true,
                    correct: result.data.category
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            error => {
                this.setState({
                    joke: {
                        isLoaded: true,
                        error: error
                    }
                });
            }
        );
    }

    render () {

        return (
            <div className="section">
                <div className="container has-text-centered">
                    <h1 className="title">Joke API Guessr</h1>
                    <h2 className="subtitle">Which category of joke is this?</h2>
                    <p className="box">Streak: {this.state.score} | Best: {this.props.app.state.jokeHighScore}</p>
                    <div className="block">
                        <div className="box">
                            {this.state.joke.isLoaded === true ? this.state.joke.data : "Loading..."}
                        </div>
                        {this.state.joke.isLoaded &&
                            <div className="columns">
                                <AnswerChoice text="Programming" onClick={this.guess}
                                              feedback={this.state.feedback ?
                                                  (this.state.correct === "Programming" ? "correct" : "incorrect") : ""}></AnswerChoice>
                                <AnswerChoice text="Misc" onClick={this.guess}
                                              feedback={this.state.feedback ?
                                                  (this.state.correct === "Misc" ? "correct" : "incorrect") : ""}></AnswerChoice>
                                <AnswerChoice text="Dark" onClick={this.guess}
                                              feedback={this.state.feedback ?
                                                  (this.state.correct === "Dark" ? "correct" : "incorrect") : ""}></AnswerChoice>
                                <AnswerChoice text="Pun" onClick={this.guess}
                                              feedback={this.state.feedback ?
                                                  (this.state.correct === "Pun" ? "correct" : "incorrect") : ""}></AnswerChoice>
                                <AnswerChoice text="Spooky" onClick={this.guess}
                                              feedback={this.state.feedback ?
                                                  (this.state.correct === "Spooky" ? "correct" : "incorrect") : ""}></AnswerChoice>
                                <AnswerChoice text="Christmas" onClick={this.guess}
                                              feedback={this.state.feedback ?
                                                  (this.state.correct === "Christmas" ? "correct" : "incorrect") : ""}></AnswerChoice>
                            </div>
                        }
                    </div>
                    {this.state.feedback &&
                    <button className="button is-info mb-3" onClick={this.fetchJoke}>
                        Next
                    </button>
                    }

                    {this.state.dadJoke &&
                        <DadJoke></DadJoke>
                    }
                </div>
            </div>
        )
    }
}