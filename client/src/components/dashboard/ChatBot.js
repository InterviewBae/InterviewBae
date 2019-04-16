import React, { Component } from "react";
import Iframe from 'react-iframe';

import './assistant.css';

class ChatBot extends Component{
	render(){
		return(
			<div className="chat">
			  <Iframe url="https://console.dialogflow.com/api-client/demo/embedded/99bfbf7a-0e8a-429d-ba33-3396011727ce"
        		width="350px"
		        height="600px"
		        id="myId"
		        className="myClassname"
		        display="initial"
		        position="relative"
		        allow="microphone"/>
			</div>
			);
	}
}

export default ChatBot;