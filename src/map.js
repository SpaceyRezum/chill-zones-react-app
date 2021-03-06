import React from 'react';
import ReactDOM from 'react-dom';

export class Map extends React.Component {
  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      console.log('loading map bc we have props')	
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      console.log('inside props')	

      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 43.6532;
      let lng = 79.3832;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
    // ...
  }

  render() {
    return (
      <div ref='map'>
        Loading map...
      </div>
    )
  }
}
