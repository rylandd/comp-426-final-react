import React from "react";
import AnswerChoice from './AnswerChoice';
import axios from "axios";
import Wiki from "./Wiki";

export default class QuoteGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: {
                error: null,
                isLoaded: false,
                text: null,
                author: null,
                tags: null
            },
            score: 0,
            canGuess: false,
            answersLoaded: false,
            answerChoices: null,
            feedback: false,
            correct: null
        }
        this.guess = this.guess.bind(this);
        this.fetchQuote = this.fetchQuote.bind(this);
        this.setAnswerChoices = this.setAnswerChoices.bind(this);
    }

    componentDidMount() {
        this.setState({
            score: 0,
        })
        this.fetchQuote();
    }

    guess(answer) {
        if (this.state.canGuess === false) {
            return;
        }
        this.setState({
            canGuess: false,
            feedback: true
        });
        if (answer === this.state.quote.author) {
            this.setState({
                score: this.state.score + 1,
            });
        }
        else {
            if (this.state.score > this.props.app.state.quoteHighScore) {
                this.props.app.setState({quoteHighScore: this.state.score});
            }
            this.setState({score: 0});
        }

        //this.fetchQuote();
    }

    fetchQuote() {
        axios.get("http://api.quotable.io/random", {
            headers: {
                'User-Agent': 'Ryland - rylandd@me.com'
            }
        }).then(
            result => {
                this.setState({
                    quote: {
                        text: result.data.content,
                        author: result.data.author,
                        tags: result.data.tags,
                        isLoaded: true
                    },
                    feedback: false,
                    answersLoaded: false,
                    answerChoices: null,
                    correct: null
                });
                this.setAnswerChoices();
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    setAnswerChoices () {
        let url = "http://api.quotable.io/quotes?tags=";
        this.state.quote.tags.forEach(tag => {
            url += tag + "|";
        });
        axios.get(url,{
            headers: {
                'User-Agent': 'Ryland - rylandd@me.com'
            }
        }).then(
            result => {
                let options = new Set();
                result.data.results.forEach(quote => {
                    if (quote.author !== this.state.quote.author) {
                        options.add(quote.author);
                    }
                });
                let correctIndex = Math.floor(Math.random() * 4);
                let choices = new Array(0);
                let optionArray = [...options];
                for (let i = 0; i < 4; i++) {
                    if (i === correctIndex) {
                        choices.push(this.state.quote.author);
                    }
                    else {
                        choices.push(optionArray.splice(Math.floor(Math.random()*optionArray.length),1)[0]);
                    }
                }
                this.setState({
                    answerChoices: choices,
                    canGuess: true,
                    answersLoaded: true,
                    correct: correctIndex
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    render () {

        return (
            <div className="section">
                <div className="container has-text-centered">
                    <h1 className="title">Famous Quote API Guessr</h1>
                    <h2 className="subtitle">Who said this famous quote?</h2>
                    <p className="box">Streak: {this.state.score} | Best: {this.props.app.state.quoteHighScore}</p>
                    <div className="block">
                        <div className="box">
                            {this.state.quote.isLoaded ? this.state.quote.text : "Loading..."}
                        </div>
                        {this.state.answersLoaded &&
                        <div className="columns">
                            <AnswerChoice
                                text={this.state.answerChoices[0]}
                                onClick={this.guess}
                                feedback={this.state.feedback ?
                                    (this.state.correct === 0 ? "correct" : "incorrect") : ""}></AnswerChoice>
                            <AnswerChoice
                                text={this.state.answerChoices[1]}
                                onClick={this.guess}
                                feedback={this.state.feedback ?
                                    (this.state.correct === 1 ? "correct" : "incorrect") : ""}></AnswerChoice>
                            <AnswerChoice
                                text={this.state.answerChoices[2]}
                                onClick={this.guess}
                                feedback={this.state.feedback ?
                                    (this.state.correct === 2 ? "correct" : "incorrect") : ""}></AnswerChoice>
                            <AnswerChoice
                                text={this.state.answerChoices[3]}
                                onClick={this.guess}
                                feedback={this.state.feedback ?
                                    (this.state.correct === 3 ? "correct" : "incorrect") : ""}></AnswerChoice>
                        </div>
                        }
                    </div>
                    {this.state.feedback &&
                        <button className="button is-info mb-3" onClick={this.fetchQuote}>
                            Next
                        </button>
                    }
                    {this.state.feedback &&
                        <Wiki author={this.state.quote.author}></Wiki>
                    }
                </div>
            </div>
        )
    }
}