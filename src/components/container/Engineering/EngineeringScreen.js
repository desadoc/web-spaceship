
import React from 'react';
import { connect } from 'react-redux';

import { systemsService } from '../../../services/Systems';
import { userInterfaceService } from '../../../services/UserInterface';

import { LoadingGuard } from '../../presentation/LoadingGuard';
import {
  Screen, ScreenTitle, ScreenNotifications, ScreenItems, ScreenFooter
} from '../../presentation/Screen';

import { EnergyProductionOption } from './EnergyProduction/EnergyProductionOption';

class _EngineeringScreen extends React.Component {
  componentDidMount() {
    this.props.loadingStart();
  }

  render() {
    const navOptions = [
      ['Home', '/'],
    ];

    return (
      <LoadingGuard enabled={this.props.loading}>
      <div className="EngineeringScreen">
        <Screen>
          <ScreenTitle>{this.props.title}</ScreenTitle>
          <ScreenNotifications />

          <ScreenItems>
            <ol>
              <li key="energyProduction"><EnergyProductionOption /></li>
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
  title: systemsService().engineering.getTitle(gameState.systems),
  loading: userInterfaceService().isLoading(gameState.uiState, 'engineering'),
});

const mapDispatchToProps = (dispatch) => ({
  loadingStart: () => dispatch(userInterfaceService().loadingStart('engineering')),
});

export const EngineeringScreen = connect(
  mapStateToProps, mapDispatchToProps,
)(_EngineeringScreen);
