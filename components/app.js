import React from 'react';
import Container from './container';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: []
		}
	}

  render(){
    return (
    	<div>
	    	<h1>CHILL ZONES</h1>
    		<Container />
    	</div>
    )
  }

  // <Map />

  componentDidMount() {
  	if (this.state.locations.length === 0) {
  		this.getLocationsFromAPI();
  	}
  }

  getLocationsFromAPI() {
  	$.get("/api/locations").then((data) => {
  		let locations = data;
  		this.setState({ locations: locations })
  		console.log('locations were updated, here they are: ');
  		console.log(this.state.locations);
  	});
  }
}

export default App;