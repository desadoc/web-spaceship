
import React from 'react';
import { connect } from 'react-redux';

import { userInterfaceService } from '../../../../services/UserInterface';
import { systemsService } from '../../../../services/Systems';

import { LoadingGuard } from '../../../presentation/LoadingGuard';
import {
  Screen, ScreenTitle, ScreenNotifications, ScreenItems, ScreenFooter
} from '../../../presentation/Screen';
import { Option } from '../../../presentation/Option';

class _EnergyProductionScreen extends React.Component {
  componentDidMount() {
    this.props.loadingStart();
  }

  render() {
    const navOptions = [
      ['Home', '/'],
      ['Engineering', '/engineering'],
    ];

    return (
      <LoadingGuard enabled={this.props.loading}>
        <div className="EnergyProductionScreen">
          <Screen>
            <ScreenTitle>{this.props.title}</ScreenTitle>
            <ScreenNotifications />

            <ScreenItems>
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
            </ScreenItems>

            <ScreenFooter nav={navOptions} />
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
  loading: userInterfaceService().isLoading(gameState.uiState, 'energyProduction'),
});

const mapDispatchToProps = (dispatch) => ({
  loadingStart: () => dispatch(userInterfaceService().loadingStart('energyProduction')),
});

export const EnergyProductionScreen = connect(
  mapStateToProps, mapDispatchToProps,
)(_EnergyProductionScreen);
