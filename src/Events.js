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
      <button onClick={registerForEvent}>
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


export default Events;