import React from 'react';
import { connect } from 'react-redux';

import './App.css';

class _App extends React.Component {
  render() {
    return (
      <div className="App">
        Hello
      </div>
    );
  }
}

const mapStateToProps = (state) => ( {} );
const mapDispatchToProps = (dispatch) => ( {} );

export const App = connect(
  mapStateToProps, mapDispatchToProps
)(_App);
