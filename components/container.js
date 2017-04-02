import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';

import { Map, Marker, InfoWindow } from 'google-maps-react';


export class Container extends React.Component {
  constructor(){
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
      <div>
        <Map google={this.props.google} 
        	 zoom={14} 
        	 style={{width: '50%', height: 'calc(100% - 90px)', position: 'relative'}}
        	 initialCenter={{lat: 43.65073, lng: -79.40677}} >

        	 { this.props.locations.map( (location, index) => {
        	 	return (
        	 		<div>
		    	 		<Marker
		    	 			key={index}
		    	 			position={{lat: location.address.lat, lng: location.address.lon}}
		    	 			name={location.address.name}
		    	 			onClick={this.onMarkerClick}
		    	 		/>
		    	 		{/*<InfoWindow
		    	 			  // onOpen={this.windowHasOpened}
		    	 			  // onClose={this.windowHasClosed}
	    	 		          marker={this.state.activeMarker}
	    	 		          visible={this.state.showingInfoWindow} >
    	 		            <div>
    	 		              <h1>{this.state.selectedPlace.name}</h1>
    	 		            </div>
    	 		        </InfoWindow> */}
		    	 	</div>	
    	 		)
	        }) }

        	 <Marker onClick={this.onMarkerClick}
        	         name={'Current location'} />

        	         <InfoWindow
        	           marker={this.state.activeMarker}
        	           visible={this.state.showingInfoWindow}>
        	             <div>
        	               <h1>{this.state.selectedPlace.name}</h1>
        	             </div>
        	         </InfoWindow>

        </Map>
      </div>
    )
  }

  onMarkerClick(props, marker, e) {
  	console.log(props)
    this.setState({
      // selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDAdQuXSv0c58KNuTbQQ2loR4Rgk0hx7Hw'
})(Container)