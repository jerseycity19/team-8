import React from 'react';
import firebase from "./firebaseApp";
import "firebase/auth";
import './App.css';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  handleOnClick() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }


  render() {
    return (
      <div>
        <h1 className="App">
          GLOBAL NOMADS GROUP"
        </h1>
        <h2 className="missionStatement">
          Global Nomads Group connects youth from around 
        the world to engage across lines of difference.
        </h2>
        <button onClick={this.handleOnClick}>
          Log in
        </button>
        <h3>
          Upcoming and Current Tables:
        </h3>
        <h4>
          Topic-Specific Tables:
        </h4>
        <h5>
          Free Tables (No Set Topic):
        </h5>
      </div>
    );
  }
}

export default App;
