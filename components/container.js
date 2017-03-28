import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';

// import {Map} from './map';
import Map from 'google-maps-react'


export class Container extends React.Component {
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
        	 initialCenter={{lat: 43.65073, lng: -79.40677}} // initial center Toronto
        />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDAdQuXSv0c58KNuTbQQ2loR4Rgk0hx7Hw'
})(Container)