import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getQuestion } from "../../actions/questionActions";
import AceEditor from 'react-ace';

import 'brace/mode/javascript';

// load used themes
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_light';

var defaultValue = `console.log("Hello World");`;

class Dashboard extends Component {
  componentWillMount() {
    this.props.getQuestion();
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    //defaultValue = this.props.question.data.Content;
    console.log(this.props.question.data);
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh", width: "100vw" }} className="container valign-wrapper">
       <div className="row">
          <div className="col s2" style={{float: "left"}}>
            <h4>
              <b>Hey there, </b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into {" "}
                <span style={{ fontFamily: "monospace" }}><b>Interview-Bae</b></span>: your personal interview assistant. 👏
              </p>
            </h4>
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
                <AceEditor mode="javascript" theme="github" name="blah1" height="35em" width="80em" setOptions={{"printMargin": 0}}
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
