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
      <div className="App">
        <h1>GLOBAL NOMADS GROUP</h1>
        <h2 className="missionStatement">
          Global Nomads Group connects youth from around
          the world to engage across lines of difference.
        </h2>
        <div>
          <button onClick={this.handleOnClick}>
            Log in
          </button>
        </div>
      </div>

    );
  }
}

export default App;
