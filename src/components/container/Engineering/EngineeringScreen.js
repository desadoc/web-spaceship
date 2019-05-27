
import React from 'react';
import { connect } from 'react-redux';

import { systemsService } from '../../../services/Systems';

import { LoadingGuard } from '../../presentation/LoadingGuard';
import { Screen } from '../../presentation/Screen';

import { EnergyProductionOption } from './EnergyProduction/EnergyProductionOption';

class _EngineeringScreen extends React.Component {
  render() {
    return (
      <LoadingGuard enabled={this.props.loading}>
      <div className="EngineeringScreen">
        <Screen title={this.props.title}>
          <ol>
            <li key="energyProduction"><EnergyProductionOption /></li>
          </ol>
        </Screen>
      </div>
    </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => ({
  title: systemsService().engineering.getTitle(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({

});

export const EngineeringScreen = connect(
  mapStateToProps, mapDispatchToProps,
)(_EngineeringScreen);
