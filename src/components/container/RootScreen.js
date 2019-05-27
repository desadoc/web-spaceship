import React from 'react';
import { connect } from 'react-redux';

import { userInterfaceService } from '../../services/UserInterface';

import { Screen } from '../presentation/Screen';
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
          <Screen title={this.props.title}>
            <ol>
              <li key="clock"><ClockOption /></li>
              <li key="status"><StatusOption /></li>
              <li key="emergency"><EmergencyOption /></li>
              <li key="engineering"><EngineeringOption /></li>
            </ol>
          </Screen>
        </div>
      </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => {
  return {
    title: gameState.systems.byName.root.title,
    loading: gameState.uiState.byName.root.loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadingStart: () => dispatch(userInterfaceService().loadingStart('root')),
  };
}

export const RootScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_RootScreen);
