import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getQuestion } from "../../actions/questionActions";
import AceEditor from 'react-ace';
import QuestionBar from "./question";

import 'brace/mode/javascript';
import 'brace/mode/python';

// load used themes
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_light';


var question = null;
const defaultValue = `console.log("Hello World");`;

class Dashboard extends Component {
  componentWillMount() {
    if (question === null){
      this.props.getQuestion();
    }
  }

  componentDidUpdate(){
    if (question === null){
      question = this.props.question.data.Content;
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    //defaultValue = this.props.question.data.Content;
    const { user } = this.props.auth;
    // console.log(this.state.defaultValue);
    return (
      <div style={{ height: "75vh", width: "100vw" }} className="container valign-wrapper">
       <div className="row">
          <div className="col s2" style={{float: "left"}}>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
              Logout
            </button>
          </div>
          <div className="col s9" style={{float: "right"}}>
                <QuestionBar/>
                <AceEditor mode="python" theme="github" name="blah1" height="35em" width="80em" setOptions={{"printMargin": 0}}
                                    defaultValue={defaultValue}
                                    onChange={(newValue) => console.log('Change in first editor', newValue)} />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  question: state.currentQuestion
});

export default connect(
  mapStateToProps,
  { logoutUser, getQuestion }
)(Dashboard);
