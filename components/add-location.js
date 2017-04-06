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
				category: '',
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
	    	<div className="add-new-location">
	    		<button onClick={ () => this.setState({ modalVisibility: true }) }>Add New Location</button>
				<div className={ this.state.modalVisibility ? 'modal-window visible' : 'modal-window'}>
					<a className="close-button" onClick={ () => this.setState({ modalVisibility: false }) }>X</a>
					
					<Field label="Address or Name" name="name" value={ this.state.newLocation.name } onChange={ this.updateField } /> 
					<form label="Category" onChange={ this.updateField } value={ this.state.newLocation.category }>
						Category
						<input type="radio" name="category" id="CommunityCenter" value="Community Center"/>
						<label htmlFor="CommunityCenter">Community Center</label>
						<input type="radio" name="category" id="Library" value="Library" />
						<label htmlFor="Library">Library</label>
						<input type="radio" name="category" id="ShoppingMall" value="Shopping Mall" />
						<label htmlFor="ShoppingMall">Shopping Mall</label>
						<input type="radio" name="category" id="Museum" value="Museum" />
						<label htmlFor="Museum">Museum</label>
						<input type="radio" name="category" id="Business" value="Business" />
						<label htmlFor="Business">Business</label>
						<input type="radio" name="category" id="other" value="Other place" />
						<label htmlFor="other">Other place</label>
					</form>
					{/*<Field label="Street Number & Street Name" name="street" value={ this.state.newLocation.street } onChange={ this.updateField } />
					{/*<Field label="Postal Code" name="postal_code" value={ this.state.newLocation.postal_code } onChange={ this.updateField } />*/}
					{/*<Field label="City (must be in the Great Toronto Area)" name="city" value={ this.state.newLocation.city } onChange={ this.updateField } />*/}

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
		if (!newLocation.name || !newLocation.category) {
			this.setState({ 
				error: 'Please fill in all the fields',
				confirmLocationVisibility: false,
				confirmLocation: ''
			 });
		} else {
			console.log('Location to be tested against Google places API: ', newLocation);
			// AJAX call to Google Geocode API to write here
			////////////////////////////////////////////////
			const googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
			const googleAPIkey = '&key=AIzaSyDZY5u6OOV3Xuh_EUp0sIML8maJTzakfyc';

			const url = googleAPIUrl + '?address=' + newLocation.address + 'components=locality:toronto' + googleAPIkey;
				
			$.get({
				url: url,
				success: function(data) {
					console.log('data is:', data);
					console.log('our search result is:');

					this.setState=({
						newLocation: {
							name: '',
							category: '',
							street: '',
							postal_code: '',
							city: ''
						}
					})
				},
				error: function(err) { console.log(err)}

				// var response = JSON.parse(data);


				// 	response = response.results[0];
					
				// 	response.address_components.forEach(function(component) {
				// 		if (component.types.includes('street_number')) {
				// 			l.address.street = component.long_name + ' ';
				// 		} else if (component.types.includes('route')) {
				// 			l.address.street += component.long_name;
				// 		} else if (component.types.includes('locality')) {
				// 			l.address.city = component.long_name;
				// 		} else if (component.types.includes('postal_code')) {
				// 			l.address.postal_code += component.long_name;
				// 		}
				// 	});

				// l.save();
			});



			this.setState({ 
				error: '',
				confirmLocationVisibility: true,
				confirmLocation: newLocation
			});
		}
	}
}

export default AddLocation;