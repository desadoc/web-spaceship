import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Home } from './container/Home';
import { About } from './container/About';

import './App.scss';

class _App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>{this.props.message}</h1>

          <div className="App__links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>

          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ( { message: 'Hello!~' } );
const mapDispatchToProps = (dispatch) => ( {} );

export const App = connect(
  mapStateToProps, mapDispatchToProps
)(_App);
