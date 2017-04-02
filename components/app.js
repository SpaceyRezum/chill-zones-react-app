import React from 'react';
import Container from './container';
import InfoText from './infotext';
import $ from 'jquery';
import styles from './app.scss';
import Login from './login';
// import AddLocation from './add-location';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: [],
      mode: 'not-logged',
      user: ''
		};

    this.loginUser = this.loginUser.bind(this);
	}

  render(){
    return (
    	<div>
    		<header>
		    	<h1>CHILL ZONES</h1>
          { this.state.mode === 'not-logged' ? 
            <Login onLogin={ this.loginUser }/> :
            null
            // <AddLocation />
          }
		    </header>
		    <main>
			    <InfoText locations={this.state.locations} />
	    		<Container locations={this.state.locations} />
		    </main>
    	</div>
    )
  }

  componentDidMount() {
  	if (this.state.locations.length === 0) {
  		this.getLocationsFromAPI();
  	}
  }

  loginUser(user) {
    if (user) {
      this.setState({
        user: user,
        mode: 'logged'
      });
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