import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Root } from './container/Root';
import { About } from './container/About';

import './Game.scss';

class _Game extends React.Component {
  render() {
    const itemsEl = this.props.items.map(
      item => <p>id: {item.id}, title: {item.title}</p>
    );

    return (
      <Router>
        <div className="Game">
          <h1>Hello</h1>

          {itemsEl}

          <div className="Game__links">
            <Link to="/">Root</Link>
            <Link to="/about">About</Link>
          </div>

          <Route path="/" exact component={Root} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (gameState) => (
  { items:  Object.keys(gameState.itemsById).map(key => gameState.itemsById[key]) }
);
const mapDispatchToProps = (dispatch) => ( {} );

export const Game = connect(
  mapStateToProps, mapDispatchToProps
)(_Game);
