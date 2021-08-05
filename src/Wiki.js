import React, { Component } from "react";
import axios from 'axios';

export default class Wiki extends Component {
    state = {
        error: null,
        isLoaded: false,
        data: null
    };

    componentDidMount() {
        let url = "https://en.wikipedia.org/w/api.php?origin=*";
        const params = {
            action: "opensearch",
            search: "Richard Whately",
            limit: "5",
            namespace: "0",
            format: "json"
        };
        Object.keys(params).forEach(key=>{
            url += `&${key}=${params[key]}`;
        });
        console.log(url);
        axios.get(url, {
            headers: {
                'User-Agent': 'Ryland - rylandd@me.com'
            }
        }).then(
            result => {
                console.log(result.data);
                let parse_url = "https://en.wikipedia.org/w/api.php?origin=*";
                parse_url += `&action=query&titles=${result.data[1][0]}`;
                parse_url += `&summary&format=json`;
                axios.get(parse_url, {
                    headers: {
                        'User-Agent': 'Ryland - rylandd@me.com'
                    }
                }).then(
                    response => {
                        console.log(response.data.query);
                    },
                    error => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                );
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
            return (
                <div>{data}</div>
            );
        }
    }
}