import React from 'react';
import { connect } from 'react-redux';

import { systemsService } from '../../services/Systems';
import { userInterfaceService } from '../../services/UserInterface';

import {
  Screen, ScreenTitle, ScreenNotifications, ScreenItems,
} from '../presentation/Screen';
import { ClockOption } from './ClockOption';
import { StatusOption } from './Status/StatusOption';
import { EmergencyOption } from './Emergency/EmergencyOption';
import { EngineeringOption } from './Engineering/EngineeringOption';
import { LoadingGuard } from '../presentation/LoadingGuard';

class _RootScreen extends React.Component {
  componentDidMount() {
    this.props.loadingStart();
  }

  render() {
    return (
      <LoadingGuard enabled={this.props.loading}>
        <div className="RootScreen">
          <Screen>
            <ScreenTitle>{this.props.title}</ScreenTitle>
            <ScreenNotifications />

            <ScreenItems>
              <ol>
                <li key="clock"><ClockOption /></li>
                <li key="status"><StatusOption /></li>
                <li key="emergency"><EmergencyOption /></li>
                <li key="engineering"><EngineeringOption /></li>
              </ol>
            </ScreenItems>
          </Screen>
        </div>
      </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => {
  return {
    title: systemsService().getTitle(gameState.systems),
    loading: userInterfaceService().isLoading(gameState.uiState, 'root'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadingStart: () => dispatch(userInterfaceService().loadingStart('root')),
});

export const RootScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_RootScreen);
