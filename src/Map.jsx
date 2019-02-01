import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { getNearBySearch } from './action';


const InnerMap = withGoogleMap(props => {
  console.log(props)
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 49.2331455, lng: -123.1188404 }}
      center={props.center}
    >
      {props.results.map(result => {
        let position = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng()
        };
        return <Marker
          position={position}
        />
      })}
    </GoogleMap>
  )
}
);

class Map extends Component {
  render() {
    const {
      location,
      getNearBySearch,
      results,
    } = this.props;

    let map = document.getElementsByClassName('map');
    const center = {
      lat: location.latitude,
      lng: location.longitude,
    };
    const target = new google.maps.Map(map, {
      center,
      zoom: 15,
    });
    const places = new google.maps.places.PlacesService(target);
    let keyword = 'coffee';
    places.nearbySearch({
      location: target.center,
      radius: '500',
      name: keyword,
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)
        getNearBySearch(results);
      } else {
        console.log(status)
      }
    });

    return (
      <InnerMap
        containerElement={(<div />)}
        mapElement={(<div className='map' style={{ marginTop: 10, height: 400, width: 350 }} />)}
        center={center}
        results={results}
      />
    )
  }
}

const mapStateToProps = ({
  results,
}) => {
  return {
    results,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNearBySearch: results => dispatch(getNearBySearch(results)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);