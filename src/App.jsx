import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGeolocationRequest } from './action';

class App extends Component {
  constructor(props) {
    super(props)
    const { getGeolocationRequest } = this.props;
    getGeolocationRequest();
  }
  render() {
    const { location } = this.props;
    console.log('location is', location)
    return (
      <div className='container'>
        Hello World  
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
