import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGeolocationRequest } from './action';
import Map from './Map';
class App extends Component {
  constructor(props) {
    super(props)
    const { getGeolocationRequest } = this.props;
    getGeolocationRequest();
  }
  render() {
    const { location } = this.props;
    return (
      <div className='container'>
        {location ? (
          <div>
            {`Your position is latitude: ${location.lat}, longitude: ${location.lng}`}
            <Map location={location} />
          </div>
        ) : (
          <div>
            {'Still loading.'}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({
  location,
}) => {
  return {
    location,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGeolocationRequest: () => dispatch(getGeolocationRequest()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
