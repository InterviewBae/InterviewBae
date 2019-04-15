import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import './assistant.css';

class ChatBot extends Component{
	render(){
		return(
			<div className="chat">
			  <div className="assistantbox"> CHATBOT </div>
			  <div className="yours messages">
			    <div className="message">
			     Welcome to Interview Bae.
			    </div>
			  </div>
			  <div className="mine messages">
			    <div className="message">
			      Can I get an interview question?
			    </div> 
			  </div>
			  <div className="yours messages">
			    <div className="message">
			     Sure. Here is a question for you
			    </div>
			  </div>
			  <div className="yours messages">
			    <div className="message">
			     What is 5 times 10?
			    </div>
			  </div>
			  <div className="mine messages">
			    <div className="message">
			     Can I get a hint?
			    </div>
			  </div>
			</div>
			);
	}
}

export default ChatBot;