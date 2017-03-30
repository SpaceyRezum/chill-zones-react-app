import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';

// import {Map} from './map';
import Map from 'google-maps-react';
import Marker from 'google-maps-react';


export class Container extends React.Component {
  constructor(){
  	super();

  	// this.props.google = this.props.google.bind(this);
  }

  render() {
    const style = {
      width: '100vw',
      height: '90vh'
    }
    return (
      <div>
        <Map google={this.props.google} 
        	 zoom={14} 
        	 style={{width: '50%', height: 'calc(100% - 90px)', position: 'relative'}}
        	 initialCenter={{lat: 43.65073, lng: -79.40677}} >
	    	<Marker
			   //  name={'SOMA'}
			   //  position={{lat: 43.65077, lng: -79.40670}} 
			   //  icon={{
			   //        url: "http://media.mercola.com/imageserver/public/2010/December/index-finger-12.21.jpg",
			   //        anchor: new this.props.google.maps.Point(32,32),
			   //        scaledSize: new this.props.google.maps.Size(64,64)
			   //      }} 
			        />
			<Marker
			    name={'Dolores park'} doIt={console.log(this.props.google)} />
        </Map>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDAdQuXSv0c58KNuTbQQ2loR4Rgk0hx7Hw'
})(Container)