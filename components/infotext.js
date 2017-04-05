import React from 'react';
import styles from './infotext.scss';
import LocationsList from './locationsList';

class InfoText extends React.Component {
	render(){
		return (
			<div className="info-wrapper">
				<h2>Too hot in the 6ix?</h2>
				<p className="subtitle">Find locations to beat the heat.</p>
				<LocationsList changeSelectedPlace={ this.changeSelectedPlace } 
											 locations={ this.props.locations } 
											 selectedPlace={ this.props.selectedPlace } />
			</div>
		)
	}

	changeSelectedPlace(newSelectedPlace) {
		console.log('newSelectedPlace', newSelectedPlace);
	}
}

export default InfoText;