// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

// initialise DB connection
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
 const agent = new WebhookClient({ request, response });
 console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
 console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

 function welcome(agent) {
   agent.add(`Welcome to Interview Bae! I'm a virtual assistant to help you prepare for Interviews! Do you want to learn more before getting started?`);
 }

 function welcomeYes(agent) {
    agent.add(`You can ask me to give you an interview question. I can even give you an example and a hint for the question if you need it!`);
  }

  function welcomeNo(agent) {
    return admin.database().ref('questions').once('value').then((snapshot) => {
        if (snapshot.exists) {
            var rando = (Math.floor(Math.random() * Math.floor(9)))+1;
            var question = snapshot.child(rando).child('question').val();
            admin.database().ref('current').set(snapshot.child(rando).val());
            agent.add(`Sure. That means you already know a lot about me. Awesome! Let's start with Interview Question then! The Question is `+question);
        }
        return null;
     }); 
  }

 function fallback(agent) {
   agent.add(`I didn't understand`);
   agent.add(`I'm sorry, can you try again?`);
 }

 // Test Function
 function InterviewQuestion(agent) {
  return admin.database().ref('questions').once('value').then((snapshot) => {
      if (snapshot.exists) {
          var rando = (Math.floor(Math.random() * Math.floor(9)))+1;
          var question = snapshot.child(rando).child('question').val();
          admin.database().ref('current').set(snapshot.child(rando).val());
          agent.add(`The Question is `+question);
      }
      return null;
   });   
 }

 // Hint Intent
 function InterviewHint(agent) {
    return admin.database().ref('current').once('value').then((snapshot) => {
        if (snapshot.exists) {
            var hint = snapshot.child('hint').val();
            agent.add(hint);
        }
        else{
            agent.add(`Hint is not available.`);
        }
        return  null;
     });   
   }

 // Example Intent
 function InterviewExample(agent) {
    return admin.database().ref('current').once('value').then((snapshot) => {
        if (snapshot.exists) {
            var example = snapshot.child('example').val();
            agent.add(example);
        }
        else{
            agent.add(`Example is not available.`);
        }
        return  null;
     });   
   }

   
 // // Uncomment and edit to make your own intent handler
 // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
 // // below to get this function to be run when a Dialogflow intent is matched
 // function yourFunctionHandler(agent) {
 //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
 //   agent.add(new Card({
 //       title: `Title: this is a card title`,
 //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
 //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
 //       buttonText: 'This is a button',
 //       buttonUrl: 'https://assistant.google.com/'
 //     })
 //   );
 //   agent.add(new Suggestion(`Quick Reply`));
 //   agent.add(new Suggestion(`Suggestion`));
 //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
 // }

 // // Uncomment and edit to make your own Google Assistant intent handler
 // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
 // // below to get this function to be run when a Dialogflow intent is matched
 // function googleAssistantHandler(agent) {
 //   let conv = agent.conv(); // Get Actions on Google library conv instance
 //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
 //   agent.add(conv); // Add Actions on Google library responses to your agent's response
 // }
 // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
 // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

 // Run the proper function handler based on the matched Dialogflow intent name
 let intentMap = new Map();
 intentMap.set('Default Welcome Intent', welcome);
 intentMap.set('Default Welcome Intent - no', welcomeNo);
 intentMap.set('Default Welcome Intent - yes', welcomeYes); 
 intentMap.set('Default Fallback Intent', fallback);
 // intentMap.set('your intent name here', yourFunctionHandler);
 // intentMap.set('your intent name here', googleAssistantHandler);
 intentMap.set('Interview Question', InterviewQuestion);
 intentMap.set('Interview Hint', InterviewHint); 
 intentMap.set('Interview Example', InterviewExample); 
 agent.handleRequest(intentMap);
});
