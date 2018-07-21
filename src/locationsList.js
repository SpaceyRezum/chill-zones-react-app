import React from 'react';
import $ from 'jquery';

import Location from './location';

class LocationsList extends React.Component {
	constructor(props) {
		super(props);
		this.changeSelectedPlace = this.changeSelectedPlace.bind(this);
	}

	render() {
		return (
			<div className="location-list">
				{ this.props.locations.length > 0 ? this.props.locations.map((location, index) => {
					return ( 
						<Location key={ index }
								  index={ index }
								  name={ location.name }
								  category={ location.category }
								  phone={ location.phone }
								  address={ location.address }
								  selectedPlace={ index === this.props.selectedPlace ? true : false }
								  changeSelectedPlace={ this.changeSelectedPlace }
					 />
					)
				}) : null}
			</div>
		)
	}

	changeSelectedPlace(newSelectedPlace) {
		this.props.changeSelectedPlace(newSelectedPlace);
	}

	componentDidUpdate(){
		if (this.props.selectedPlace) {
			var container = $('.location-list'),
			    scrollTo = $(`#${this.props.selectedPlace}`);

			// Or you can animate the scrolling:
			container.animate({
			    scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
			})
		}
	}
}

export default LocationsList;