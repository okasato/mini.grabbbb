import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { getNearBySearch } from './action';
import { searchNearBy } from './utils';
import CoffeeMarker from './pin-coffee-mob.svg';
class InnerMap extends Component {
  state = {
    isOpen: false,
    activeMarkerIndex: null,
  }

  onOpenInfoWindow = index => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
      activeMarkerIndex: index,
    })
  }

  onToggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  } 

  render() {
    const { isOpen, activeMarkerIndex } = this.state;
    const { center, results } = this.props;
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 49.2331455, lng: -123.1188404 }}
        center={center}
      >
        <Marker
          animation={google.maps.Animation.BOUNCE}
          position={center}
        />
        {results.map((result, index) => {
          let position = {
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng()
          };
          let link = `https://www.google.com/maps/search/?api=1&query=${result.name}&query_place_id=${result.place_id}`;
          return (
            <Marker
              key={index}
              animation={google.maps.Animation.DROP}
              position={position}
              onClick={() => this.onOpenInfoWindow(index)}
              icon={CoffeeMarker}
            >
              {isOpen && (activeMarkerIndex === index) && (<InfoWindow onCloseClick={this.onToggleOpen}>
                <ul>
                  <li>{`NAME: ${result.name}`}</li>
                  <li>{`OPEN/CLOSE: ${result.opening_hours ? (result.opening_hours.open_now ? 'OPEN' : 'CLOSED') : 'NO INFOMATION'}`}</li>
                  <li><a href={link}>{link}</a></li>
                </ul>
              </InfoWindow>)}
            </Marker>
          )
        })}
      </GoogleMap>
    )
  }
}

const InnerMapWithGoogleMap = withGoogleMap(props => (
  <InnerMap {...props}/>
))

const Map = ({
  location,
  getNearBySearch,
  results
}) => {
  let map = document.getElementsByClassName('map');
  searchNearBy(map, location, 'coffee', getNearBySearch);
  return (
    <InnerMapWithGoogleMap
      containerElement={(<div />)}
      mapElement={(<div className='map' style={{ marginTop: 10, height: 400, width: 350 }} />)}
      center={location}
      results={results}
    />
  )
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