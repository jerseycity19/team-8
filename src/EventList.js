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
    let { firebase } = this.props;
    let ref = firebase.database().ref("/focusedEvents/" + `${e.target.id}` + "/members");
    ref.on("value", function(snapshot) {
      let members = {};
      members = snapshot.val();
      console.log('members', members);
      members[uid] = uid;
      var updates = {members};
      firebase.database().ref('/focusedEvents/' + `${e.target.id}`).update(updates);
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

  registerForEvent(uid, eid) {
    var members;
    let ref = this.props.firebase.database().ref("/focusedEvents/" + "events2" + "/members");
    ref.on("value", function(snapshot) {
      members = snapshot.val();
      members["user6"] = "user6";
      var updates = {members};
      this.props.firebase.database().ref('/focusedEvents/' + eid).update(updates);
    });
  }
}

export default EventList;
