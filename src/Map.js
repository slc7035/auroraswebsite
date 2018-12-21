import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    const { google, lat, lng, zoom, style } = this.props;
    console.log({lat, lng})
    console.log(style)
    return (
      <Map google={google} 
        style={style} 
        initialCenter={{
            lat,
            lng
        }}
        center={{lat, lng}} 
        zoom={zoom}
      >
        <Marker onClick={this.onMarkerClick} name={'Current location'} />
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Testing</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

// <GoogleMapReact bootstrapURLKeys={{key: ''}} defaultCenter={{lat: 42.9739765, lng: -77.378867}} defaultZoom={15} />

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCN_kz5kr9uW4yAL579SLznOu8LUhxltaY',
})(MapContainer)
