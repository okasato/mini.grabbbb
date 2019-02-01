import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
 
const InnerMap = withGoogleMap(props => {
  console.log('location', props.location)
  let map = document.getElementsByClassName('map');
  console.log('map', map)
  const center = {
    lat: props.location.latitude ? props.location.latitude : 49.2331455,
    lng: props.location.longitude ? props.location.longitude : -123.1188404,
  }
  const target = new google.maps.Map(map, {
    center,
    zoom: 15,
  });  
  console.log('target', target)

  const places = new google.maps.places.PlacesService(target);
  let keyword = 'coffee';
  places.nearbySearch({
    location: target.center,
    radius: '500',
    name: keyword,
  }, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // return (
      //   <GoogleMap
      //     defaultZoom={12}
      //     defaultCenter={{ lat: 49.2331455, lng: -123.1188404 }}
      //     center={center}
      //   >
          {/* {results.map(result => {
            console.log('results', result.geometry.location)
            return <Marker
              position={result.geometry.location}
            />
          })} */}
          {/* <Marker position={center}/> */}
        // </GoogleMap>
      // ) 
    } else {
      console.log(status)
    }
  });

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
  )
} 
);

class Map extends Component{
  render() {
    const { location } = this.props;
    // console.log('location', location)
    // let map = document.getElementsByClassName('map');
    // console.log('map', map)
    // const center = {
    //   lat: location.latitude ? location.latitude : 49.2331455,
    //   lng: location.longitude ? location.longitude : -123.1188404,
    // }
    // // const center = new google.maps.LatLng(location.latitude ? location.latitude : 49.2331455, location.longitude ? location.longitude : -123.1188404);
    // const target = new google.maps.Map(map, {
    //   center,
    //   zoom: 15,
    // });
    
    // console.log('target', target)
    
    // setTimeout(() => {
    //   const places = new google.maps.places.PlacesService(target);
    //   let keyword = 'coffee';
    //   places.nearbySearch({
    //     location: target.center,
    //     radius: '500',
    //     name: keyword,
    //   }, (results, status) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       console.log('results', results)
    //     } else {
    //       console.log(status)
    //     }
    //   });
    // }, 0)

    return (
      <InnerMap
          containerElement={(<div />)}
          mapElement={(<div className='map' style={{ marginTop: 10, height: 400, width: 350}}/>)}
          location={location}
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