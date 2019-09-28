import React from 'react';
import firebase from "./firebaseApp";
import "firebase/auth";
import './App.css';
import './index.css';
import Background from 'C://workspace/team-8/src/23671a8f18eb758584bca1ca09ed3e7f.png'


import EventList from './EventList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: false,
    }
  }

  componentDidMount() {
    let _this = this;
    firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      let token = result.credential.accessToken;
    }
    let user = result.user;
    _this.setState({
      user,
      isLoggedIn: true
    });
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
    });
  }

  handleOnClick() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }


  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="App">
        <h1>GLOBAL NOMADS GROUP</h1>
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
        <h6>
          Create Your Own Table!
        </h6>
        {isLoggedIn ?
          (<EventList firebase={firebase} />)
        : (
          <button onClick={this.handleOnClick}>
            Log in
          </button>
        )
        }
      </div>

    );
  }
}

export default App;
