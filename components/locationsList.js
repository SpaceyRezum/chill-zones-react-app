import React from 'react';
import $ from 'jquery';

import styles from './infotext.scss';
import Location from './location';

class LocationsList extends React.Component {
	render() {
		return (
			<div className="location-list">
				{ this.props.locations.map((location, index) => {
					return ( 
						<Location key={ index }
								  index={ index }
								  name={ location.name }
								  category={ location.category }
								  phone={ location.phone }
								  address={ location.address }
								  // className={index === this.props.index ? 'highlight' : 'noHighlight'}
					 />
					)
				}) }
			</div>
		)
	}

	componentDidUpdate(){
		if (this.props.index && this.props.index !== this.props.index) {
			var container = $('.location-list'),
			    scrollTo = $(`#${this.props.index}`);

			// Or you can animate the scrolling:
			container.animate({
			    scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
			})
		}
	}
}

export default LocationsList;