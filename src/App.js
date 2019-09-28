import React from 'react';
import firebase from "./firebaseApp";
import "firebase/auth";
import './App.css';
import './index.css';
import EventList from './EventList';
import { Button } from 'semantic-ui-react'




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

  eventOnClick() {
    // TO BE CODED ONCE EVENTS ARE MADE
  }
  


  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="App">
        <img src="/images/1.jpg" alt=""/>
        <h1>GLOBAL NOMADS GROUP</h1>
        <h2 className="missionStatement">
          Global Nomads Group connects youth from around
          the world to engage across lines of difference.
        </h2>
        <button class="ui button" onClick={this.handleOnClick}>
          Log in
        </button>
        <h3>
          Upcoming and Current Tables:
        </h3>
        <button class="ui purple button">{this.eventOnClick} Table Talk<p></p>September 28th 2pm <p></p>  <p>Free Table</p>
        </button>
        <button class="ui purple button">{this.eventOnClick}
          Table Talk <p></p> September 30th 11am <p></p> <p></p> Climate Change
        </button>
        <h4>
          Topic-Specific Tables:
        </h4>
        <button class="ui purple button">{this.eventOnClick}
          Table Talk October 11th 11am
          <p></p> TOPIC: <p></p> Giving to the Community
        </button>
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
