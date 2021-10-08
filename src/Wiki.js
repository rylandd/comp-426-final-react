import React, { Component } from "react";
import axios from 'axios';

export default class Wiki extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        };
    }

    componentDidMount() {
        let url = "https://en.wikipedia.org/w/api.php?origin=*";
        const params = {
            action: "opensearch",
            search: this.props.author,
            limit: "1",
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
                console.log(result.data[3][0]);
                this.setState({
                    data:result.data[3][0],
                    isLoaded: true
                })
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
                <div className="notification is-info">Find out more about this quote's author <a href={data} target="_blank">here</a></div>
            );
        }
    }
}