import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Home } from './container/Home';
import { About } from './container/About';

import './App.scss';

class _App extends React.Component {
  render() {
    const itemsEl = this.props.items.map(
      item => <p>{item.title}</p>
    );

    return (
      <Router>
        <div className="App">
          <h1>Hello</h1>

          {itemsEl}

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

const mapStateToProps = (state) => (
  { items:  Object.keys(state.game.itemsById).map(key => state.game.itemsById[key]) }
);
const mapDispatchToProps = (dispatch) => ( {} );

export const App = connect(
  mapStateToProps, mapDispatchToProps
)(_App);
