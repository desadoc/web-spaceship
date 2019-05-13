import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Game.scss';

import { Screen } from './presentation/Screen';
import { EmergencyOption } from './container/Emergency';


class _Game extends React.Component {
  render() {
    return (
      <Router>
        <div className="Game">
          <Screen title={this.props.title}>
            <ol>
              <li><EmergencyOption /></li>
            </ol>
          </Screen>
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
