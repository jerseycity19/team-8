import firebase from 'firebase';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
  }

  getEvents() {
    let eventref = firebase.database().ref("focusedEvents");
    eventref.on("value", function(snapshot)
    {
      return snapshot.val();
    });
  }

  componentDidMounts() {
  	this.setState({
  		events: this.getEvents(),
  	});
  }
}

function Event(props) {
  return (
    <div className="event">
      <button onClick={registerForEvent(props.key)}>
        <div className="eventTopic">{props.topic}</div>
        <div className="eventStart">{props.startTime}</div>
        <div className="eventEnd">{props.endTime}</div>
      </button>
    </div>
  );
}

function EventList(props) {
  return (
    <div>
      {this.state.events.map(e => <Event onClick={registerForEvent} topic={e.topic} startTime={e.startTime} endTime={e.endTime}/>)}
    </div>
  );
}

registerForEvent(uid, eid) {
  var members;
  let ref = firebase.database().ref("/focusedEvents/" + eid + "/members");
  ref.on("value", function(snapshot) {
    members = snapshot.val();
    members[uid] = uid;
    var updates = {members};
    firebase.database().ref('/focusedEvents/' + eid).update(updates);
  });
}

if (result.credential) {
  var token = result.credential.accessToken;
  var user = result.user;

  var users;
  let ref = firebase.database().ref("/users");
  ref.on("value", function(snapshot) {
    users = snapshot.val();
    users[user.email] = user.email;
    var updates = {users};
    firebase.database().ref().update(updates);
  });
};


export default Events;