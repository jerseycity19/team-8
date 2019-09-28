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

  handleOnClick() {
    console.log('click!');
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

  
}

export default EventList;
