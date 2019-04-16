import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getQuestion } from "../../actions/questionActions";
import AceEditor from 'react-ace';
import QuestionBar from "./question";
import MenuAppBar from './NavBar';
import ChatBot from './ChatBot';
import Button from '@material-ui/core/Button';

import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/mysql';
import 'brace/mode/sql';

// load used themes
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import 'brace/theme/chrome';

import './assistant.css';


var question = null;
const defaultValue = ``;

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
      <div style={{ width: "100%" }}>
       <div className="row">
          <div className="col s1" style={{float: "left"}}>
            <ChatBot/>
          </div>
          <div className="col s8" style={{float: "right"}}>
            <QuestionBar/>
              <AceEditor mode="python" theme="chrome" name="blah1" height="44em" width="105em" style={{float:"right", padding: "0px"}} setOptions={{"printMargin": 0}}
                defaultValue={defaultValue} onChange={(newValue) => console.log('Change in first editor', newValue)} />
              <Button variant="contained" style={{float: "right"}}> Grab Snapshot </Button>
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