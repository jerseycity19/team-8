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

function EventList(props) {
  return (
    <div>
      {this.state.events.map(e => <Event topic={e.topic} startTime={e.startTime} endTime={e.endTime}/>)}
    </div>
  );
}

export default Events;