import React from "react";

export default class AnswerChoice extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = "button";
        if (this.props.feedback === "correct") style += " is-success";
        else if (this.props.feedback === "incorrect") style += " is-danger"
        return (
            <div className="column">
                <button className={style} onClick={() => {this.props.onClick(this.props.text);}}>
                    {this.props.text}
                </button>
            </div>
        );
    }
}