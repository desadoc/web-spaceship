import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './Game.scss';

import { RootScreen } from './container/RootScreen';
import { StatusScreen } from './container/Status/StatusScreen';
import { EmergencyScreen } from './container/Emergency/EmergencyScreen';
import { EngineeringScreen } from './container/Engineering/EngineeringScreen';
import { EnergyProductionScreen } from './container/Engineering/EnergyProduction/EnergyProductionScreen';

class _Game extends React.Component {
  render() {
    return (
      <Router>
        <div className="Game">
          <Route path="/" exact component={RootScreen} />
          <Route path="/status" exact component={StatusScreen} />
          <Route path="/emergency" exact component={EmergencyScreen} />
          <Route path="/engineering" exact component={EngineeringScreen} />
          <Route path="/engineering/energy-production" exact component={EnergyProductionScreen} />
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
