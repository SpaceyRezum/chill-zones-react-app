import React from 'react';
import styles from './login.scss';
import Field from './field';
import $ from 'jquery';

class AddLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisibility: false,
			error: '',
			newLocation: {
				name: '',
				street: '',
				postal_code: '',
				city: ''
			},
			confirmLocationVisibility: false,
			confirmLocation: {}
		};
		this.submitNewLocation = this.submitNewLocation.bind(this);
		this.updateField = this.updateField.bind(this);
	}

	render(){
    return (
    	<div className="add-new-location button-container">
    		<div className="location-component-buttons">
    			<button onClick={ () => this.setState({ modalVisibility: true }) }>Add New Location</button>
    			<button onClick={ this.props.onSignOut }>Sign out</button>
    		</div>
				<div className={ this.state.modalVisibility ? 'modal-window visible' : 'modal-window'}>
					<a className="close-button" onClick={ () => this.setState({ modalVisibility: false }) }>X</a>
					
					<Field label="Name" name="name" value={ this.state.newLocation.name } onChange={ this.updateField } />
					<Field label="Street Number & Street Name" name="street" value={ this.state.newLocation.street } onChange={ this.updateField } />
					<Field label="Postal Code" name="postal_code" value={ this.state.newLocation.postal_code } onChange={ this.updateField } />
					<Field label="City (must be in the Great Toronto Area)" name="city" value={ this.state.newLocation.city } onChange={ this.updateField } />

					{ this.state.error ? <div>{ this.state.error }</div> : null }

					<button onClick={ this.submitNewLocation }>Submit New Location</button>

					<div className={this.state.confirmLocationVisibility ? 'visible' : 'modal-window'}> 
						Is this the place you were trying to add:<br/>
						{ this.state.confirmLocation.name }<br/>
						{ this.state.confirmLocation.street }
						{ `${this.state.confirmLocation.postal_code} - ${this.state.confirmLocation.city}` }<br/>
					</div>
				</div>
			</div>
    );
	}

	updateField(evt) {
	  const newLocation = this.state.newLocation;
	  newLocation[evt.target.name] = evt.target.value;
	  this.setState({ newLocation: newLocation });
	}

	submitNewLocation() {
		const newLocation = this.state.newLocation;
		// if empty field, return error, else test again google place API (to see if it exists & to get lat & lng coordinates)
		if (!newLocation.name || !newLocation.street || !newLocation.postal_code || !newLocation.city) {
			this.setState({ 
				error: 'Please fill in all the fields',
				confirmLocationVisibility: false,
				confirmLocation: ''
			 });
		} else {
			console.log('Location to be tested against Google places API: ', newLocation);
			// AJAX call to Google Geocode API to write here
			this.setState({ 
				error: '',
				confirmLocationVisibility: true,
				confirmLocation: newLocation
			});
		}
	}
}

export default AddLocation;