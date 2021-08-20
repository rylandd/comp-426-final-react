import React from "react";
import DadJoke from "./DadJoke.js";
import Pun from './Pun';

export default class JokeGame extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            score: 0,

        })
    }

    render () {
        return (
            <div>
                <Pun/>
                <DadJoke/>
            </div>
        )
    }
}