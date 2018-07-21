import React from 'react';
import Container from './container';
import Login from './login';
import AddLocation from './add-location';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: [],
      indexSelected: null,
      mode: 'not-logged',
      user: ''
		};

    this.loginUser = this.loginUser.bind(this);
    this.signOut = this.signOut.bind(this);
	}

  render(){
    return (
    	<div>
    		<header>
		    	<h1>CHILL ZONES</h1>
          { this.state.mode === 'not-logged' ? 
            <Login onLogin={ this.loginUser }/> : <AddLocation onSignOut={ this.signOut }/>
          }
		    </header>
		    <main>
	    		<Container locations={this.state.locations} indexSelected={this.state.indexSelected} />
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

  signOut() {
    this.setState({
      user: '',
      mode: 'not-logged'
    });
  }

  getLocationsFromAPI() {
  	$.get('/api/locations').then((data) => {
      console.log("data");
      console.log(data);
  		let locations = data;
  		this.setState({ locations: locations })
  	});
  }
}

export default App;