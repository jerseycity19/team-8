import firebase from './firebase';
import React from 'react';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
  }

  componentDidMounts() {
  	this.setState({
  		events: this.getEvents(),
  	});
  }

  getEvents() {
    let eventref = firebase.database().ref("focusedEvents");
    eventref.on("value", function(snapshot) {
      return snapshot.val();
    });
  }

  render() {
    return(
      <div>
        {this.state.events.map(e =>
          <Event
            topic={e.topic}
            startTime={e.startTime}
            endTime={e.endTime}
          />
        )}
      </div>
    )
  }
}

export default EventList;
