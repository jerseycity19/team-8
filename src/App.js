import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import './App.css';
import './index.css';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };
 firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.FacebookAuthProvider();




class App extends React.Component {
  handleOnClick() {
    firebase.auth().signInWithRedirect(provider);
  }
  render() {
    return (
      <h1 className="App">
        GLOBAL NOMADS GROUP
        <h2 
        className="missionStatement">
        Global Nomads Group connects youth from around 
        the world to engage across lines of difference.
        </h2>
      <div>
        <button onClick={this.handleOnClick}>
          Log in
        </button>
      </div>
      </h1>
     
    );
  }
}

export default App;
