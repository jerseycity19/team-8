import React from 'react';
import { EventItem } from './EventItem';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
    this.registerForEvent = this.registerForEvent.bind(this);
  }

  componentDidMount() {
    let ref = this;
    let eventref = this.props.firebase.database().ref("focusedEvents");

    eventref.on("value", function(snapshot) {
      ref.setState({
        events: Object.values([snapshot.val()][0]),
      });
    })
  }

  registerForEvent(e, uid) {
    console.log("here");
    let { firebase } = this.props;
    let ref = firebase.database().ref("/focusedEvents/event2/members");
    ref.on("value", function(snapshot) {
      let members = {};
      members = snapshot.val();
      console.log('members', members);
      members["slampota"] = "slampota@usc.edu";
      var updates = {members};
      firebase.database().ref("/focusedEvents/event2").update(updates);
      var attendees = Object.values([snapshot.val()]);
      console.log(attendees);
      return attendees;
    });
  }

  render() {
    const { events } = this.state;
    return(
      <div>
        {events.map((e, i) =>
          <EventItem
            key={e.id}
            topic={e.topic}
            startTime={e.startTime}
            endTime={e.endTime}
            onClick={this.registerForEvent}
            id={e.id}
          />
        )}
      </div>
    )
  }

  
}

export default EventList;
