
import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { systemsService } from '../../../services/Systems';
import { userInterfaceService } from '../../../services/UserInterface';

import { CoreSystemsRepairOption } from './CoreSystemsRepairOption';

import { Screen } from '../../presentation/Screen';
import { LoadingGuard } from '../../presentation/LoadingGuard';

class _EmergencyScreen extends React.Component {
  componentDidMount() {
    this.props.loadingStart();
  }

  render() {
    return (
      <LoadingGuard enabled={this.props.loading}>
        <div className="EmergencyScreen">
          <Screen title={this.props.title}>
            <ol>
              <li key="coreSystemRepair"><CoreSystemsRepairOption /></li>
            </ol>
          </Screen>
        </div>
      </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => {
  const state = gameState.systems.byName.emergency;
  const uiState = gameState.uiState.byName.emergency;

  return {
    name: state.name,
    title: state.title,
    loading: uiState.loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadingStart: () => dispatch(userInterfaceService().loadingStart('emergency')),
  };
}

export const EmergencyScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyScreen);
