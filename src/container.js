import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';
import { Map, Marker } from 'google-maps-react';
import InfoWindow from './info-window';
import InfoText from './infotext';


export class Container extends React.Component {
	constructor() {
		super();

		this.onMarkerClick = this.onMarkerClick.bind(this);

		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
		}
	}

	render() {
		if (!this.props.google) {
			return null;
		}
		return (
			<div className="main-wrapper">
				<InfoText changeSelectedPlace={this.changeSelectedPlace}
					locations={this.props.locations}
					selectedPlace={this.state.selectedPlace.index} />
				<div className="map-wrapper">
					<Map google={this.props.google}
						zoom={14}
						style={{ width: '100%', height: '100%', position: 'relative' }}
						initialCenter={{ lat: 43.65073, lng: -79.40677 }} >

						{this.props.locations.map((location, index) => {
							return (
								<Marker
									key={index}
									index={index}
									position={{ lat: location.address.lat, lng: location.address.lon }}
									name={`${location.name} ${location.category}`}
									onClick={this.onMarkerClick}
									onLoad={this.onMarkerLoad}
								/>
							)
						})}
						<InfoWindow
							marker={this.state.activeMarker}
							visible={this.state.showingInfoWindow} >
							<div>
								<p>{this.state.selectedPlace.name}</p>
							</div>
						</InfoWindow>
					</Map>
				</div>
			</div>
		)
	}


	onMarkerClick(props, marker, e) {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
		// const theOne = $(`#${this.state.selectedPlace.index}`)
		// window.location.href = `#${this.state.selectedPlace.index}`;
	}
}

export default GoogleApiComponent({
	apiKey: 'AIzaSyDAdQuXSv0c58KNuTbQQ2loR4Rgk0hx7Hw'
})(Container)