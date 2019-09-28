import React from 'react';
import firebase from "./firebaseApp";
import "firebase/auth";
import './App.css';
import './index.css';
import EventList from './EventList';
import { Button } from 'semantic-ui-react'
import Verify from './Verify';


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
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
        // The signed-in user info.
      var user = result.user;
      console.log("user: " + user);
      }
      console.log("user: " + user);
    })
  }

  eventOnClick() {
    // TO BE CODED ONCE EVENTS ARE MADE
  }
  


  render() {
    var users;
    let ref = firebase.database().ref("/users");
    ref.on("value", function(snapshot) {
      users = snapshot.val();
      users["slampota"] = "slampota@usc.edu";
      var updates = {users};
      firebase.database().ref().update(updates);
    });
    const { isLoggedIn } = this.state;
    return (
      <div className="App">
        <h1>GLOBAL NOMADS GROUP</h1>
        <h2 className="missionStatement">
          Global Nomads Group connects youth from around
          the world to engage across lines of difference.
        </h2>
        <button class="ui button" onClick={this.handleOnClick}>
          Log in
        </button>
        <ul> Future RSVP'd Tables: <p></p><li>Table Talk September 30th 11 am <p>Climate Change</p></li><li>Table Talk October 22th 3pm <p>Gender Norms</p></li>
        </ul>
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
          Table Talk <p></p> October 11th 11am
          <p></p> <p></p> Giving to the Community
        </button>
        <h5>
          Free Tables (No Set Topic):
        </h5>
        {isLoggedIn ?
          (
            <>

              <ul> Your Future Tables:
                <li>Table Talk September 30th 11 am
                  <p>
                    Climate Change
                  </p>
                </li>
                <li>Table Talk October 22th 3pm
                  <p>Gender Norms</p>
                </li>
              </ul>

              <h3>
                Upcoming and Current Tables:
              </h3>

              <button
                className="ui purple button"
                onClick={this.eventOnClick}
              >
                Table Talk<p></p>September 28th 2pm<p></p> <p></p>Free Table
              </button>

              <button className="ui purple button" onClick={this.eventOnClick}>
                Table Talk <p></p> September 30th 11am <p></p> <p></p> Climate Change
              </button>

              <h4>
                Topic-Specific Tables:
              </h4>

              <button className="ui purple button" onClick={this.eventOnClick}>
                Table Talk <p></p> October 11th 11am
                <p></p> <p></p> Giving to the Community
              </button>

              <h5>
                Free Tables (No Set Topic):
              </h5>
              <button
                className="ui purple button"
                onClick={this.eventOnClick}
              >
                <p>Table Talk</p><p>September 28th 2pm</p> <p>Free Table</p>
              </button>
              <p></p>
            </>
          ) : (
              <>
                <Verify />
                <button onClick={this.handleOnClick}>
                 Log in
                </button>
                <p></p>
              </>
          )}
      </div>
      

    );
  }
}

export default App;
