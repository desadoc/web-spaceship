import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './Game.scss';

import { RootScreen } from './container/Root';
import { EmergencyScreen } from './container/Emergency';


class _Game extends React.Component {
  render() {
    return (
      <Router>
        <div className="Game">
          <Route path="/" exact component={RootScreen} />
          <Route path="/emergency" component={EmergencyScreen} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (gameState) => {
  return {
    title: gameState.systems.title,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export const Game = connect(
  mapStateToProps, mapDispatchToProps
)(_Game);
