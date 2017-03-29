import React from 'react';
import styles from './infotext.scss';

class Location extends React.Component {
	render() {
		return (
			<div className="location-item">
				<div>{ this.props.index } - { this.props.name }</div>
				<div>{ this.props.category }</div>
				<div>{ this.props.phone }</div>
				<hr/>
			</div>
		)
	}
}

export default Location;