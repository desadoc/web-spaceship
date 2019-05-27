
import React from 'react';
import { connect } from 'react-redux';

import { systemsService } from '../../../../services/Systems';

import { LoadingGuard } from '../../../presentation/LoadingGuard';
import { Screen } from '../../../presentation/Screen';
import { Option } from '../../../presentation/Option';

class _EnergyProductionScreen extends React.Component {
  render() {
    return (
      <LoadingGuard enabled={this.props.loading}>
      <div className="EnergyProductionScreen">
        <Screen title={this.props.title}>
          <ol>
            <li key="emergencyGenerator">
              <Option title="Emergency Generator">
                {this.props.emergencyGeneratorText}
              </Option>
            </li>
            <li key="auxiliarGenerator">
              <Option title="Auxiliar Generator">
                {this.props.auxiliarGeneratorText}
              </Option>
            </li>
          </ol>
        </Screen>
      </div>
    </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => ({
  title: systemsService().engineering.energyProduction.getTitle(gameState.systems),
  emergencyGeneratorText: systemsService().engineering.energyProduction.getEmergencyGeneratorText(gameState.systems),
  auxiliarGeneratorText: systemsService().engineering.energyProduction.getAuxiliarGeneratorText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({

});

export const EnergyProductionScreen = connect(
  mapStateToProps, mapDispatchToProps,
)(_EnergyProductionScreen);
