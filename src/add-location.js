import React from 'react';
import Field from './field';
import $ from 'jquery';

class AddLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			modalVisibility: false,
			error: '',
			userInput: {
				name: '',
				address: '',
				category: '',
				placeId: ''
			},
			confirmLocationVisibility: false,
			confirmLocation: {
				name: '',
				placeId: ''
			}
		};
		this.validateNewLocation = this.validateNewLocation.bind(this);
		this.updateField = this.updateField.bind(this);
		this.setSuccessErrorMessage = this.setSuccessErrorMessage.bind(this);
	}

	render() {
		return (
			<div className="add-new-location button-container">
				<div className="userButtons">
					<button onClick={() => this.setState({ modalVisibility: true })}>Add New Location</button>
					<button onClick={this.props.onSignOut}>Sign out</button>
				</div>
				<div className={this.state.modalVisibility ? 'modal-window visible' : 'modal-window'}>
					<a className="close-button" onClick={() => this.setState({ modalVisibility: false })}>X</a>

					<Field label="Location's Name" name="name" value={this.state.userInput.name} onChange={this.updateField} />
					<Field label="Address in Toronto" name="address" value={this.state.userInput.address} onChange={this.updateField} />
					<form label="Category" onChange={this.updateField} value={this.state.userInput.category}>
						Category
						<input type="radio" name="category" id="CommunityCenter" value="Community Center" />
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

					{this.state.error ? <div>{this.state.error}</div> : null}

					<button onClick={this.validateNewLocation}>Submit New Location</button>

					{ this.state.isLoading ? <div>Loading...</div> : (<div className={this.state.confirmLocationVisibility ? 'visible' : 'modal-window'}>
						Is this the place you were trying to add?<br />
						{this.state.confirmLocation.name}<br />
						<button onClick={() => this.saveLocation(this.state.userInput.name, this.state.userInput.category, this.state.confirmLocation.placeId)}>Yes</button>
						<button onClick={() => {
							this.setState({
								confirmLocationVisibility: false});
							window.alert('Try to be more precise in the address field, it could help the api find the location faster');
						}}>No</button>
					</div>) }
				</div>
			</div>
		);
	}

	updateField(evt) {
		const newLocation = this.state.userInput;
		newLocation[evt.target.name] = evt.target.value;
		this.setState({
			userInput: newLocation,
			confirmLocationVisibility: false
		});
	}

	validateNewLocation() {
		this.setState({ isLoading: true });
		const newLocation = this.state.userInput;
		// if empty field, return error, else test again google place API (to see if it exists & to get lat & lng coordinates)
		if (!newLocation.name || !newLocation.category) {
			this.setState({
				error: 'Please fill in all the fields',
				confirmLocationVisibility: false,
				confirmLocation: '',
				isLoading: false
			});
			return;
		} else {
			$.get({
				url: "/api/validateLocation",
				data: newLocation,
				contentType: "json",
				dataType: "json",
				success: (data) => {
					this.setSuccessErrorMessage(true, data);
				},
				error: (err) => {
					this.setSuccessErrorMessage(false, err);
				}

			});

		}
	}

	saveLocation(name, category, placeId) {
		this.setState({isLoading: true});
		const data = JSON.stringify({
			name: name,
			category: category,
			placeId: placeId
		});
		$.ajax({
			url: '/api/locations',
			method: 'POST',
			data: data, 
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: response => {
				this.setSuccessErrorMessage(true, null);
			},
			error: err => console.log(err)
		});
		
	}

	setSuccessErrorMessage(success, data) {
		if (success && data) {
			this.setState({
				confirmLocationVisibility: true,
				confirmLocation: {
					name: `${this.state.userInput.name}, ${data.formatted_address}`,
					placeId: data.place_id
				},
				isLoading: false
			});
		} else if (success && !data) {
			this.setState({
				confirmLocationVisibility: false,
				confirmLocation: {},
				isLoading: false
			});
			window.alert("Location was uploaded successfully");
		} else {
			console.log(data);
			this.setState({
				error: "",
				confirmLocationVisibility: false,
				confirmLocation: '',
				isLoading: false
			});
		}
	}

}

export default AddLocation;