import React from 'react';
import { connect } from 'react-redux';

import './App.scss';

class _App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ( {} );
const mapDispatchToProps = (dispatch) => ( {} );

export const App = connect(
  mapStateToProps, mapDispatchToProps
)(_App);
