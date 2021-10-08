import React, { Component } from "react";
import axios from 'axios';

export default class Pun extends Component {
    state = {
        error: null,
        isLoaded: false,
        data: null
    };

    componentDidMount() {
        axios.get("https://v2.jokeapi.dev/joke/Any", {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Ryland - rylandd@me.com'
            }
        }).then(
            result => {
                this.setState({
                    isLoaded: true,
                    data: result.data
                });
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

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (data.type === "single") {
                return (
                    <div>{data.joke}</div>
                );
            }
            else {
                return (
                    <div>{data.setup} {data.delivery}</div>
                )
            }
        }
    }
}