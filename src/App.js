import React from 'react';
import firebase from "./firebaseApp";
import "firebase/auth";

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
        <button onClick={this.handleOnClick}>
          Log in
        </button>
      </div>
    );
  }
}

export default App;
