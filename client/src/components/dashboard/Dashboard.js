import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getQuestion } from "../../actions/questionActions";
import AceEditor from 'react-ace';
import QuestionBar from "./question";
import MenuAppBar from './NavBar';

import 'brace/mode/javascript';
import 'brace/mode/python';

// load used themes
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_light';

import './assistant.css';


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
      <div style={{paddingTop:"5vh", width:"100%"}}>
      <MenuAppBar userName={user.name} logout={this.onLogoutClick}/>
      <div style={{ width: "100%" }} className="container valign-wrapper">
       <div className="row">
          <div className="col s2" style={{float: "left"}}>
            <div class="chat">
              CHATBOT
              <div class="yours messages">
                <div class="message last">
                  Hello, how's it going?
                </div>
              </div>
              <div class="mine messages">
                <div class="message">
                  Great thanks!
                </div> 
                <div class="message last">
                  How about you?
                 </div>
              </div>
            </div>
          </div>
          <div className="col s9" style={{float: "right"}}>
            <QuestionBar/>
              <AceEditor mode="python" theme="github" name="blah1" height="35em" width="78em" setOptions={{"printMargin": 0}}
                defaultValue={defaultValue} onChange={(newValue) => console.log('Change in first editor', newValue)} />
          </div>
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