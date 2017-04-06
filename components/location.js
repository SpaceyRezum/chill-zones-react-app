import React from 'react';
import styles from './infotext.scss';

class Location extends React.Component {
	render() {
		return (
			<div 
				onClick={ () => this.props.changeSelectedPlace(this.props.index) }
				className={ this.props.selectedPlace ? "location-item highlighted" : "location-item" } 
				id={ `${this.props.index}` }>
				<div>{ this.props.name } { this.props.category }</div>
				<div>{ this.props.address.street } - { this.props.address.postal_code } - { this.props.address.city }</div>
				<div><a href={`tel:${ this.props.phone }`}>{ this.props.phone }</a></div>
			</div>
		)
	}
}

export default Location;