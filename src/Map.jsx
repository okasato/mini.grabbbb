import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { getNearBySearch } from './action';
import { searchNearBy } from './utils';

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
    console.log('hey isToggleOpen')
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
          return (
            <Marker
              key={index}
              animation={google.maps.Animation.DROP}
              position={position}
              onClick={() => this.onOpenInfoWindow(index)}
            >
              {isOpen && (activeMarkerIndex === index) && (<InfoWindow onCloseClick={this.onToggleOpen}>
                <div>{`CAFE NAME: ${result.name}`}</div>
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