import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './action';

class App extends Component {

  render() {
    // const {} = this.props;

    return (
      <div className='container'>
        Hello
      </div>
    )
  }
}

const mapStateToProps = ({}) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
