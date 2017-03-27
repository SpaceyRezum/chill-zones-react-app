import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';

// import {Map} from './map';
import Map from 'google-maps-react'


export class Container extends React.Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div style={style} >
        <Map google={this.props.google} zoom={14} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDAdQuXSv0c58KNuTbQQ2loR4Rgk0hx7Hw'
})(Container)