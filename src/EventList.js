import React from 'react';
import { EventItem } from './EventItem';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
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

  render() {
    const { events } = this.state;
    return(
      <div>
        {events.map((e, i) =>
          <EventItem
            topic={e.topic}
            startTime={e.startTime}
            endTime={e.endTime}
            key={e.key}
          />
        )}
      </div>
    )
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
}

export default EventList;
