import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestion } from "../../actions/questionActions";

import './box.css';

var question = "";

class QuestionBar extends Component {
    componentWillMount() {
        this.props.getQuestion();
    }

    componentDidUpdate()
    {
        question = this.props.question.data.Content;
    }

    render()
    {
        console.log(question);
        return(
            <div style={{width: "56vw" }} className="container">
                <blockquote>{question}</blockquote>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    question: state.currentQuestion
});
  
export default connect(
    mapStateToProps,
    { getQuestion }
  )(QuestionBar);