import React from 'react';
import styles from './infotext.scss';
import Location from './location';

class LocationsList extends React.Component {
	render() {
		return (
			<div className="location-list">
				{ this.props.locations.map((location, index) => {
					console.log(location, index);
					return ( 
						<Location key={ index }
											index={ index }
											name={ location.name }
											category={ location.category }
											phone={ location.phone }
					 />
					)
				}) }
			</div>
		)
	}
}

export default LocationsList;