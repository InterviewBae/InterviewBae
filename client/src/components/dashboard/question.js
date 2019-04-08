import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestion } from "../../actions/questionActions";

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
        return(
        <div style={{ width: "100vw", padding: "4em" }}>
        {question}
        </div>);
    }
}

const mapStateToProps = state => ({
    question: state.currentQuestion
});
  
export default connect(
    mapStateToProps,
    { getQuestion }
  )(QuestionBar);