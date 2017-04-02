import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';

import { Map, Marker, InfoWindow } from 'google-maps-react';


export class Container extends React.Component {
  constructor(){
  	super();
  }

  render() {
    const style = {
      width: '100vw',
      height: '90vh'
    }
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
	    	 		<Marker
	    	 			key={index}
	    	 			position={{lat: location.address.lat, lng: location.address.lon}}
	    	 			name={location.address.name}
	    	 		/>
	    	 		// console.log({location, index})
    	 		)
	        }) }
	    	<Marker
			    // name={'A little left'}
			    // position={{lat: this.props.locations[0].address.lat, lng: -79.40670}} 
			    // icon={{
			    //       url: "http://media.mercola.com/imageserver/public/2010/December/index-finger-12.21.jpg",
			    //       anchor: new this.props.google.maps.Point(32,32),
			    //       scaledSize: new this.props.google.maps.Size(64,64)
			    //     }} 
			        />
        </Map>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDAdQuXSv0c58KNuTbQQ2loR4Rgk0hx7Hw'
})(Container)