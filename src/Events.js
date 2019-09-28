import firebase from 'firebase';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
// ref.once("value")
//   .then(function(snapshot) {
//     var key = snapshot.key; // "ada"
//     var childKey = snapshot.child("name/last").key; // "last"
//   });
    }
  }

  componentDidMounts() {
  	this.setState({
  		events: firebase.database().ref("focusedEvents"),
  	});
  }
}

export default Events;