import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
 
const InnerMap = withGoogleMap(({
  markers  
}) => {
  const center = {
    lat: markers.latitude ? markers.latitude : 49.2331455,
    lng: markers.longitude ? markers.longitude : -123.1188404,
  }
  // const places = new google.maps.places.PlacesService(center);
  // console.log(places)
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 49.2331455, lng: -123.1188404 }}
      center={center}
    >
      {/* {markers.map(marker => {
        return <Marker
          {...marker}
        />
      })} */}
      <Marker position={center}/>
    </GoogleMap>
  )} 
);

class Map extends Component{
  render() {
    const { location } = this.props;
    return (
      <InnerMap
          containerElement={(<div />)}
          mapElement={(<div className='map' style={{ marginTop: 10, height: 400, width: 350}}/>)}
          markers={location}
        />
    )
  }
}

const mapStateToProps = ({
  // location,
}) => {
  return {
    // location,
  }
}

export default connect(mapStateToProps, null)(Map);